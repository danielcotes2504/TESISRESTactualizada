const express = require("express");
const router = express.Router();
const request = require("request");
const { IP_ADDRESS, PORT_1 } = require("../enviroment");



var port = process.env.PORT1 || PORT_1;
//var hostURL = "http://192.168.20.42:" + port;
var hostURL = IP_ADDRESS + port;
router.get("/:user/:project", (req, res) => {
    const { user } = req.params;
    const { project } = req.params;
    const uri = hostURL + "/devices/" + user + "/" + project;

    request.get(uri, (err, resp, body) => {
        body = JSON.parse(body);

        if (err || resp.status == 500) {
            res.status(500).send({ ERROR: "Error searching" });
        } else {
            res.status(resp.statusCode).send(body);
        }
    });
});


router.post("/:user/:project", (req, res) => {
    const { user } = req.params;
    const { project } = req.params;
    const { deviceN } = req.body;
    const { deviceH } = req.body;

    const uriFind =
        hostURL +
        "/devices/" +
        user +
        "/" +
        project +
        "/" +
        deviceN +
        "/" +
        deviceH;
    const uriSave = hostURL + "/devices/" + user + "/" + project;

    request.get(uriFind, (err, resp, body) => {
        body = JSON.parse(body);

        if (err || resp.status == 500) {
            res.status(500).send({ ERROR: "Error saving" });
        } else {
            if (body.length) {
                res.status(400).send({ ERROR: "Device already exists" });
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

router.put("/:user/:project/:deviceN/:deviceH", (req, res) => {
    const { user } = req.params;
    const { project } = req.params;
    const { deviceN } = req.params;
    const { deviceH } = req.params;

    const newProject = req.body.project;
    const newDeviceN = req.body.deviceN;
    const newDeviceH = req.body.deviceH;

    const uriFind =
        hostURL +
        "/devices/" +
        user +
        "/" +
        newProject +
        "/" +
        newDeviceN +
        "/" +
        newDeviceH;
    const uriPut =
        hostURL +
        "/devices/" +
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
            res.status(500).send({ ERROR: "Error updating" });
        } else {
            if (body.length) {
                res.status(400).send({ ERROR: "Project already exists" });
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

router.delete("/:user/:project/:deviceN/:deviceH", (req, res) => {
    const { user } = req.params;
    const { project } = req.params;
    const { deviceN } = req.params;
    const { deviceH } = req.params;

    const uri =
        hostURL +
        "/devices/" +
        user +
        "/" +
        project +
        "/" +
        deviceN +
        "/" +
        deviceH;

    request.del(uri, (err, resp, body) => {
        body = JSON.parse(body);

        if (err || resp.statusCode == 500) {
            res.status(500).send({ ERROR: "Error removing" });
        } else {
            res.status(resp.statusCode).send(body);
        }
    });
});

module.exports = router;