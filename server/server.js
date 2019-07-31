import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express'; // Express web server framework
import { connect, disconnect } from './helpers/database.helper';
import auth from './routes/auth.route';
import graph from './routes/graph.route';

const path = require('path');
const bodyParser = require('body-parser');

const app = express();
connect();

app
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static(path.join(__dirname, '../build/static')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/'));
  });
}

app.use('/auth', auth);
app.use('/graph', graph);

const server = app.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('Discovir server loaded on port 8080');
});

process.on('SIGTERM', () => {
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log('Server terminated');
  });

  disconnect();
});
