const Topics = require('../models/topic')
const topics = {}

function getTopicsU(req, res) {

    const user = req.params.user;

    const query = { 'user': user };

    Topics.find(query, (err, results) => {
        if (err) {
            res.status(500).send({ ERROR: 'Error searching' });
        } else {
            return res.status(200).send(results);

        }
    });
};

function getTopicsUID(req, res) {

    const id = req.params.id;
    const user = req.params.user;


    const query = { '_id': id, 'user': user };

    Topics.find(query, (err, results) => {
        if (err) {
            res.status(500).send({ ERROR: 'Error searching' })
            console.log("user and id error: " + err)

        } else {
            res.status(200).send(results);
        }
    });
};


function postTopic(req, res) {

    const topic = new Topics();

    const id = req.params.id;
    const user = req.params.user;
    console.log(req.params)
    topic._id = id;
    topic.user = user;


    topic.save((err, results) => {
        if (err) {
            res.status(500).send({ ERROR: 'Error saving' });
        } else {


            res.status(200).send({ message: 'Saved' });
        }
    });
};

function deleteTopics(req, res) {

    const { user } = req.params;
    const query = { 'user': user };

    Topics.deleteMany(query, async (err, results) => {
        if (err) {
            res.status(500).send({ ERROR: 'Error removing' });
        } else {
            if (results.n > 0) {
                    res.status(200).send({ message: 'Deleted' });
            } else {
                res.status(404).send({ message: 'Topics not found' });
            }
        }
    });



};

function deleteAllTopics(req, res) {
    const query ={}
    console.log("blimblam")
       Topics.deleteMany(query, async (err, results) => {
           console.log(results)
           console.log("blimblam")
        if (err) {
            res.status(500).send({ ERROR: 'Error removing' });
        } else {
          //  console.log("numero de resultados" + results.n);
            if (results.n > 0) {
                
                    res.status(200).send({ message: 'Deleted' });
            } else {
                res.status(404).send({ message: 'Topics not found hijueputa' });
            }
        }
    });



};

topics.getTopicsU = getTopicsU;
topics.getTopicsUID = getTopicsUID;
topics.postTopic = postTopic;
topics.deleteTopics = deleteTopics;
topics.deleteAllTopics = deleteAllTopics;
module.exports = topics;

