import mongoose from 'mongoose';
import { DEFAULT_IMAGE } from '../seeds/default';
const { Schema } = mongoose;
export const collection = 'Image';
export const ImageSchema = Schema(
	{
		photoUrl: { type: String, default: DEFAULT_IMAGE },
		thumUrl: { type: String, default: DEFAULT_IMAGE },
		tag: String
	},
	{ collection: collection, timestamps: true }
);
export default ImageSchema;
