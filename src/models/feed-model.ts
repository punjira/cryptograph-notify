import mongoose from 'mongoose';

export enum FeedType {
     SIGNAL = 'signal',
}

export interface Feed {
     english_test: string;
     farsi_test: string;
     date: number;
     type: FeedType;
     signal: mongoose.Schema.Types.ObjectId;
     name: string;
     access_level?: string;
}

const FeedSchema = new mongoose.Schema<Feed>({
     english_test: {
          required: true,
          type: String,
     },
     farsi_test: {
          required: true,
          type: String,
     },
     signal: {
          required: true,
          type: mongoose.Schema.Types.ObjectId,
          ref: 'signal',
     },
     name: {
          required: true,
          type: String,
          default: '',
     },
     date: {
          required: true,
          type: Number,
     },
     type: {
          required: true,
          enum: FeedType,
          type: String,
     },
     access_level: {
          type: String,
          required: false,
          default: 'user',
     },
});

const FeedModel = mongoose.model<Feed>('feed', FeedSchema);

export { FeedModel };
