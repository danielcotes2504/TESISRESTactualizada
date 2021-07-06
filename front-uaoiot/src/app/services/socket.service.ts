import { Injectable } from '@angular/core';
import { Messagemqtt } from '../models/message';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable()

export class SocketService {

    private socket;

    private listMessage = [];

    constructor() { }

    initSocket() {
        this.listMessage = [];

        if (!this.socket) {
            this.socket = io(environment.baseUrlSocket);
        }
    }

    closeConnection() {
        this.socket.disconnect();
    }

    onNewMessageListen() {
        const list = [];
        this.socket.on('reciveMessage', function (data) {
            list.push(data.payload);
        });
    }

    onConnectionMessage(): Observable<boolean> {
        return Observable.create(observer => {
            this.socket.on('connectionMessage', msg => {
                observer.next(msg);
            });
        });
    }


    onNewMessage(): Observable<Messagemqtt> {
        return Observable.create(observer => {
            this.socket.on('reciveMessage', msg => {
                observer.next(msg);
            });
        });
    }

    //
    sendDataMqtt(userName: String, topic: String, password: String) {
        this.socket.emit('sendData', { user: userName, topic: topic, password: password });
    }

    sendDisconnect() {
        this.socket.emit('disconnectmsg', { payload: '' });
    }

    // EMITTER
    sendMessage(msg: string, userName: String) {
        this.socket.emit('sendMessage', { payload: msg, topic: 'unicast_' + userName });
    }
}
