import * as http from 'http';
import "dotenv/config";

const server = http.createServer();

server.on('request', async (request, response) => {
  console.log('SAAA');
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});