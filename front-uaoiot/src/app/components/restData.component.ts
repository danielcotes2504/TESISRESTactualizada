import { Component, OnInit } from '@angular/core';
import { ApiService, VariableModel } from '../services/api.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-rest-data',
    templateUrl: '../views/restData.component.html',
    styleUrls: ['../styles/restData.component.scss']
})
export class RestDataComponent implements OnInit {
    url: string;
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

    constructor(private apiService: ApiService, private router: Router) {
        this.interval = setInterval(() => {
            this.getData();
        }, 60000);
    }

    ngOnInit() {
        this.currentVariable = this.apiService.getCurrentVariable();
        this.getData();
        this.postURL = environment.restUrl + this.currentVariable.user + '/'
            + this.currentVariable.project + '/' + this.currentVariable.deviceN + '/' + this.currentVariable.variableN
            + '/' + 'token_de_usuario';
    }

    show() {
        this.msgs.push({
            severity: 'info',
            summary: 'Valores insuficientes',
            detail: 'Para construir la gráfica debes enviar por lo menos dos datos a esta variable'
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

}

