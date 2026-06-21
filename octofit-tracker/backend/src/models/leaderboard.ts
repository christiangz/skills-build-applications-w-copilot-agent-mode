import { Schema, model, Document } from 'mongoose';

export interface LeaderboardEntry {
  id: string;
  position: number;
  team: string;
  score: number;
}

export interface LeaderboardEntryDocument extends Document {
  position: number;
  team: string;
  score: number;
}

const leaderboardSchema = new Schema<LeaderboardEntryDocument>(
  {
    position: { type: Number, required: true },
    team: { type: String, required: true },
    score: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

leaderboardSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

const LeaderboardModel = model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardSchema, 'leaderboard');

export default LeaderboardModel;
