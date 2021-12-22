const express = require("express");
const router = express.Router();
const request = require("request");

var mqtt = require('mqtt');
require("../requestMethods/get.js")();
require("../requestMethods/post.js")();


let state = {};

var client;
var options;
var port = process.env.PORT1 || 8000;
//var hostURL = "http://192.168.20.42:" + port;
var hostURL = "http://localhost:" + port;
/* SEND MQTT VALUES TO "apiValues"*/
const postMqttData = async (string, body) => {
    const url = `http://localhost:8000/${string}`;
    const data = await postData(url, body)
    console.log(data)


}
const getToken = async (string) => {
    const url = `http://localhost:3000/api/tokenuser/${string}`
    const data = await requestData(url)
    const token = data;
    //console.log(token)
    return token;

}

const postTopic = async (string) => {
    const url = `${hostURL}/apiTopics/${string}`;
    console.log(url)
    const data = await postData(url)
    console.log(data)


}






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
/*
router.post("/apiClientBroker", (req, res,next) => {
    let {user} = req.body;
    console.log(user)
    getToken(user).then(meta => {
        const { value } = meta.token[0];
        options = { username: user, password: value, clean: true, keepAlive: 60 }
       
        //console.log(client)
       })

})*/

router.post("/apiClientBroker", (req, res, next) => {
    const { user } = req.body

    const uri = `http://localhost:3000/api/tokenuser/${user}`

    request.get(uri, (err, resp, body) => {
        body = JSON.parse(body);

        if (err || resp.status == 500) {
            res.status(500).send({ ERROR: "Error searching" });
        } else {
            if (Object.keys(req.body).length) {
                const token = body.token[0].value
                options = { username: user, password: token, clean: true, keepAlive: 60 }
                client = mqtt.connect('mqtt://localhost', options);
                client.end();

                const uri =
                    hostURL +
                    "/apiTopics/" +
                    user;
                request.del(uri, (err, resp, body) => {
                    body = JSON.parse(body);

                    if (err || resp.statusCode == 500) {
                        res.status(500).send({ ERROR: "Error removing" });
                    } else {
                        res.status(resp.statusCode).send(body);
                    }
                });

            } else {

                res.status(404).send({ message: "TokenUser not found for this user" });
            }
        }
    });
    /* getToken(user).then(meta => {
         const { value } = meta.token[0];
         options = { username: user, password: value, clean: true, keepAlive: 60 }
         client = mqtt.connect('mqtt://localhost', options);
         client.end();
         const uri =
         hostURL +
         "/apiTopics/" +
         user;
         request.del(uri, (err, resp, body) => {
             body = JSON.parse(body);
 
             if (err || resp.statusCode == 500) {
                 res.status(500).send({ ERROR: "Error removing" });
             } else {
                 res.status(resp.statusCode).send(body);
             }
         });
         
         //console.log(client)
        })
 */
})
router.get("/:user/:project", (req, res, next) => {
    //  clientBrokerResponse(req.client)
    // console.log(client)
    const { user } = req.params;
    const { project } = req.params;
    const uri = hostURL + "/variables/" + user + "/" + project;

    request.get(uri, (err, resp, body) => {
        //body = JSON.parse(body);

        if (err || resp.status == 500) {
            res.status(500).send({ ERROR: "Error searching" });
        } else {
            if (body.length) {
                const json = JSON.parse(body);
                // console.log(client)
                getToken(user).then(meta => {
                    const { value } = meta.token[0];
                    options = { username: user, password: value, clean: true, keepAlive: 60 }
                    client = mqtt.connect('mqtt://localhost', options);
                    client.on('connect', function () {

                        for (let i = 0; i < json.length; i++) {
                            const { deviceN } = json[i];
                            const { variableN } = json[i];
                            const { variableT } = json[i];
                            const topico = `${user}/${project}/${deviceN}/${variableN}`;
                            const topico2 = `${user}_${project}_${deviceN}_${variableN}`;
                            if (variableT === 'Independiente') {

                                request.get(`${hostURL}/topics/${topico2}/${user}`, (err, resp, body) => {
                                    body = JSON.parse(body);

                                    if (err || resp.status == 500) {
                                        res.status(500).send({ ERROR: "Error saving" });
                                    } else {
                                        if (body.length) {
                                            res.status(400)//.send({ ERROR: "Topic already exists" });
                                        } else {

                                            request.post({ url: `${hostURL}/apiTopics/${topico2}/${user}`, body: req.body, json: true },
                                                (err, resp, body) => {
                                                    if (err || resp.statusCode == 500) {
                                                        res.status(500).send({ ERROR: "Error saving" });
                                                    } else {
                                                        client.subscribe(topico, function (err) {
                                                            console.log(`suscrito a ${topico}`)
                                                            //  postTopic(`${topico2}/${user}`)

                                                            if (err) {
                                                                console.log("error en la subscripcion")
                                                            }
                                                        })

                                                    }
                                                }
                                            );
                                        }
                                    }
                                });





                            }

                        }
                    })

                    client.on('message', function (topic, message) {


                        // message is Buffer

                        json1 = JSON.parse(message.toString()); //de esta manera se convierte el mensaje recibido en un json
                        console.log(json1);
                        //  if (json1.token === value) {
                        json2 = { 'value': json1.value }
                        postMqttData(`${topic}/${json1.token}`, json2)



                        //  } else {
                        //       console.log("Se está enviando a otro usuario el dato")
                        //  }


                    })

                })
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