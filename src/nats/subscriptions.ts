import { Message } from 'node-nats-streaming';
import { natsClient } from './nats-helper';

const PRICE_UPDATE_EVENT = '';
const CANDLE_UPDATE_EVENT = '';
const FEED_UPDATE_EVENT = '';

export function createSubscriptions() {
     const client = natsClient.getInstance().getClient();
     client.on('connect', () => {
          const priceSubscriptions = client.subscribe(PRICE_UPDATE_EVENT);
          const candleSubscription = client.subscribe(CANDLE_UPDATE_EVENT);
          const feedSubscriptions = client.subscribe(FEED_UPDATE_EVENT);
          priceSubscriptions.on('message', (message: Message) => {
               const msg = message.getData();
               if (typeof msg === 'string') {
                    try {
                         const parsed = JSON.parse(msg);
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
