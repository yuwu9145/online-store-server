import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from '../interfaces/user';

export interface IUserModel extends IUser, Document {

}

export let UserSchema: Schema = new Schema({
    name: String,
    password: String,
    admin: Boolean
});

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);