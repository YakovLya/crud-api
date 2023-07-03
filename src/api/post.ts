import { IncomingMessage, ServerResponse } from "http";
import { v4 as uuidv4 } from 'uuid';
import sendError from "../error";
import { User,writeToDb } from "../types";

const createUser = (request: IncomingMessage, response: ServerResponse, db: Array<User>) => {
  let data = '';
  request.on('data', (dataChunk) => { data += dataChunk });
  request.on('end', () => {
    try {
      const user: User = JSON.parse(data);
      if (!user.username || !user.age || !user.hobbies) {
        sendError(response, 400, '400 Bad Request. Body does not contain required fields');
        return;
      }
      user.id = uuidv4();
      db.push(user);
      writeToDb();
      response.statusCode = 201;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(user));
    } catch (err) {
      sendError(response, 400, '404 Bad Request');
    }
  });
}

export default createUser;
