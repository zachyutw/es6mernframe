import { emailReg, validateEmail } from '../validater/validater';
const emailType = {
	type: String,
	validate: [ validateEmail, 'Please fill a valid email address' ],
	match: [ emailReg, 'Please fill a match email address' ]
};
const providerType = {
	email: emailType,
	photoURL: { type: String },
	displayName: { type: String }
};

const types = { emailType, providerType };

export default types;
