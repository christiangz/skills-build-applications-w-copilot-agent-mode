import { Schema, model, Document } from 'mongoose';

export interface User {
  id: string;
  name: string;
  email: string;
  teamId?: string;
}

export interface UserDocument extends Document {
  name: string;
  email: string;
  teamId?: string;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    teamId: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

const UserModel = model<UserDocument>('User', userSchema, 'users');

export default UserModel;
