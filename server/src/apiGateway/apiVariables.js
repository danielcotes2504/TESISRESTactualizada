const express = require("express");
const router = express.Router();

const request = require("request");

var port = process.env.PORT1 || 8000;
//var hostURL = "http://192.168.20.42:" + port;
var hostURL = "http://localhost:" + port;

router.get("/:user", (req, res) => {
    const { user } = req.params;
    const uri = hostURL + "/variables/" + user;

    request.get(uri, (err, resp, body) => {
        body = JSON.parse(body);

        if (err || resp.status == 500) {
            res.status(500).send({ ERROR: "Error searching" });
        } else {
            if (body.length) {
                res.status(resp.statusCode).send(body);
            } else {
                res.status(404).send({ message: "Variables not found for this user" });
            }
        }
    });
});

router.get("/:user/:project", (req, res) => {
    const { user } = req.params;
    const { project } = req.params;
    const uri = hostURL + "/variables/" + user + "/" + project;

    request.get(uri, (err, resp, body) => {
        //body = JSON.parse(body);

        if (err || resp.status == 500) {
            res.status(500).send({ ERROR: "Error searching" });
        } else {
            if (body.length) {
                res.status(resp.statusCode).send(body);
            } else {
                res
                    .status(404)
                    .send({ message: "Variables not found for this project" });
            }
        }
    });
});

router.get("/:user/:project/:deviceN", (req, res) => {
    const { user } = req.params;
    const { project } = req.params;
    const { deviceN } = req.params;
    const uri = hostURL + "/variables/" + user + "/" + project + "/" + deviceN;

    request.get(uri, (err, resp, body) => {
        body = JSON.parse(body);

        if (err || resp.status == 500) {
            res.status(500).send({ ERROR: "Error searching" });
        } else {
            res.status(resp.statusCode).send(body);
        }
    });
});

router.post("/:user/:project/:deviceN/:deviceH", (req, res) => {
    const { user } = req.params;
    const { project } = req.params;
    const { deviceN } = req.params;
    const { deviceH } = req.params;
    const { variableN } = req.body;

    const uriFind =
        hostURL +
        "/variables/" +
        user +
        "/" +
        project +
        "/" +
        deviceN +
        "/" +
        variableN;
    const uriSave =
        hostURL +
        "/variables/" +
        user +
        "/" +
        project +
        "/" +
        deviceN +
        "/" +
        deviceH;

    request.get(uriFind, (err, resp, body) => {
        body = JSON.parse(body);

        if (err || resp.status == 500) {
            res.status(500).send({ ERROR: "Error saving" });
        } else {
            if (body.length) {
                res.status(400).send({ ERROR: "Variable already exists" });
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

router.put("/:user/:project/:deviceN/:variableN/", (req, res) => {
    const { user } = req.params;
    const { project } = req.params;
    const { deviceN } = req.params;
    const { variableN } = req.params;

    const newVariableN = req.body.variableN;
    const newVariableT = req.body.variableT;

    const uriFind =
        hostURL +
        "/variables/" +
        user +
        "/" +
        project +
        "/" +
        deviceN +
        "/" +
        newVariableN;
    const uriPut =
        hostURL +
        "/variables/" +
        user +
        "/" +
        project +
        "/" +
        deviceN +
        "/" +
        variableN;

    request.get(uriFind, (err, resp, body) => {
        body = JSON.parse(body);

        if (err || resp.status == 500) {
            res.status(500).send({ ERROR: "Error updating" });
        } else {
            if (body.length) {
                res.status(400).send({ ERROR: "Variable already exists" });
            } else {
                request.put({ url: uriPut, body: req.body, json: true },
                    (err, resp, body) => {
                        if (err || resp.statusCode == 500) {
                            res.status(500).send({ ERROR: "Error updating" });
                        } else {
                            res.status(resp.statusCode).send(body);
                        }
                    }
                );
            }
        }
    });
});

router.delete(
    "/:user/:project/:deviceN/:deviceH/:variableN/:variableT",
    (req, res) => {
        const { user } = req.params;
        const { project } = req.params;
        const { deviceN } = req.params;
        const { deviceH } = req.params;
        const { variableN } = req.params;
        const { variableT } = req.params;

        const uri =
            hostURL +
            "/variables/" +
            user +
            "/" +
            project +
            "/" +
            deviceN +
            "/" +
            deviceH +
            "/" +
            variableN +
            "/" +
            variableT;

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