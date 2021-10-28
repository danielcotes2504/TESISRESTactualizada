let mqtt = require('mqtt');


const express = require("express");
const router = express.Router();
require("./requestMethods/get.js")();
require("./requestMethods/post.js")();
let state = {};

/* GET TOKEN */
const getToken = async(string) => {
        const url = `http://localhost:3000/api/tokenuser/${string}`
        const data = await requestData(url)
        const token = data;
        //console.log(token)
        return token;

    }
    /* SEND MQTT VALUES TO "apiValues"*/
const postMqttData = async(string, body) => {
    const url = `http://localhost:8000/${string}`;
    const data = await postData(url, body)
    console.log(data)

}

router.get("/apiValuesMQTT/:user/:project/:deviceN/:variableN", (req, res) => {


    //console.log(req.params);
    const { user } = req.params;
    const { project } = req.params;
    const { deviceN } = req.params;
    const { variableN } = req.params;

    let PostURL = `/${user}/${project}/${deviceN}/${variableN}`;
    let topico = `${user}/${project}/${deviceN}/${variableN}`;
    const token = getToken(user).then(meta => {
        const { value } = meta.token[0];
        //console.log(value);
        PostURL = `${PostURL}/${value}`
            //  console.log(PostURL)
        const options = { username: user, password: value }
        let client = mqtt.connect('mqtt://localhost', options);

        console.log(state)


        if (state[`${user}_topic`] === topico) {
            console.log("El tópico ya ha sido creado");

        } else {
            client.on('connect', function() {
                client.subscribe(topico, function(err) {
                    console.log(`suscrito a ${topico}`)
                    state[`${user}_topic`] = topico;
                    if (err) {
                        console.log("error en la subscripcion")
                    }
                })

            })
        }



        client.on('message', function(topic, message) {
            // message is Buffer

            json1 = JSON.parse(message.toString()); //de esta manera se convierte el mensaje recibido en un json
            console.log(json1);
            if (json1.token === value) {
                json2 = { 'value': json1.value }
                postMqttData(`${user}/${project}/${deviceN}/${variableN}/${value}`, json2)
            } else {
                console.log("Se está enviando a otro usuario el dato")
            }
        })



    });
    res.send({ "value": "success" })

});





module.exports = router;