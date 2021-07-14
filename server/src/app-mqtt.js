let mqtt = require('mqtt');


const express = require("express");
const router = express.Router();
require("./requestMethods/get.js")();

/* GET TOKEN */
const getToken = async(string) => {
    const url = `http://localhost:3000/api/tokenuser/${string}`
    const data = await requestData(url)
    const token = data;
    //console.log(token)
    return token;
}

const options = () => {
    const userToken = router.post("/apiValuesMQTT", (req, res) => {

        const { user } = req.body;
        const token = getToken(user).then(meta => {
            const { value } = meta.token[0];

            const options = {
                username: user,
                password: value
            }
            return token
        });
        return userToken;
        res.send({ state: "success" });

    });
}
console.log(options)

let client = mqtt.connect('mqtt://localhost');


client.on('connect', function() {


    router.post("/apiValuesMQTT", (req, res) => {

        const { user } = req.body;
        const { project } = req.body;
        const { deviceN } = req.body;
        const { variableN } = req.body;

        let PostURL = `/${user}/${project}/${deviceN}/${variableN}`;
        let topico = `${project}/${deviceN}/${variableN}`;
        /*     const token = getToken(user).then(meta => {
                const { value } = meta.token[0];
                PostURL = `${PostURL}/${value}`
                 //  console.log(PostURL)
                    }); */
        client.subscribe(topico, function(err) {
            // console.log(`suscrito a ${topico}`)
            if (err) {
                console.log("error en la subscripcion")
            }
        })


        //  res.send({ state: "success" });

    });
})

client.on('message', function(topic, message) {
    // message is Buffer
    json1 = JSON.parse(message.toString()); //de esta manera se convierte el mensaje recibido en un json
    console.log(json1);



})

module.exports = router;