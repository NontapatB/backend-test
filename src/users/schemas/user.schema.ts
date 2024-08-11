import { Schema, Document, Types } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  following: Types.ObjectId[];
}

export const UserSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
});
