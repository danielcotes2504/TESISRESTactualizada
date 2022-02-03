const express = require("express");
const router = express.Router();
const request = require("request");
const { IP_ADDRESS, PORT_1 } = require("../enviroment");

var port = process.env.PORT1 || PORT_1;
//var hostURL = "http://192.168.20.42:" + port;
var hostURL = IP_ADDRESS + port;

router.get("/:user", (req, res) => {

    const { user } = req.params;
    const uri = hostURL + "/topics/" + user;

    request.get(uri, (err, resp, body) => {
        body = JSON.parse(body);

        if (err || resp.status == 500) {
            res.status(500).send({ ERROR: "Error searching" });
        } else {
            if (body.length) {
                res.status(resp.statusCode).send(body);
            } else {
                res.status(404).send({ message: "Topics not found for this user" });
            }
        }
    });
});

router.post("/:id/:user", (req, res) => {
    //console.log(req.params)
    const id = req.params.id;
    const user = req.params.user;


    const uriFind =
        hostURL +
        "/topics/" +
        id +
        "/" +
        user;

    const uriSave =
        hostURL +
        "/topics/" +
        id +
        "/" +
        user;

    request.get(uriFind, (err, resp, body) => {
        body = JSON.parse(body);

        if (err || resp.status == 500) {
            res.status(500).send({ ERROR: "Error saving" });
        } else {
            if (body.length) {
                res.status(400).send({ ERROR: "Topic already exists" });
            } else {
                request.post({ url: uriSave, body: req.body, json: true },
                    (err, resp, body) => {
                        if (err || resp.statusCode == 500) {
                            res.status(500).send({ ERROR: "Error saving" });
                        } else {
                            res.status(resp.statusCode).send(body);
                        }
                    }
                );
            }
        }
    });
});

router.delete("/deleteOneTopic/:user", (req, res) => {
    const { user } = req.params;
    const uri =
        hostURL +
        "/topics/" +
        "deletOneTopic/"
        user;
        request.del(uri, (err, resp, body) => {
            body = JSON.parse(body);

            if (err || resp.statusCode == 500) {
                res.status(500).send({ ERROR: "Error removing" });
            } else {
                res.status(resp.statusCode).send(body);
            }
        });
}
);

router.delete("/deleteAllTopics", (req, res) => {
      const uri =
        hostURL +
        "/topics/" +
        "deleteAllTopics"
        request.del(uri, (err, resp, body) => {
            body = JSON.parse(body);

            if (err || resp.statusCode == 500) {
                res.status(500).send({ ERROR: "Error removing" });
            } else {
                res.status(resp.statusCode).send(body);
            }
        });
}
);


module.exports = router;