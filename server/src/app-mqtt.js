let mqtt = require('mqtt');


const express = require("express");
const router = express.Router();
require("./requestMethods/get.js")();
require("./requestMethods/post.js")();

/* GET TOKEN */
const getToken = async (string) => {
    const url = `http://localhost:3000/api/tokenuser/${string}`
    const data = await requestData(url)
    const token = data;
    //console.log(token)
    return token;

}
/* SEND MQTT VALUES TO "apiValues"*/
const postMqttData = async (string, body) => {
    const url = `http://localhost:8000/${string}`;
    const data = await postData(url, body)
    console.log(data)

}

router.get("/apiValuesMQTT/:user/:project/:deviceN/:variableN", (req, res) => {
    console.log(req.params);
    const { user } = req.params;
    const { project } = req.params;
    const { deviceN } = req.params;
    const { variableN } = req.params;

    let PostURL = `/${user}/${project}/${deviceN}/${variableN}`;
    let topico = `${project}/${deviceN}/${variableN}`;
    const token = getToken(user).then(meta => {
        const { value } = meta.token[0];
        PostURL = `${PostURL}/${value}`
        //  console.log(PostURL)
        options = { username: user, password: value }
        let client = mqtt.connect('mqtt://localhost', options);


        client.on('connect', function () {
            client.subscribe(topico, function (err) {
                console.log(`suscrito a ${topico}`)
                if (err) {
                    console.log("error en la subscripcion")
                }
            })

        })

        client.on('message', function (topic, message) {
            // message is Buffer
            json1 = JSON.parse(message.toString()); //de esta manera se convierte el mensaje recibido en un json
            console.log(json1);
            postMqttData(`${user}/${project}/${deviceN}/${variableN}/${value}`, json1)


        })
    });
    res.send({ "value": "success" })

});





module.exports = router;