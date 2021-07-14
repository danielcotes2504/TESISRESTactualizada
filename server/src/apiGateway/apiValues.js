const express = require("express");
const router = express.Router();
require("../requestMethods/post.js")();
const request = require("request");

var port = process.env.PORT1 || 8000;
//var hostURL = "http://192.168.20.42:" + port;
var hostURL = "http://localhost:" + port;
var portToken = process.env.PORT || 3000;
//var hostToken = "http://192.168.20.42:" + portToken + "/api/tokenuser/";
var hostToken = "http://localhost:" + portToken + "/api/tokenuser/";

const postMqttData = async(string, body) => {
    const url = string
    const data = await postData(url, body)
    console.log(data)

}
router.get("/:user/:project/:deviceN/:variableN", (req, res) => {
    const { user } = req.params;
    const { project } = req.params;
    const { deviceN } = req.params;
    const { variableN } = req.params;
    const uri =
        hostURL +
        "/values/" +
        user +
        "/" +
        project +
        "/" +
        deviceN +
        "/" +
        variableN;

    request.get(uri, (err, resp, body) => {
        body = JSON.parse(body);

        if (err || resp.status == 500) {
            res.status(500).send({ ERROR: "Error searching" });
        } else {
            res.status(resp.statusCode).send(body);
        }
    });
});

router.get(
    "/:user/:project/:deviceN/:deviceH/:variableN/:variableT",
    (req, res) => {

        const { user } = req.params;
        const { project } = req.params;
        const { deviceN } = req.params;
        const { deviceH } = req.params;
        const { variableN } = req.params;
        const { variableT } = req.params;
        const uriPost = hostURL + "/mqtt/apiValuesMQTT/";
        const uri =
            hostURL +
            "/values/" +
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


        request.get(uri, (err, resp, body) => {
            body = JSON.parse(body);

            if (err || resp.status == 500) {
                res.status(500).send({ ERROR: "Error searching" });
            } else {
                res.status(resp.statusCode).send(body);

                postMqttData(uriPost, req.params)

            }
        });
    }
);

router.post("/:user/:project/:deviceN/:variableN/:token", (req, res) => {
    const { user } = req.params;
    const { project } = req.params;
    const { deviceN } = req.params;
    const { variableN } = req.params;
    const { token } = req.params;

    const uriToken = hostToken + user;

    request.get(uriToken, (err, resp, body) => {
        body = JSON.parse(body);

        if (err || resp.statusCode == 500) {
            res.status(500).send(err);
        } else {
            if (resp.statusCode == 200) {
                if (body.token[0].value == token) {
                    var uri =
                        hostURL +
                        "/variables/" +
                        user +
                        "/" +
                        project +
                        "/" +
                        deviceN +
                        "/" +
                        variableN;

                    request.get(uri, (err, resp, body) => {
                        body = JSON.parse(body);

                        if (err || resp.status == 500) {
                            res.status(500).send({ ERROR: "Error searching" });
                        } else {
                            if (body.length) {
                                const deviceH = body[0].deviceH;
                                const variableT = body[0].variableT;
                                const variableInd = body[0].variableInd;
                                const constant = body[0].constant;
                                const operation = body[0].operation;
                                const positive = body[0].positive;
                                const negative = body[0].negative;

                                const uri =
                                    hostURL +
                                    "/values/" +
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
                                    variableT +
                                    "/" +
                                    variableInd +
                                    "/" +
                                    constant +
                                    "/" +
                                    operation +
                                    "/" +
                                    positive +
                                    "/" +
                                    negative;

                                request.post({ url: uri, body: req.body, json: true },
                                    (err, resp, body) => {
                                        if (err || resp.statusCode == 500) {
                                            res.status(500).send({ ERROR: "Error saving" });
                                        } else {
                                            res.status(resp.statusCode).send(body);
                                        }
                                    }
                                );
                            } else {
                                res.status(404).send({ message: "Variable not found" });
                            }
                        }
                    });
                } else {
                    res.send({ ERROR: "Token invalid" });
                }
            } else {
                res.status(resp.statusCode).send(body);
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
            "/values/" +
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