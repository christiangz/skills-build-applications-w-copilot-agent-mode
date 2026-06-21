import { Schema, model, Document } from 'mongoose';

export interface Team {
  id: string;
  name: string;
  members: number;
}

export interface TeamDocument extends Document {
  name: string;
  members: number;
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true },
    members: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

teamSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

const TeamModel = model<TeamDocument>('Team', teamSchema, 'teams');

export default TeamModel;
