const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const cors=require("cors");
const app = express();

//connecting DB

mongoose
    .connect("mongodb://localhost/server", { useNewUrlParser: true })
    .then(db => console.log("DB connected"))
    .catch(err => console.log(err));

//importing routes

const apiProjects = require("./apiGateway/apiProjects");
const apiDevices = require("./apiGateway/apiDevices");
const apiVariables = require("./apiGateway/apiVariables");
const apiValues = require("./apiGateway/apiValues");
const apiTopics = require("./apiGateway/apiTopics")
//const apiClientBroker = require("./app-mqtt")

const projects = require("./routes/routeProjects");
const devices = require("./routes/routeDevices");
const variables = require("./routes/routeVariables");
const values = require("./routes/routeValues");
const topics = require("./routes/routeTopics");
//const api = require("../../users/routes/user");
//const client_broker = require("./client-broker")

/*const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }*/

//settings
app.set("port", process.env.PORT1 || 8000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-API-KEY,Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Alllow", "GET, POST, OPTIONS, PUT, DELETE");

    next();
});

//routes

app.use("/projects", projects);
app.use("/devices", devices);
app.use("/variables", variables);
app.use("/values", values);
app.use("/topics", topics);

app.use("/apiProjects", apiProjects);
app.use("/apiDevices", apiDevices);
app.use("/apiVariables", apiVariables);
app.use("/", apiValues);
app.use("/apiTopics",apiTopics);
//app.use("/apiBroker", apiClientBroker, client_broker);
app.use(require('../../users/index'))
//app.use(cors(corsOptions)) // Use this after the variable declaration

//starting the server
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}...`);
});