import { ServerResponse } from "http"
import { User } from "../types"

export const getAllUsers = (response: ServerResponse, db: Array<User>) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(db));
}

export const getUser = (response: ServerResponse, user: User) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(user));
}