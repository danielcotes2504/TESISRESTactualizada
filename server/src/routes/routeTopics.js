const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topics');

// router.get('/', variableController.getVariables);
router.get('/:user', topicController.getTopicsU);
router.get('/:id/:user',topicController.getTopicsUID);
router.post('/:id/:user',topicController.postTopic);
router.delete('/deletOneTopic/:user', topicController.deleteTopics)
router.delete('/deleteAllTopics',topicController.deleteAllTopics)


module.exports = router;