import { Server } from 'socket.io';

// keep him scoped
var io;

export function createIOClient(server) {
     io = new Server(server, {
          cors: {
               origin: '*',
               methods: ['GET', 'POST'],
          },
     });
     io.on('connection', (socket) => {
          console.log('new connection created');
     });
}

export function Emitter(topic, message) {
     if (io) {
          io.emit(topic, JSON.stringify(message));
     }
}
