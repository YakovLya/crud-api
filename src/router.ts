import { IncomingMessage, ServerResponse } from "http";
import getAllUsers from "./api/get";
import createUser from "./api/post";
import sendError from "./error";
import { User } from "./types";

const endPoint = '/api/users';

const requestRouter = (request: IncomingMessage, response: ServerResponse, db: Array<User>) => {
  try {
    if (request.url === endPoint) {
      switch (request.method) {
        case 'GET':
          getAllUsers(response, db);
          break;
        case 'POST':
          createUser(request, response, db);
          break;
        default:
          sendError(response, 404, '404 Not Found');
      }
    } else if (false) {

    } else
      sendError(response, 404, '404 Not Found');
  } catch (err) {
    sendError(response, 500, '500 Sorry, Server-side error. Please, try later');
    console.log("ERROR log: ", err);
  }
}


export default requestRouter;