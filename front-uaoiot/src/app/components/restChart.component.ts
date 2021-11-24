import { Component, OnInit } from '@angular/core';
import { ApiService, ValueModel, VariableModel } from '../services/api.service';
import { environment } from '../../environments/environment';


interface ChartTypes {
    type: string;
    typeName: string;
}

interface TimeScale {
    timeUnit: string;
    timeScaleName: string;
}


@Component({
    selector: 'app-rest-chart',
    templateUrl: '../views/restChart.component.html',
    styleUrls: ['../styles/restChart.component.scss']
})

export class RestChartComponent implements OnInit {

    chart: any;
    values: ValueModel[];
    currentVariable: VariableModel;
    url: string;
    dataY: number[] = [];
    dataX: Date[] = [];
    fecha: Date[]=[];
    data: any;
    options: any;
    interval: any;
    displaySettings = false;
    chartTypes: ChartTypes[] = [];
    timeOptions: TimeScale[] = [];
    selectedChartType = 'line';
    selectedTimeScale = 'minute';

    constructor(private apiService: ApiService) {
        this.currentVariable = this.apiService.getCurrentVariable();

        this.chartTypes = [{ type: 'line', typeName: 'Líneas' }, { type: 'bar', typeName: 'Barras' },
        { type: 'bubble', typeName: 'Burbújas' }];

        this.timeOptions = [{ timeUnit: 'minute', timeScaleName: 'Minutos' },
        { timeUnit: 'hour', timeScaleName: 'Horas' }, { timeUnit: 'day', timeScaleName: 'Días' }];

        this.interval = setInterval(() => {
            this.getData();
        }, 15000);
    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.url = environment.restUrl + this.currentVariable.user + '/'
            + this.currentVariable.project + '/' + this.currentVariable.deviceN + '/'
            + this.currentVariable.deviceH + '/' + this.currentVariable.variableN + '/' + this.currentVariable.variableT;

        if (this.apiService.getCurrentChartType() === null || this.apiService.getCurrentTimeScale === null) {
            this.selectedChartType = 'line';
            this.selectedTimeScale = 'minute';
        } else {
            this.selectedChartType = this.apiService.getCurrentChartType();
            this.selectedTimeScale = this.apiService.getCurrentTimeScale();
        }

        this.apiService.getValues(this.url).subscribe(resValues => {
            this.values = resValues.body;
            for (let i = 0; i < this.values.length; i++) {
                this.dataX[i] = this.values[i].date
               this.fecha[i]= new Date(this.dataX[i]);
                this.dataY[i] = this.values[i].value;
            }
            this.chart = {
                labels: this.fecha,
                datasets: [
                    {
                        data: this.dataY,
                        borderColor: '#0884BD',
                        backgroundColor: '#0884BD',
                        borderWidth: 3,
                        fill: false,
                        label: this.currentVariable.variableN
                    },
                ]
            };
            this.options = {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {
                                minute: 'h:mm a'
                            },
                            unit: this.selectedTimeScale
                        },
                        distribution: 'linear',
                        ticks: {
                            source: 'auto'
                        },
                        bounds: 'ticks',
                        display: true
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            };
        });
    }

    setChartType(type: string) {
        this.apiService.setCurrentChartType(type);
        this.selectedChartType = type;
    }

    setTimeScale(timescale: string) {
        this.apiService.setCurrentTimeScale(timescale);
    }

    confirmSettings(event: Event) {
        this.getData();
        this.displaySettings = false;

    }
}
