import express from 'express';
import { MongoConnect } from './database/mongo';
import { createSubscriptions } from './nats/subscriptions';

const app = express();

MongoConnect(() => {
     createSubscriptions();
});

app.listen(process.env.PORT, () => {});
