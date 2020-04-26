
const http = require('http');
const app = require('./app');

const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`RESTful API server started on port ${port}`);
});
