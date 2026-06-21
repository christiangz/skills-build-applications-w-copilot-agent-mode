import { Schema, model, Document } from 'mongoose';

export interface Activity {
  id: string;
  userId: string;
  type: string;
  durationMinutes: number;
  calories: number;
  date: Date;
}

export interface ActivityDocument extends Document {
  userId: string;
  type: string;
  durationMinutes: number;
  calories: number;
  date: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

activitySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

const ActivityModel = model<ActivityDocument>('Activity', activitySchema, 'activities');

export default ActivityModel;
