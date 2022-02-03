const express = require("express");
const router = express.Router();
require("../requestMethods/post.js")();
const request = require("request");
const { IP_ADDRESS, PORT_2, PORT_1 } = require("../enviroment.js");


var port = process.env.PORT1 || PORT_1;
//var hostURL = "http://192.168.20.42:" + port;
var hostURL = IP_ADDRESS + port;
var portToken = process.env.PORT || PORT_2;
//var hostToken = "http://192.168.20.42:" + portToken + "/api/tokenuser/";
var hostToken = IP_ADDRESS + portToken + "/api/tokenuser/";

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
        // console.log("bienvenido a apivalues")
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

                // postMqttData(uriPost, req.params)

            }
        });
    }
);

router.post("/:user/:project/:deviceN/:variableN/:token", (req, res) => {
    console.log("mensaje de uso post")
    const { user } = req.params;
    const { project } = req.params;
    const { deviceN } = req.params;
    const { variableN } = req.params;
    const { token } = req.params;
    console.log(user,project,deviceN,variableN,token)
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