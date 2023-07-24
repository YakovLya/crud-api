import { ServerResponse } from "http"
import { User } from "../types"

const deleteUser = (response: ServerResponse, db: Array<User>, user: User) => {
  db.splice(db.indexOf(user), 1);
  response.statusCode = 204;
  response.end();
}

export default deleteUser;