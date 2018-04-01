import { Document, Schema, Model, model } from 'mongoose';
import { IProduct } from '../interfaces/product';

export interface IProductModel extends IProduct, Document {}

export let ProductSchema: Schema = new Schema({
    name: String,
    sku: String,
    description: String,
    price: Number,
    images: Array
});

export const Product: Model<IProductModel> = model<IProductModel>('Product', ProductSchema);