import { createServer, IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { User } from './types';
import requestRouter from './router';
import "dotenv/config";

const server = createServer();

const db: Array<User> = [
  {
    id: uuidv4(),
    username: 'tester',
    age: 42,
    hobbies: ['nothing'],
  }
];


server.on('request', async (request: IncomingMessage, response: ServerResponse) => {
  requestRouter(request, response, db);
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});