import { Component, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from '../services/message.service';
import { Http } from '@angular/http';
import { Chart } from 'chart.js';
import { ChartService } from '../services/chart.service';
import { Charts } from '../models/charts';
import { Message } from 'primeng/components/common/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-chart',
    templateUrl: '../views/chart.component.html',
    styleUrls: ['../styles/chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ChartComponent implements OnInit {

    @ViewChild('canvas1', { read: ElementRef }) canvas: ElementRef;
    public displayDelete = false;
    public idChartToDelete;
    public chart;
    public chartObj;
    public prueba: number;
    public charts;
    public pruebaData: string;
    public chartsData = [];
    public amountCharts;
    public projectId;
    public msg: Message[] = [];

    constructor(private chartService: ChartService,
        private cd: ChangeDetectorRef,
        private router: Router) { }

    ngOnInit() {
        const link = this.router.url;
        this.projectId = link.replace('/dashboard/', '');
        this.charts = [];
    }

    /**
     * Método para mostrar los mensajes de alerta.
     * @param severity Severidad del mensaje (success, info, warn, error).
     * @param title Título del mensaje.
     * @param message Contenido del mensaje.
     */
    showToast(severity, title, message) {
        this.msg = [];
        this.msg.push({ severity: severity, summary: title, detail: message });
    }

    /**
     * Método para actualizar el arreglo de gráficas según los cambios realizados en el dashboard.
     * @param array Arreglo con los cambios realizados en el dashboard.
     */
    setArrayChart(array) {
        this.charts = array;
        this.cd.detectChanges();
    }


    downloadChart(index) {
        document.getElementById('canvas' + index);
    }

    /**
     * Crear una gráfica.
     * @param array Arreglo con los datos necesarios para crear una gráfica.
     */
    createChart(array) {

        for (let i = 0; i < array.length; i++) {

            this.chart = new Chart('canvas' + i, {
                type: array[i].type,
                data: {
                    labels: array[i].labels,
                    datasets: array[i].datas
                },
                options: {
                    title: {
                        display: true,
                        text: array[i].title,
                        fontSize: 16
                    },
                    legend: {
                        display: true
                    },
                    scales: {
                        xAxes: [{
                            display: true
                        }],
                        yAxes: [{
                            display: true
                        }],
                    },

                    responsive: true
                }
            });

        }
    }

    showDialogDeleteChart(index) {

        this.idChartToDelete = this.charts[index].id;
        this.displayDelete = true;
    }

    /**
     * Obtener todas la gráficas del usuario.
     */
    getAllCharts() {

        this.chartService.getChartByProject(this.projectId).subscribe(data1 => {

            this.charts = [];
            const dataArray = data1.chart;

            for (const data in dataArray) {
                if (dataArray.hasOwnProperty(data)) {
                    const chartObj = new Charts(dataArray[data]._id, dataArray[data].project,
                        dataArray[data].user, dataArray[data].type, dataArray[data].datas,
                        dataArray[data].labels, dataArray[data].title);

                    this.charts.push(chartObj);
                }
            }

            this.charts.reverse();
            this.setArrayChart(this.charts);
            this.createChart(this.charts);

        }, Error => {
            this.showToast('error', 'Error', 'Error al consultar las gráficas.');
        });
    }

    /**
     * Eliminar una gráfica seleccionada.
     */
    deleteChart() {

        this.chartService.deleteChartsById(this.idChartToDelete).subscribe(data => {
            this.displayDelete = false;
            this.showToast('success', 'Eliminada', 'Gráfica eliminada exitosamente.');
            this.getAllCharts();

        }, Error => {
            this.showToast('error', 'Error', 'Error al eliminar la gráfica.');
            this.displayDelete = false;
        });
    }


}
