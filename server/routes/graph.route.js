import { Router } from "express";
import { addUserListeningHistory } from "../controllers/graph.controller";
let graph = Router();

graph.post('/addUserHistory', addUserListeningHistory)

export default graph;