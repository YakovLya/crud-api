import { IncomingMessage, ServerResponse } from "http";
import sendError from "../error";
import { User } from "../types";

const updateUser = (request: IncomingMessage, response: ServerResponse, db: Array<User>, id: string) => {
  const user: User | undefined = db.find((userDB) => (userDB.id === id));
  if (!user) {
    sendError(response, 500, '500 Server Error');
    throw new Error('User is undefined, but he was');
  }

  let data = '';
  request.on('data', (dataChunk) => { data += dataChunk });
  request.on('end', () => {
    try {
      const userUpd: User = JSON.parse(data);
      if (userUpd.username) user.username = userUpd.username;
      if (userUpd.age) user.age = userUpd.age;
      if (userUpd.hobbies) user.hobbies = userUpd.hobbies;
      
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(user));
    } catch (err) {
      sendError(response, 400, '404 Bad Request');
    }
  });
}

export default updateUser;
