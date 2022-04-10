import { Server } from 'socket.io';
import app from './app';
import config from '../config/config';

const { port } = config.app;

// Starting server
const server = app.listen(port, () => {
  console.log(`Server running on ${server.address().port}`);
});

const io = new Server(server);

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
