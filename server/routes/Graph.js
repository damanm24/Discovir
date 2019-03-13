const express = require('express');
let router = express.Router();
let graphController = require('./controllers/graphController');


router.post("/addUserHistory", graphController.addUserListening);
router.get("/getGraph", graphController.getGraph);

module.exports = router;