import { Component, OnInit } from '@angular/core';
import { ApiService, VariableModel } from '../services/api.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { environment } from '../../environments/environment';
import { ShepherdService } from 'angular-shepherd';

@Component({
    selector: 'app-rest-data',
    templateUrl: '../views/restData.component.html',
    styleUrls: ['../styles/restData.component.scss']
})

export class RestDataComponent implements OnInit {
    url: string;
    Mqtt_url: string;
    values: any[] = [];
    variables: VariableModel[] = [];
    independentVariables: VariableModel[] = [];
    val: number;
    firstTime = false;
    displayEmptyVariable = false;
    msgs: Message[] = [];
    interval: any;
    currentVariable: VariableModel;
    postURL: string;
    publishURL: string;
    postBody: string = '{'+'"value": [valor numérico] }'
    publishBody: string = '{'+ '"token": "[Token de usuario]",'+'"value": [valor numérico] }'
    topic: string;
    public msg: Message[] = [];
    public textLabel:string='Tutorial';

    constructor(private apiService: ApiService, private router: Router, private shepherdService: ShepherdService) {
        this.interval = setInterval(() => {
            this.getData();
           
        }, 15000);
    }

    ngOnInit() {
        this.currentVariable = this.apiService.getCurrentVariable();
        this.getData();
     
        this.postURL = environment.restUrl + this.currentVariable.user + '/'
            + this.currentVariable.project + '/' + this.currentVariable.deviceN + '/' + this.currentVariable.variableN
            + '/' + '[Token de usuario]';
            
        this.publishURL = environment.mqttUrl;

        this.topic = this.currentVariable.user + '/'+ this.currentVariable.project + '/' + this.currentVariable.deviceN + '/' + this.currentVariable.variableN;
        if (this.router.url === '/restData') {
            this.shepherdService.cancel();
        }

       
    }


     /**
    * Método para mostrar los mensajes de alerta.
    * @param severity  Severidad del mensaje (success, info, warn, error).
    * @param title Título del mensaje.
    * @param message Contenido del mensaje.
    */
      showToast(severity, title, message) {
        this.msg = [];
        this.msg.push({ severity: severity, summary: title, detail: message });
    }

   
    copyMessage(val: string){
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.showToast('info', 'Información', 'Texto copiado en el portapapeles.');
      }

    show() {
        this.msgs.push({
            severity: 'warn',
            summary: 'Valores insuficientes:',
            detail: 'Para construir la gráfica debes enviar por lo menos dos datos a esta variable. '
        });
    }
    clear() {
        this.msgs = [];
    }

    getData() {
        this.clear();
        this.url = environment.restUrl + this.currentVariable.user + '/'
            + this.currentVariable.project + '/' + this.currentVariable.deviceN + '/'
            + this.currentVariable.deviceH + '/' + this.currentVariable.variableN + '/' + this.currentVariable.variableT;
            console.log(this.url)
        this.apiService.getValues(this.url).subscribe(resValues => {
            this.values = resValues.body;
            
            if (this.values.length < 2) {
                this.show();
            }
        });
    }
   
    
    isVariableIndependent() {
        if (this.currentVariable.variableT === 'Independiente') {
            return true;
        } else {
            return false;
        }
    }
    
    textOnHover(){
        this.textLabel = "Tutorial de datos"
    }
    textOnLeave(){
        this.textLabel = "Tutorial"
    }

}

