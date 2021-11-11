import express from 'express';
import http from 'http';

import { createIOClient } from './socket/socket';
import { MongoConnect } from './database/mongo';
import { createSubscriptions } from './nats/subscriptions';

import cors from 'cors';
import bodyParser from 'body-parser';

import feedRoutes from './routes/feed-routes';

const app = express();

app.use(cors());
app.use(bodyParser({ extended: true }));

app.use('/feed', feedRoutes);

const server = http.createServer(app);
createIOClient(server);

MongoConnect(() => {
     createSubscriptions();
});

server.listen(process.env.PORT, () => {});
