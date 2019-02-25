import mongoose from 'mongoose';
import _ from 'lodash';
import types from './types/types';
const { Schema } = mongoose;
export const collection = 'User';
import { imageRef, chatroomRef } from './combineRefs';

const UserSchema = Schema(
	{
		username: { type: String, required: true, unique: true },
		email: types.emailType,
		image: imageRef,
		displayName: { type: String, default: 'New User' },
		phone: { type: String },
		chatrooms: [ chatroomRef ],
		detail: {
			familyName: String,
			givenName: String,
			middleName: String,
			gender: String,
			region: String,
			yearOfBirth: { type: String }
		}
	},
	{ collection: collection, timestamps: true }
);

export default UserSchema;
