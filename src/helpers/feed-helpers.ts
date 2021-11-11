import { Feed, FeedType } from '../models/feed-model';

export interface NatsFeed {
     message: string;
     en_message: string;
     location: number;
     signal: string;
     coin: {
          name: string;
          ticker: string;
          image: string;
     };
     interval?: string;
     name: string;
}

export function createSignalFeed(data: NatsFeed): Feed {
     return {
          date: data.location,
          english_test: data.en_message,
          farsi_test: data.message,
          name: data.name,
          type: FeedType.SIGNAL,
          signal: data.signal,
          coin: data.coin,
          interval: data.interval,
     };
}
