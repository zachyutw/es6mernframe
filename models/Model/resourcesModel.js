import _ from 'lodash';
import mongoose from 'mongoose';
import queryRESTFulPlugin from '../queryHelper/queryRESTFulPlugin';

export default (Model) => {
    Model.getList = (controllQuery) => {
        let query = Model.find({});
        query = queryRESTFulPlugin(query, controllQuery);
        return query.exec();
    };
    Model.findManyByIds = (propIds, controllQuery) => {
        const ids = _.map(propIds, (id) => mongoose.Types.ObjectId(id));
        console.log(propIds);
        let query = Model.find(
            {
                _id: {
                    $in: ids
                }
            },
            (err, doc) => doc
        );
        query = queryRESTFulPlugin(query, controllQuery);
        return query.exec();
    };
    Model.addMany = async (datas, controllQuery = {}) => {
        const newDatas = await Promise.all(
            _.map(datas, (data) => {
                return Model(data);
            })
        );
        let listSaved = await Model.insertMany(newDatas);
        if (_.isError(listSaved)) {
            return listSaved;
        } else {
            listSaved = _.map(listSaved, (saved) => {
                if (_.isEmpty(controllQuery.selects)) {
                    return saved;
                } else {
                    return _.pick(saved, controllQuery.selects);
                }
            });
            return listSaved;
        }
    };
    Model.setItem = async (source, controllQuery) => {
        try {
            let mapKeysSource = _.mapKeys(source, (value, key) => {
                let replaceKey = key;
                if (key.endsWith('Id')) {
                    replaceKey = key.replace('Id', '');
                }
                return replaceKey;
            });
            let data = Model(mapKeysSource);
            let result = await data.save();
            let query = Model.findOne({ _id: result._id });
            query = queryRESTFulPlugin(query, controllQuery);
            return query.exec();
        } catch (err) {
            throw err;
        }
    };
    Model.getItem = (_id, controllQuery) => {
        let query = Model.findOne({ _id });
        query = queryRESTFulPlugin(query, controllQuery);
        return query.exec();
    };
    Model.updateItem = async (_id, data, controllQuery) => {
        const { id, updatedAt, createdAt, ...rest } = data;
        const result = await Model.findByIdAndUpdate(_id, rest, { new: true }).then((data) => data).catch((err) => {
            throw new Error(`${err}`);
        });
        let query = Model.findOne({ _id: result._id });
        query = queryRESTFulPlugin(query, controllQuery);
        return query.exec();
    };

    Model.pushFields = async (id, feildId, fieldName, controllQuery) => {
        const result = await Model.findByIdAndUpdate(id, { $push: { [fieldName]: feildId } });
        let query = Model.findOne({ _id: result._id });
        query = queryRESTFulPlugin(query, controllQuery);
        return query.exec();
    };
    Model.pullFields = async (id, feildId, fieldName, controllQuery) => {
        const result = await Model.findByIdAndUpdate(id, { $pull: { [fieldName]: feildId } });
        let query = Model.findOne({ _id: result._id });
        query = queryRESTFulPlugin(query, controllQuery);
        return query.exec();
    };
    Model.delete = (_id) => Model.remove({ _id }, (err) => console.log(err));
    Model.dropAll = () => Model.collection.drop();
    Model.schema.set('toJSON', {
        transform: function (doc, ret, options){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    });
    Model.schema.set('toObject', { getters: true });
    return Model;
};
