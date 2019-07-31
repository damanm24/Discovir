import { Router } from 'express';
import { addUserListeningHistory, getRecommendations } from '../controllers/graph.controller';

const graph = Router();

graph.post('/addUserHistory', addUserListeningHistory);
graph.get('/generateRecommendations', getRecommendations);

export default graph;
