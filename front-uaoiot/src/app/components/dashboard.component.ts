import {
    Component, ComponentFactoryResolver, ViewChild,
    ElementRef, ViewContainerRef, ChangeDetectorRef, OnDestroy, OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
//  import { MessageService } from '../services/message.service'
import { SocketService } from '../services/socket.service';
// import { Message } from '../models/message';
import { Http } from '@angular/http';
import { ChartComponent } from './chart.component';
import { timeout } from 'rxjs/operators';
import { SubNavbarComponent } from './subNavbar.component';
import { DashboardService } from '../services/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartService } from '../services/chart.service';
import { Charts } from '../models/charts';
import { Tables } from '../models/table';
import { DeviceService } from '../services/device.service';
import { Device } from '../models/device';
import { TokenService } from '../services/token.service';
import { TableService } from '../services/table.service';
import { TableComponent } from './table.component';
import { MenuItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { Messagemqtt } from '../models/message';

@Component({
    selector: 'app-dashboard',
    templateUrl: '../views/dashboard.component.html',
    styleUrls: ['../styles/dashboard.component.scss'],
    providers: [MessageService]
})

export class DashboardComponent implements OnInit, OnDestroy {

    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
    @ViewChild(ChartComponent) child;
    @ViewChild(TableComponent) childTable;
    @ViewChild('charts', { read: ElementRef }) canvas: ElementRef;

    public components = [];
    public chart = ChartComponent;
    public amountData;
    public messageObj: Message;
    public messages;
    public message;
    public post;
    public loaderChart;
    public alive: boolean;
    public listenChecked = true;
    public messageToSend = '';
    public paramsToChart;
    public labelsToChart = [];
    public cols: any[];
    public lastData;
    public dataChart: String;
    public dataToChart;
    public datesToChart = [];
    public userName: String;
    public projectName: String;
    public userToken: String;
    public projectId: String;
    public chartsArray = [];
    public chartsInput = [Charts];
    public displayChart = false;
    public charts = [];
    public numberOfChart: any;
    public typeDataChart;
    public titleDataChart;
    public titleDialog: String;
    public stepItems: MenuItem[];
    public activeIndexChart = 0;
    public colors = ['#1976D2', '#c42727', '#bda235', '#50bd35'];
    public devicesArray = [];
    public filteredDevicesArray = [];
    public nameDevice;
    public deviceVariables = [];
    public multivariables = false;
    public displayTable = false;
    public tablesArray = [];
    public userToSendMsg = '';
    public deviceToSendMsg = '';
    public msg: Message[] = [];
    public indexAccordion = -1;
    public titleDialogTable: String;
    public stepItemsTable: MenuItem[];
    public activeIndexTable = 0;
    public paramsToTable;

    constructor(private _http: Http,
        private messageService: MessageService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private socketService: SocketService,
        private chartService: ChartService,
        private tableService: TableService,
        private deviceService: DeviceService,
        private tokenService: TokenService,
        private router: Router,
        private cd: ChangeDetectorRef) {

        this.messages = [];
        this.alive = true;

    }

    ngOnInit() {

        this.nameDevice = '';
        this.amountData = '';
        const link = this.router.url;
        this.projectId = link.replace('/dashboard/', '');
        this.getCharts();
        this.getTables();
        this.getDevices();
        this.filterDevice({});

        this.cols = [
            { field: 'payload', header: 'Mensaje' },
            { field: 'date', header: 'Hora' }
        ];

        this.paramsToChart = {
            type: '',
            title: '',
            amount: '',
            colors: this.colors,
            label: this.deviceVariables
        };

        this.paramsToTable = {
            title: '',
            amount: ''
        };

        this.projectName = '';
        if (localStorage.getItem('user') != null) {
            const userProfile = JSON.parse(localStorage.getItem('user'));
            this.userName = userProfile.user;
        } else {
            this.userName = '';
        }

        this.getToken();
        this.dataToChart = [];
        this.setChartDialog();
        this.setTableDialog();
    }

    ngOnDestroy() { }

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

    setTableDialog() {
        this.titleDialogTable = 'Agrega un título a la tabla';
        this.activeIndexTable = 0;
        this.stepItemsTable = [
            {
                label: 'Título',
                command: (event: any) => {
                    this.activeIndexTable = 0;
                    this.titleDialogTable = 'Agrega un título a la tabla';
                }
            },
            {
                label: 'Valores',
                command: (event: any) => {
                    this.activeIndexTable = 1;
                    this.titleDialogTable = 'Seleccionar valores a tabular';
                }
            },
            {
                label: 'Terminar',
                command: (event: any) => {
                    this.displayTable = false;
                    // this.addTable(this.paramsToTable);
                    this.paramsToTable = {
                        title: '',
                        amount: ''
                    };
                    this.activeIndexTable = 0;
                }
            }
        ];
    }

    /**
     * Mostrar el paso a paso para crear una gráfica.
     */
    setChartDialog() {
        this.titleDialog = 'Selecciona un tipo de gráfica';
        this.activeIndexChart = 0;
        this.stepItems = [
            {
                label: 'Tipo de gráfica',
                command: (event: any) => {

                    this.activeIndexChart = 0;
                    this.titleDialog = 'Selecciona un tipo de gráfica';
                    // alert('Item 1');
                }
            },

            {
                label: 'Título',
                command: (event: any) => {


                    if (this.paramsToChart.type === '') {
                        this.showToast('warn', 'Datos incompletos', 'Debes completar todos los datos de la gráfica.');
                        this.activeIndexChart = 0;
                    } else {
                        this.activeIndexChart = 1;
                        this.titleDialog = 'Agrega un título para la gráfica';

                    }
                    // this.activeIndexChart = 1;
                    // this.titleDialog = 'Agrega un título para la gráfica';
                    // alert('Item 2');
                }
            },

            {
                label: 'Variables',
                command: (event: any) => {

                    if (this.paramsToChart.title === '') {
                        this.showToast('warn', 'Datos incompletos', 'Debes completar todos los datos de la gráfica.');
                        this.activeIndexChart = 1;
                    } else {
                        this.activeIndexChart = 2;
                        this.titleDialog = 'Selecciona los colores de las variables';
                    }
                    // this.activeIndexChart = 2;
                    // this.titleDialog = 'Selecciona los colores de las variables';

                }
            },

            {
                label: 'Datos',
                command: (event: any) => {
                    this.activeIndexChart = 3;
                    this.titleDialog = 'Seleccionar datos a graficar';

                }
            },

            {
                label: 'Terminar',
                command: (event: any) => {

                    if (this.paramsToChart.amount === '') {
                        this.showToast('warn', 'Datos incompletos', 'Debes completar todos los datos de la gráfica.');
                        this.activeIndexChart = 3;
                    } else {
                        this.displayChart = false;
                        // this.sendData();
                        this.addChart(this.paramsToChart);
                        this.paramsToChart = {
                            type: '',
                            title: '',
                            amount: '',
                            colors: this.colors,
                            label: this.deviceVariables
                        };
                        this.activeIndexChart = 0;
                    }

                }
            }
        ];
    }

    /**
     * Mostrar el cuadro de diálogo para configurar una tabla.
     */
    showDialogConfigTable() {

        if (this.dataToChart.length === 0) {
            this.showToast('warn', 'Sin datos', 'No hay datos para tabular.');
        } else {
            this.displayTable = true;
        }

    }

    /**
     * Mostrar el cuadro de diálogo con el paso a paso para crear una gráfica.
     */
    showDialogTypeChart() {

        if (this.dataToChart.length === 0) {
            this.showToast('warn', 'Sin datos', 'No hay datos para graficar.');
        } else {
            this.displayChart = true;
        }

    }

    /**
     * Enviar datos para conexión mqtt del usuario.
     * @param user Usuario que se utiliza para la conexión mqtt.
     * @param topic Topico para suscribirse al broker.
     * @param token Token (Password) para la conexión.
     */
    sendUserDataMqtt(user, topic, token) {

        this.socketService.sendDataMqtt(user, topic, token);
        // alert(user + ' - ' + topic + ' - ' + token);
    }

    /**
     * Obtener el token del usuario.
     */
    getToken() {
        this.tokenService.getTokenByUser(this.userName).subscribe(data => {
            const resData = data.token[0];
            this.userToken = resData.value;
        }, Error => {
            this.showToast('error', 'Error', Error);
        });
    }

    /**
     * Obtener las gráficas del proyecto actual.
     */
    getCharts() {
        this.chartService.getChartByProject(this.projectId).subscribe(data1 => {

            this.chartsArray = [];
            const dataArray = data1.chart;
            this.numberOfChart = dataArray.length;

            for (const data in dataArray) {
                if (dataArray.hasOwnProperty(data)) {
                    const chartObj = new Charts(dataArray[data]._id, dataArray[data].project,
                        dataArray[data].user, dataArray[data].type, dataArray[data].datas,
                        dataArray[data].labels, dataArray[data].title);
                    this.chartsArray.push(chartObj);
                }
            }

            this.chartsArray.reverse();
            this.child.setArrayChart(this.chartsArray);
            this.child.createChart(this.chartsArray);

        }, Error => {
            this.showToast('error', 'Error', Error);
        });
    }

    /**
     * Obtener tablas del proyecto actual.
     */
    getTables() {
        this.tableService.getTableByProject(this.projectId).subscribe(data1 => {
            this.tablesArray = [];
            const dataArray = data1.table;

            for (const data in dataArray) {
                if (dataArray.hasOwnProperty(data)) {
                    const tableObj = new Tables(dataArray[data]._id, dataArray[data].project,
                        dataArray[data].user, dataArray[data].datas, dataArray[data].dates,
                        dataArray[data].title);
                    this.tablesArray.push(tableObj);
                }
            }

            this.tablesArray.reverse();
            this.childTable.setArrayTable(this.tablesArray);
            this.childTable.createTable(this.tablesArray);
        }, Error => {
            this.showToast('error', 'Error', Error);
        });
    }

    /**
     * Obtener los dispoitivos asociados a este proyecto.
     */
    getDevices() {
        this.deviceService.getDeviceByProject(this.projectId).subscribe(data1 => {

            this.devicesArray = [];
            const dataArray = data1.device;

            for (const data in dataArray) {
                if (dataArray.hasOwnProperty(data)) {
                    const deviceObj = new Device(dataArray[data]._id, dataArray[data].name,
                        dataArray[data].user, dataArray[data].project, dataArray[data].projectId, dataArray[data].variables);

                    this.devicesArray.push(deviceObj);
                }
            }

        }, Error => {
            this.showToast('error', 'Error', Error);
        });
    }

    /**
     * Filtrar dispositivos según sus nombres.
     * @param event
     */
    filterDevice(event) {
        this.filteredDevicesArray = [];

        for (let i = 0; i < this.devicesArray.length; i++) {
            const device = this.devicesArray[i].name;
            const deviceText = event.query ? event.query.toLowerCase() : '';

            if (deviceText === '' || device.toLowerCase().indexOf(deviceText) === 0) {
                this.filteredDevicesArray.push(device);
            }
        }
    }

    /**
     * Obtener el tipo de gráfica configurado en el paso a paso.
     * @param $event;
     */
    getTypeChart($event) {
        const data = $event;
        // alert(data.type);
        this.addChart(data);
    }

    /**
     * Crear una gráfica con los parámetros del paso a paso.
     * @param data Parámetros para coonfigurar la gráfica.
     */
    addChart(data) {

        if (this.dataToChart.length === 0) {
            this.showToast('warn', 'No hay datos', 'No hay datos para graficar');
        } else {

            const variables = this.getDeviceVariables(this.nameDevice);
            if (data.amount === 'allData') {
                const datasets = [];
                let attr = {};
                if (this.multivariables) {
                    const dataPayload = [];
                    const dataset = [];
                    let tempArray = [];
                    let i = 0;
                    let j = 0;

                    for (let k = 0; k < this.dataToChart.length; k++) {
                        dataPayload.push(this.dataToChart[k].payload);
                    }

                    for (j = 0; j < dataPayload.length; j++) {
                        tempArray.push(dataPayload[j][i]);
                        if (tempArray.length === 1 && j === 1 && i === 1) {
                            tempArray.splice(0, 0, dataPayload[0][i]);
                        }

                        if (tempArray.length === dataPayload.length) {
                            j = 0;
                            i++;
                            dataset.push(tempArray);
                            tempArray = [];
                        }

                    }


                    for (let w = 0; i < dataset.length; w++) {
                        attr = {
                            label: variables[w],
                            backgroundColor: data.colors[w],
                            data: dataset[w],
                            borderColor: data.colors[w],
                            fill: false
                        };
                        datasets.push(attr);
                    }

                } else {
                    const dataset = [];
                    for (let i = 0; i < this.dataToChart.length; i++) {
                        dataset.push(this.dataToChart[i].payload);
                    }
                    attr = {
                        label: variables[0],
                        backgroundColor: data.colors[0],
                        data: dataset,
                        borderColor: data.colors[0],
                        fill: false
                    };
                    datasets.push(attr);
                }

                const chartJson = {
                    project: this.projectId,
                    user: this.userName,
                    type: data.type,
                    datas: datasets,
                    labels: this.datesToChart,
                    title: data.title
                };

                this.chartService.postChart(chartJson).subscribe(data2 => {
                    this.showToast('success', 'Gráfica creada', 'Gráfica creada exitosamente.');
                    this.getCharts();
                    this.cd.markForCheck();
                    this.indexAccordion = 0;
                }, Error => {
                    this.showToast('error', 'Error', 'Error al crear la gráfica');
                });

            } else {
                const dataset = [];
                let attr = {};
                attr = {
                    label: variables[0],
                    backgroundColor: data.colors[0],
                    data: this.dataToChart[this.dataToChart.length - 1].payload,
                    borderColor: data.colors[0],
                    fill: false
                };
                dataset.push(attr);
                const chartJson = {
                    project: this.projectId,
                    user: this.userName,
                    type: data.type,
                    datas: dataset,
                    labels: this.datesToChart,
                    title: data.title
                };

                this.chartService.postChart(chartJson).subscribe(data1 => {
                    this.showToast('success', 'Gráfica creada', 'Gráfica creada exitosamente.');
                    this.getCharts();
                    this.cd.markForCheck();
                }, Error => {
                    this.showToast('error', 'Error', 'Error al crear la gráfica');
                });
            }

        }

    }

    /**
     * Crear una tabla.
     */
    addTable() {

        if (this.dataToChart.length === 0) {
            this.showToast('warn', 'No hay datos', 'No hay datos para tabular.');
        } else {
            const variables = this.getDeviceVariables(this.nameDevice);
            if (this.dataToChart.amount === 'allData') {
                const dataset = [];
                for (let i = 0; i < this.dataToChart.length; i++) {
                    dataset.push(this.dataToChart[i].payload);
                }
                const tableJson = {
                    project: this.projectId,
                    user: this.userName,
                    datas: dataset,
                    dates: this.datesToChart,
                    title: this.dataToChart.title
                };

                this.tableService.postTable(tableJson).subscribe(data => {
                    this.showToast('success', 'Tabla creada', 'Tabla creada exitosamente.');
                    this.getTables();
                    this.cd.markForCheck();
                    this.displayTable = false;
                    this.indexAccordion = 1;
                }, Error => {
                    this.showToast('error', 'Error', 'Error al crear la tabla.');
                });
            } else {
                const dataset = [];
                for (let i = 0; i < this.dataToChart.length; i++) {
                    dataset.push(this.dataToChart[i].payload);
                }
                const tableJson = {
                    project: this.projectId,
                    user: this.userName,
                    datas: this.dataToChart[this.dataToChart.length - 1].payload,
                    dates: this.datesToChart,
                    title: this.dataToChart.title
                };
                this.tableService.postTable(tableJson).subscribe(data => {
                    this.showToast('success', 'Tabla creada', 'Tabla creada exitosamente.');
                    this.getTables();
                    this.cd.markForCheck();
                    this.displayTable = false;
                }, Error => {
                    this.showToast('error', 'Error', 'Error al crear la gráfica');
                });
            }
        }
    }

    /**
     * Obtener variables de un dispoitivo.
     * @param nameDevice Nombre del sispositivo.
     */
    getDeviceVariables(nameDevice: String) {
        for (let i = 0; i < this.devicesArray.length; i++) {
            if (nameDevice === this.devicesArray[i].name) {
                this.deviceVariables = this.devicesArray[i].variables;
            }
        }
        return this.deviceVariables;
    }

    /**
     * Obtener fecha actual.
     */
    getCurrentDate(): string {
        const dateObj = new Date();
        const dateStr = dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
        return dateStr;
    }

    clearData() {
        this.dataToChart = [];
    }

    /**
     * Escuchar un dispositivo y configurar los datos recibidos.
     */
    listenDevice() {

        this.getDeviceVariables(this.nameDevice);
        if (!this.listenChecked) {
            if (this.userName === '' || this.nameDevice === '' || this.userToken === '') {
                this.listenChecked = true;
                this.showToast('warn', 'No es posible la conexión.', 'Faltan datos por ingesar.');
            } else {
                // Para pruebas rapidas de las graficas.
                /*this.dataToChart.push(new Messagemqtt('4',this.getCurrentDate()),
                new Messagemqtt('7',this.getCurrentDate()),new Messagemqtt('2',this.getCurrentDate()),
                new Messagemqtt('10',this.getCurrentDate()));

                this.datesToChart.push(this.getCurrentDate());
                this.datesToChart.push(this.getCurrentDate());
                this.datesToChart.push(this.getCurrentDate());
                this.datesToChart.push(this.getCurrentDate());*/
                // FIN
                this.socketService.initSocket();
                this.showToast('success', 'Conexión exitosa', 'Escuchando dispositivo: ' + this.nameDevice);
                this.sendUserDataMqtt(this.userName, 'broadcast_' + this.userName, this.userToken);
                this.socketService.onNewMessage().subscribe(data => {
                    if (this.dataToChart.length < this.amountData || this.amountData === '') {
                        const msgObj = new Messagemqtt(data.payload, this.getCurrentDate());
                        const variables = this.getDeviceVariables(this.nameDevice);
                        const dataToShow = [];
                        if (data.payload.indexOf('[') > -1) {

                            if (variables.length > 1) {
                                this.multivariables = true;
                            } else {
                                this.multivariables = false;
                            }

                            const dataToArray = JSON.parse(data.payload);
                            for (let i = 0; i < variables.length; i++) {
                                dataToShow.push(dataToArray[i]);
                            }
                            this.dataToChart.push(new Messagemqtt(dataToShow, this.getCurrentDate()));
                            this.datesToChart.push(this.getCurrentDate());
                        } else if (data.payload.indexOf(';') > -1) {

                            if (variables.length > 1) {
                                this.multivariables = true;
                            } else {
                                this.multivariables = false;
                            }

                            const str = data.payload;
                            let strReplaced = '';
                            let strReplaced2 = '';
                            let strReplacedFinal = '';
                            strReplaced = str.replace(';', '[');
                            strReplaced2 = strReplaced.replace(/.$/, ']');
                            strReplacedFinal = strReplaced2.replace(/;/g, ',');
                            const dataToArray = JSON.parse(strReplacedFinal);

                            for (let i = 0; i < variables.length; i++) {
                                dataToShow.push(dataToArray[i]);
                            }

                            this.dataToChart.push(new Messagemqtt(dataToShow, this.getCurrentDate()));
                            this.datesToChart.push(this.getCurrentDate());
                        } else {
                            this.multivariables = false;
                            this.dataToChart.push(msgObj);
                            this.datesToChart.push(msgObj.date);
                            this.lastData = this.dataToChart[this.dataToChart.length - 1];
                        }
                    } else {
                        this.showToast('info', 'Mensajes', 'Límite de mensajes alcanzado.');
                    }
                });
            }

        } else {

            this.socketService.sendDisconnect();
            this.showToast('info', 'Desconectado', 'Desconectado de: ' + this.nameDevice);
            this.listenChecked = true;
            this.nameDevice = '';
            this.amountData = '';
        }

    }

    /**
     * Enviar un mensaje a un dispositivo.
     */
    sendMsg() {

        if (this.userToSendMsg === '' || this.deviceToSendMsg === '' || this.messageToSend === '') {
            this.showToast('warn', 'Datos incompletos', 'Faltan campos por completar.');
        } else {
            this.socketService.sendMessage(this.messageToSend, this.userToSendMsg);
            this.showToast('success', 'Mensaje enviado', 'Mensaje enviado a: ' + this.userToSendMsg);
            this.messageToSend = '';
            this.userToSendMsg = '';
            this.deviceToSendMsg = '';
        }
    }


    closeConnection() {
        this.alive = false;
    }

}
