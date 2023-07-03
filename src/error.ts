import { ServerResponse } from "http";

const sendError = (response: ServerResponse, code: number, msg: string) => {
  response.statusCode = code;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify({ error: msg }));
}

export default sendError