import nodemailer from 'nodemailer';
import InboxMail from '../models/inboxMail.model';
import logger from '../core/logger/app-logger';

import _ from 'lodash';
import resourcesController, { getResError, errorRes } from './Controller/resoruceContorller';
let controller = {};
const Model = InboxMail;
const ModelName = 'Email';

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'jslandclan@gmail.com',
		pass: '1117Yubizach'
	}
});

var mailOptions = {
	from: 'jslandclan@gmail.com',
	to: 'flyboring@gmail.com',
	subject: 'Sending Email using Node.js',
	text: 'That was easy!'
};
controller.send = async (req, res) => {
	const name = 'send';
	try {
		let sourceData = _.isEmpty(req.body) ? mailOptions : req.body;
		const originalMessage = await InboxMail.getOriginalMessage(sourceData);
		transporter.sendMail(originalMessage, (err, info) => {
			err ? console.log(err) : console.log(info);
			if (!err) {
				res.send({ message: 'send email', messageId: info.messageId });
			} else {
				errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
			}
		});
	} catch (err) {
		logger.error(`Error in getting ${ModelName} ${name}-  + ${err}`);
		errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
	}
};
export default controller;
