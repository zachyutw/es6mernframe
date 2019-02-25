import _ from 'lodash';

export function selectPlugin (req,res,next){
    const allSources = {...req.params,...req.body,...req.query};
    const {select=""} = allSources;
    if(!_.isEmpty(select)){
        req.selects = select.split(',');
    }
    next();
}

export function populatePlugin(req,res,next){
    const allSources = {...req.params,...req.body,...req.query};
    const {populate=""} = allSources;
    if(!_.isEmpty(populate)){
        req.populates = populate.split(',');
    }
    next();
}
export function populatePathPlugin(req,res,next){
    const allSources = {...req.params,...req.body,...req.query};
    const {populatePath="",populateModel=""} = allSources;
    let populatePaths=!_.isEmpty(populatePath)?populatePath.split(','): [];
    let populateModels=!_.isEmpty(populateModel)?populateModel.split(','):[];
    if(populatePaths.length != populateModels.length ){
        res.status(400).send({error:true,errorMessage:"popualte key model pairs not correct"});
    }else if(!_.isEmpty(populatePaths)){
        req.pathModelPopulates = _.map(populatePaths,(path,index)=>{
            return {path, model:_.capitalize(populateModels[index])}
        });
    }
    next();
}
export function allFunctionsPlugin(req,res,next){
    let allSources = {...req.params,...req.body,...req.query};
    const {populate="",select="",sort,page,limit,maxScan,...restSources} = allSources;
    const controllQuery = {};
    let deepSelects = {};
    const usedKeys = ['select','populate','sort','page','limit','ids'];
    _.keys(allSources).map( (key)=> {
        if(_.indexOf(key,'$')==0){
            usedKeys.push(key);
            const newKey =  _.trim(key,'$');
            deepSelects = {...deepSelects,[newKey]:allSources[key]}
        }
    } );
    controllQuery.sort = sort;
    controllQuery.page = page;
    controllQuery.limit = limit;
    controllQuery.whereQueries = _.omit(req.query,usedKeys) ;
    controllQuery.deepSelects = deepSelects;
    
    if(!_.isEmpty(populate)){
        controllQuery.populate  = populate
    }
    if(!_.isEmpty(select)){
        controllQuery.select = select;
    }
    req.controllQuery = controllQuery;
    next();
}

const RESTPlugins = {
    selectPlugin,
    populatePlugin,
    populatePathPlugin,
    allFunctionsPlugin
}
export default RESTPlugins;