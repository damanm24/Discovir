import express from "express"; // Express web server framework
import cors from "cors";
import cookieParser from "cookie-parser";
import auth from './routes/auth.route';
import graph from './routes/graph.route';
import { connect, disconnect } from "./helpers/database.helper";


const app = express();
connect();

app.use(cors()).use(cookieParser());

app.use('/auth', auth);
app.use('/graph', graph);

const server = app.listen(8080, function() {
  console.log("Discovir server loaded on port 8080");
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log("Server terminated");
    });

    disconnect();
});
