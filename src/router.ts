import { IncomingMessage, ServerResponse } from "http";
import { validate } from 'uuid'
import { User, db } from "./types";
import { getAllUsers, getUser } from "./api/get";
import createUser from "./api/post";
import sendError from "./error";
import deleteUser from "./api/delete";
import updateUser from "./api/put";

const endPoint = '/api/users';
const endPointId = '/api/users/';

const requestRouter = (request: IncomingMessage, response: ServerResponse) => {
  try {
    const {url} = request;
    if (!url) {
      sendError(response, 404, '404 Not Found. No URL');
      return;
    }
    if (url === endPoint) {
      switch (request.method) {
        case 'GET':
          getAllUsers(response, db);
          break;
        case 'POST':
          createUser(request, response, db);
          break;
        default:
          sendError(response, 404, '404 Not Found. Wrong Method');
      }
    } else if (url.includes(endPointId)) {
      const id: string = url.slice(endPointId.length);
      if (!validate(id)) {
        sendError(response, 400, '400 Bad Request. userId is invalid')
        return;
      }
      const user: User | undefined = db.find((userDB) => (userDB.id === id));
      if (!user) {
        sendError(response, 404, '404 Not Found. No such user')
        return;
      }
      switch (request.method) {
        case 'GET':
          getUser(response, user);
          break;
        case 'PUT':
          updateUser(request, response, db, id);
          break;
        case 'DELETE':
          deleteUser(response, db, user);
          break;
        default:
          sendError(response, 404, '404 Not Found. Wrong Method');
      }
    } else
      sendError(response, 404, '404 Not Found');
  } catch (err) {
    sendError(response, 500, '500 Sorry, Server-side error. Please, try later');
    console.log("ERROR log: ", err);
  }
}


export default requestRouter;