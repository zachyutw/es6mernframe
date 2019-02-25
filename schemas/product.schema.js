import mongoose from 'mongoose';
const { Schema } = mongoose;
import imageSchema from './image.schema';
export const collection = 'Product';
export const ProductSchema = Schema(
	{
		name: { type: String, required: true },
		title: { type: String, required: true },
		label: { type: String, index: true, default: 'default' },
		price: { type: Number, default: 0 },
		desc: { type: String, default: 'We are building more contents for our products' },
		supplier: { type: String, default: 'JSislandClan' },
		photoUrl: { type: String },
		image: imageSchema
	},
	{ collection: collection, timestamps: true }
);

export default ProductSchema;
