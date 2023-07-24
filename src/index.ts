import { createServer, IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';
import cluster from 'cluster';
import { User, db } from './types';
import requestRouter from './router';
import "dotenv/config";

const server = createServer();
const cpuNum = os.cpus().length;
const args = process.argv;
const masterPort = +process.env.PORT;



server.on('request', async (request: IncomingMessage, response: ServerResponse) => {
  requestRouter(request, response);
});

if (args.includes('--multi')) {
  if (cluster.isPrimary) {
    for (let i = 1; i <= cpuNum; i += 1) {
      const portNext = masterPort + i;
      cluster.fork({ portNext });
    }
  } else {
    server.listen(process.env.portNext, () => {
      console.log(`Part of server running on port ${process.env.portNext}`);
    });
  }
} else {
  server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}
