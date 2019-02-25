import mongoose from 'mongoose';
import Email from 'email-templates';
import ResourcesModel from './Model/resourcesModel';
import _ from 'lodash';
import inboxMailSchema, { collection } from '../schemas/inboxMail.schema';
let Model = mongoose.model(collection, inboxMailSchema);
Model = ResourcesModel(Model);
Model.getOriginalMessage = (mailTemplate) => {
	const { from, to, template, locals } = mailTemplate;
	const email = new Email({ message: { from } });
	return email
		.send({
			template,
			message: { to },
			transport: {
				jsonTransport: true
			},
			locals
		})
		.then((res) => res.originalMessage)
		.catch((err) => err);
};
export default Model;
