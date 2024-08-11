import { Schema, Document } from 'mongoose';

export interface Tweet extends Document {
  message: string;
  userId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const TweetSchema = new Schema<Tweet>({
  message: {
    type: String,
    required: true,
    maxlength: 200,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});
