import { Component, OnInit } from '@angular/core';
import { ApiService, ValueModel, VariableModel } from '../services/api.service';
import { environment } from '../../environments/environment';

interface TableModel {
    index: number;
    value: number;
    date: any;

  
   
   
}

@Component({
    selector: 'app-rest-table',
    templateUrl: '../views/restTable.component.html',
    styleUrls: ['../styles/restTable.component.scss']
})
export class RestTableComponent implements OnInit {
    prueba: ValueModel;
    values: ValueModel[];
    independentValues: ValueModel[];
    currentVariable: VariableModel;
    url: string;
    index: number[] = [];
    date: any[] =[];
    interval: any;

    constructor(private apiService: ApiService) {
        this.currentVariable = this.apiService.getCurrentVariable();
    }

    ngOnInit() {
        this.getData();
       
                this.interval = setInterval(() => {
            this.getData();
        }, 60000);
    }

    getData() {
        this.url = environment.restUrl + this.currentVariable.user + '/'
            + this.currentVariable.project + '/' + this.currentVariable.deviceN + '/'
            + this.currentVariable.deviceH + '/' + this.currentVariable.variableN + '/' + this.currentVariable.variableT;

        this.apiService.getValues(this.url).subscribe(resValues => {
            this.values = resValues.body;
          for (let i = 0; i < this.values.length; i++) {
                this.index[i] = i + 1;
                const date=this.values[i].date;
                const fecha = new Date(date).toLocaleDateString('es-CO');
                const hora = new Date(date).toLocaleTimeString('en-US');
                           this.date[i]= fecha + " "+ hora;
               
                
            }

          

        });
    }

    
}

