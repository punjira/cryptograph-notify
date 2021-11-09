import express from 'express';
import http from 'http';

import { createIOClient } from './socket/socket';
import { MongoConnect } from './database/mongo';
import { createSubscriptions } from './nats/subscriptions';

import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser({ extended: true }));

const server = http.createServer(app);
createIOClient(server);

MongoConnect(() => {
     createSubscriptions();
});

server.listen(process.env.PORT, () => {});
