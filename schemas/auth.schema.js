import mongoose from 'mongoose';
import types from './types/types';
import { userRef } from './combineRefs';
const { Schema } = mongoose;
export const collection = 'Auth';
const enumRoles = [ 'guest', 'primary', 'admin' ];
const enumPrivilege = [ 'Read Only', 'Read and Write', 'Write Only' ];
const AuthSchema = Schema(
	{
		user: { ...userRef, required: true, unique: true },
		username: { type: String, required: true, unique: true },
		password: { type: String },
		email: types.emailType,
		provider: {
			google: types.providerType,
			wechat: types.providerType,
			phone: types.providerType
		},
		isVerify: { type: Boolean, default: false },
		role: { type: String, enum: enumRoles, default: 'guest' },
		level: { type: Number, default: 0 },
		privilege: { type: String, enum: enumPrivilege, default: 'Read Only' },
		isActived: { type: Boolean, default: true }
	},
	{ collection: collection, timestamps: true }
);
export default AuthSchema;
export const authRef = { type: Schema.Types.ObjectId, ref: collection };
