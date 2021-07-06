import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ShepherdService } from 'angular-shepherd';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

interface DataTour {
    value: number;
    date: Date;
}

@Component({
    selector: 'app-tour-data',
    templateUrl: '../views/tourData.component.html',
    styleUrls: ['../styles/tourData.component.scss']
})
export class TourDataComponent implements OnInit, AfterViewInit {

    chart = [];
    dataY: number[] = [];
    dataX: Date[] = [];
    values: DataTour[] = [];

    constructor(private shepherdService: ShepherdService, private router: Router) {
        this.dataY = [5, 8, 3, 15, 16];
        this.dataX = [new Date('Wed, 01 May 2019 21:23:28 GMT'),
        new Date('Wed, 01 May 2019 21:25:41 GMT'),
        new Date('Sat, 11 May 2019 20:27:54 GMT'),
        new Date('Sat, 11 May 2019 20:35:10 GMT'),
        new Date('Sat, 11 May 2019 22:00:58 GMT')];
        this.values = [{ value: 5, date: new Date('Wed, 01 May 2019 21:23:28 GMT') },
        { value: 8, date: new Date('Wed, 01 May 2019 21:25:41 GMT') },
        { value: 3, date: new Date('Sat, 11 May 2019 20:27:54 GMT') },
        { value: 15, date: new Date('Sat, 11 May 2019 20:35:10 GMT') },
        { value: 16, date: new Date('Sat, 11 May 2019 22:00:58 GMT') }];
    }

    ngOnInit() {
        this.chart = new Chart('tourData', {
            type: 'line',
            data: {
                labels: this.dataX,
                datasets: [
                    {
                        data: this.dataY,
                        borderColor: ['#0884BD'],
                        backgroundColor: ['#0884BD'],
                        borderWidth: 3,
                        fill: false,
                        label: 'Nombre de la variable'
                    },
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {
                                day: 'MMM D'
                            },
                            unit: 'day'
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
            }
        });
    }

    ngAfterViewInit() {
        this.shepherdService.defaultStepOptions = {
            classes: 'custom-class-name-1 custom-class-name-2',
            scrollTo: false,
            showCancelLink: true
        };
        this.shepherdService.disableScroll = false;
        this.shepherdService.modal = false;
        this.shepherdService.confirmCancel = false;
        this.shepherdService.addSteps([
            {
                id: 'data-0',
                options: {
                    buttons: [
                        {
                            classes: 'shepherd-button-primary',
                            text: 'Atrás',
                            type: 'back'
                        },
                        {
                            classes: 'shepherd-button-primary',
                            text: 'Adelante',
                            type: 'next'
                        }
                    ],
                    classes: 'custom-class-name-1 custom-class-name-2',
                    highlightClass: 'highlight',
                    scrollTo: false,
                    showCancelLink: true,
                    title: 'Datos',
                    text: ['Si la variable que has creado es independiente, debes enviar por lo menos dos datos ' +
                        'para que puedas visualizar sus valores, ya que la variable se graficará. Si creaste una variable dependiente, ' +
                        'debes haber enviado datos a la variable independiente después de su creación para que estos puedan ser tabulados.']
                }
            },
            {
                id: 'data-1',
                options: {
                    attachTo: '.chart bottom',
                    buttons: [
                        {
                            classes: 'shepherd-button-primary',
                            text: 'Atrás',
                            type: 'back'
                        },
                        {
                            classes: 'shepherd-button-primary',
                            text: 'Adelante',
                            type: 'next'
                        }
                    ],
                    classes: 'custom-class-name-1 custom-class-name-2',
                    highlightClass: 'highlight',
                    scrollTo: false,
                    showCancelLink: true,
                    title: 'Gráfica',
                    text: ['En esta sección podrás visualizar los datos que has enviado a la variable seleccionada. ' +
                        'El eje x corresponde a la fecha en la cual enviaste tus datos a UAOIoT, ' +
                        'si necesitas ver en más detalle la fecha en la que lo hiciste, ' +
                        'puedes pasar por encima de cada punto para visualizarlo.'],
                }
            },
            {
                id: 'data-1a',
                options: {
                    attachTo: '.ui-button bottom',
                    buttons: [
                        {
                            classes: 'shepherd-button-primary',
                            text: 'Atrás',
                            type: 'back'
                        },
                        {
                            classes: 'shepherd-button-primary',
                            text: 'Adelante',
                            type: 'next'
                        }
                    ],
                    classes: 'custom-class-name-1 custom-class-name-2',
                    highlightClass: 'highlight',
                    scrollTo: false,
                    showCancelLink: true,
                    title: 'Ajustes',
                    text: ['Al hacer clic en este botón podrás cambiar la configuración de visualización' +
                        ' de las gráficas (Escala temporal y tipo de gráfica)'],
                }
            },
            {
                id: 'data-2',
                options: {
                    attachTo: '.table bottom',
                    buttons: [
                        {
                            classes: 'shepherd-button-primary',
                            text: 'Atrás',
                            type: 'back'
                        },
                        {
                            classes: 'shepherd-button-primary',
                            text: 'Adelante',
                            type: 'next'
                        }
                    ],
                    classes: 'custom-class-name-1 custom-class-name-2',
                    highlightClass: 'highlight',
                    scrollTo: false,
                    showCancelLink: true,
                    title: 'Tabla',
                    text: ['En esta sección podrás visualizar los datos que has enviado a la variable seleccionada con mayor detalle. ' +
                        'Además de los datos presentes en la gráfica, ' +
                        'se agrega un índice para que sepas más fácilmente cuántos datos has enviado.'],
                }
            }
        ]);
        if (this.router.url === '/tourData') {
            this.shepherdService.start();
        } else {
            this.shepherdService.cancel();
        }
    }
}
