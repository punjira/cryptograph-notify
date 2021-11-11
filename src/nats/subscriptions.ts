import { Message } from 'node-nats-streaming';
import { natsClient } from './nats-helper';

import { Emitter } from '../socket/socket';
import { createSignalFeed, NatsFeed } from '../helpers/feed-helpers';
import { createFeed } from '../controllers/feed-controller';

const PRICE_UPDATE_EVENT = 'PRICE_UPDATE_EVENT';
const CANDLE_UPDATE_EVENT = 'NEW_CANDLESTICK_UPDATE_EVENT';
const FEED_UPDATE_EVENT = 'things';
const NEW_SIGNAL_EVENT = 'NEW_SIGNAL_EVENT';
const SIGNAL_FEED_EVENT = 'SIGNAL_FEED_EVENT';

export function createSubscriptions() {
     const client = natsClient.getInstance().getClient();
     client.on('connect', () => {
          const priceSubscriptions = client.subscribe(PRICE_UPDATE_EVENT);
          const candleSubscription = client.subscribe(CANDLE_UPDATE_EVENT);
          const feedSubscriptions = client.subscribe(FEED_UPDATE_EVENT);
          const signalSubscription = client.subscribe(NEW_SIGNAL_EVENT);
          const signalFeedSubscription = client.subscribe(SIGNAL_FEED_EVENT);
          signalFeedSubscription.on('message', (message: Message) => {
               const msg = message.getData();
               if (typeof msg === 'string') {
                    try {
                         const parsed: NatsFeed = JSON.parse(msg);
                         const feed = createSignalFeed(parsed);
                         createFeed(feed)
                              .then(() => {
                                   Emitter('feed_update', feed);
                              })
                              .catch((err) => {});
                    } catch (err: any) {}
               }
          });
          signalSubscription.on('message', (message: Message) => {
               const msg = message.getData();
               if (typeof msg === 'string') {
                    try {
                         const parsed = JSON.parse(msg);
                         Emitter('signal_update', parsed);
                    } catch (err: any) {}
               }
          });
          priceSubscriptions.on('message', (message: Message) => {
               const msg = message.getData();
               if (typeof msg === 'string') {
                    try {
                         const parsed = JSON.parse(msg);
                         Emitter('price_update', parsed);
                    } catch (err: any) {}
               }
          });
          candleSubscription.on('message', (message: Message) => {
               const msg = message.getData();
               if (typeof msg === 'string') {
                    try {
                         const parsed = JSON.parse(msg);
                    } catch (err: any) {}
               }
          });
          feedSubscriptions.on('message', (message: Message) => {
               const msg = message.getData();
               if (typeof msg === 'string') {
                    try {
                         const parsed = JSON.parse(msg);
                    } catch (err: any) {}
               }
          });
     });
}
