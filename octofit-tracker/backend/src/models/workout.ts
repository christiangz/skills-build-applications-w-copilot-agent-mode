import { Schema, model, Document } from 'mongoose';

export interface Workout {
  id: string;
  name: string;
  focus: string;
  durationMinutes: number;
}

export interface WorkoutDocument extends Document {
  name: string;
  focus: string;
  durationMinutes: number;
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    name: { type: String, required: true },
    focus: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

workoutSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

const WorkoutModel = model<WorkoutDocument>('Workout', workoutSchema, 'workouts');

export default WorkoutModel;
