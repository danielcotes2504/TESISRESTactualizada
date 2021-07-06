'use strict'

var express = require('express');
var app = express();
var path = require("path");
var cors = require('cors');
var bodyParser = require('body-parser');
var passport = require('passport');

require('./models/db');
require('./config/passport');

//Routes
var routesApi = require("./index")
var apiUser = require('./routes/user');
var apiMessage = require('./routes/message');
var apiAcls = require('./routes/acls');
var apiUserLogin = require('./routes/userLogin');
var device = require('./routes/device');
var apiDashboard = require('./routes/dashboard');
var apiChart = require('./routes/chart');
var apiProject = require('./routes/project');
var apiToken = require('./routes/token');
var apiTable = require('./routes/table');
var apiLibrary = require('./routes/library');
var apiFile = require('./routes/file');

//MQTT
var mqtt = require('mqtt');
var optionsMqtt = {};
/*var optionsMqtt = {
    port: 1883,
    host: 'mqtt://192.168.0.11',
    username: 'user1',
    password: '123456',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};*/

var io = require('socket.io').listen(5000);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY,Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Alllow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

var user = '';
var topic = '';
var password = '';
var client;

//MQTT CONNECT
optionsMqtt = {
    port: 1883,
    host: 'mqtt://inteocav.uao.edu.co',
    username: 'user1',
    password: '123456',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};


if(!client){
    client = mqtt.connect('mqtt://inteocav.uao.edu.co',optionsMqtt);
    //console.log('2 Connect to ' + topic);
}

/**
 * Socket events
 */
io.sockets.on('connection', function(socket){
    //io.sockets.removeAllListeners();
    console.log('1 Socket connected');
    
    socket.on('sendData', function(data){

        //socket.removeAllListeners('sendData');
        io.removeAllListeners();
        user = data.user;
        topic = data.topic;
        password = data.password;

        /*optionsMqtt = {
            port: 1883,
            host: 'mqtt://192.168.0.23',
            username: user,
            password: password,
            keepalive: 60,
            reconnectPeriod: 1000,
            protocolId: 'MQIsdp',
            protocolVersion: 3,
            clean: true,
            encoding: 'utf8'
        };
        

        if(!client){
            client = mqtt.connect('mqtt://192.168.0.23',optionsMqtt);
            //console.log('2 Connect to ' + topic);
        }*/

        if(client.connected){
            console.log('connected')
            client.subscribe(topic, (err,granted)=>{

                if(!err){
                    console.log('2 Subscribing to ' + topic);
                }else{
                    console.log("Error conexion mqtt");
                }
                //ENVIAR MENSAJE ENVIADO POR EL DISPOSITIVO A ANGULAR DEL MISMO TOPICO 
            });
        }
        
        client.on('connect', function() {
            console.log('I am connected!');
            //SUBSCRIBIRSE AL BROKER DESPUES DE CONECTARSE AL SOCKET
            client.subscribe(topic, (err,granted)=>{

                if(!err){
                    console.log('2 Subscribing to ' + topic);
                }else{
                    console.log("Error conexion mqtt");
                }
                //ENVIAR MENSAJE ENVIADO POR EL DISPOSITIVO A ANGULAR DEL MISMO TOPICO 
            });
        });

        client.on('reconnect', function() {
            console.log('RESCONNECT MQTT ');
        });

        client.on('error', function(err) {
            console.log('ERROR MQTT ' + err);
            client.end();
        });

        client.on('offline', function() {
            console.log('OFFLINE MQTT ');

            io.sockets.emit('connectionMessage',{message:Boolean(false)});
            client.end();
        });

        client.on('close', function() {
            console.log('CLOSE MQTT ');
        });

        client.on('message',function(topic,payload,packet){
            packet.dup = true;
            packet.retain =  true;

            if(packet.cmd === 'publish'){
                console.log('payload from phone: ' + payload + " - " + packet.retain);

                io.sockets.emit('reciveMessage',{'topic':String(topic),
                                'payload':String(payload)});
            }
            
            //console.log("Listen: " + )
            //console.log("EMITE RECIVEMESSAGE TO ANGULAR");
            //io.sockets.emit('reciveMessage',{msg: payload});
        });

        //MENSAJE ENVIADO DESDE ANGULAR
        socket.on('sendMessage', function (data) {

            this.topic = data.topic;
        
            //SE PUBLICA EL MENSAJE RECIBIDO DE ANGULAR AL BROKER
            client.publish(data.topic,data.payload,function(){
                console.log("3 MESSAGE from client : " + data.payload + " - " + data.topic);
                
            });
            
        });

    });

    socket.on('disconnectmsg',function(data){
        //socket.removeAllListeners();
        console.log("DISCONNECT btn");
        client.unsubscribe(topic, ()=>{
            //io.removeAllListeners();
            //io.sockets.removeAllListeners();
            //socket.removeAllListeners();
            console.log("unsubscribe");
        });
        //client.end();
        //client.close();
        //socket.disconnect();
        /*socket.removeAllListeners('message');
        socket.removeAllListeners('reciveMessage');
        socket.removeAllListeners('disconnect');
        io.removeAllListeners('connection');*/
    });

    socket.on('disconnect', () => {
        //io.removeAllListeners();
    });
    
});

app.use('/api', apiUser);
app.use('/api', apiMessage);
app.use('/api', apiAcls);
app.use('/api', apiUserLogin);
app.use('/api', device);
app.use('/api', apiDashboard);
app.use('/api', apiChart);
app.use('/api', apiProject);
app.use('/api', apiToken);
app.use('/api', apiTable);
app.use('/api', apiLibrary);
app.use('/api', apiFile);

module.exports = app;
