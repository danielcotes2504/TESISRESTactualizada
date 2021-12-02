import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectModel, DeviceModel, ApiService, VariableModel } from '../services/api.service';
import { Message } from 'primeng/components/common/api';
import { environment } from '../../environments/environment';

interface DeviceHardware {
    hardware: string;
}

@Component({
    selector: 'app-rest-devices',
    templateUrl: '../views/restDevices.component.html',
    styleUrls: ['../styles/restDevices.component.scss']
})

export class RestDevicesComponent implements OnInit {

    draggedDevice: DeviceModel;
    projects: ProjectModel[] = [];
    selectedProject: ProjectModel;
    devices: DeviceModel[][] = [[]];
    devicesHardware: DeviceHardware[] = [];
    editedDevice: DeviceModel = { user: '', project: '', deviceH: '', deviceN: '' };
    newDevice: DeviceModel = { user: '', project: '', deviceH: '', deviceN: '' };
    user: string;
    url: string;
    displayEdit = false;
    displayNew = false;
    error: any;
    msgs: Message[] = [];
    variables: VariableModel[] = [];
    stringVariable = '';
    dvPass: DeviceModel;
    public msg: Message[] = [];
    public displayDeleteDevice = false;
    public textLabel:string='Tutorial';
    constructor(private router: Router, private apiService: ApiService) {
        this.user = this.apiService.getCurrentUser();
        this.devicesHardware = [{ hardware: 'RaspberryPi' }, { hardware: 'ArduinoYun' },
        { hardware: 'NodeMCU' }, { hardware: 'LinkItONE' }];
    }

    ngOnInit() {
        this.getData();
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

    showToaster() {
        this.msgs.push({
            severity: 'warn',
            summary: 'No existen dispositivos:',
            detail: 'Para crear un dispositivo debes crear un proyecto. '
        });
    }


    getData() {
        this.apiService.getProjects(environment.restUrl + 'apiProjects/' + this.user)
            .subscribe(resProject => {
                this.projects = resProject.body;

                if (this.projects.length ==0) {
                    this.showToaster();
                   
                }

                for (let i = 0; i < this.projects.length; i++) {
                    this.apiService
                        .getDevices(environment.restUrl + 'apiDevices/' + this.user + '/' + this.projects[i].project)
                        .subscribe(resDevice => {
                            this.devices[i] = resDevice.body;

                        }, error => this.error = error);


                        
                } 
            }, error => this.error = error);
    }

    dragStart(event, device: DeviceModel) {
        this.draggedDevice = device;
    }

    dragEnd(event) {
    }

    dropDevice(event, project: ProjectModel) {
        this.url = environment.restUrl + 'apiDevices/' + project.user + '/' + this.draggedDevice.project +
            '/' + this.draggedDevice.deviceN + '/' + this.draggedDevice.deviceH;
        this.draggedDevice.project = project.project;
        this.apiService.updateDevice(this.draggedDevice, this.url).subscribe(resUpdateDevice => {
            if (resUpdateDevice.message === 'Updated') {
                this.getData();
            }
        });
    }
    openDeleteDialog(event,selectedDevice: DeviceModel) {
        this.displayDeleteDevice=true;
        this.dvPass = selectedDevice
        console.log(this.dvPass);
     
        }
    trashClick() {
        this.displayDeleteDevice=false;
        this.url = environment.restUrl + 'apiDevices/' + this.dvPass.user + '/' + this.dvPass.project + '/'
            + this.dvPass.deviceN + '/' + this.dvPass.deviceH;
        this.apiService.delete(this.url).subscribe(resDeleteDevice => {
            if (resDeleteDevice.message === 'Deleted') {
                this.getData();
            }
        });
    }

    editClick(event, device: DeviceModel) {
        this.dvPass= device;
        this.displayEdit = true;
        this.editedDevice = device;
        this.url = environment.restUrl + 'apiDevices/' + device.user + '/' + device.project + '/'
            + device.deviceN + '/' + device.deviceH;

    }

    updateDeviceClick(editDeviceName: string, editDeviceHardware: string) {
        this.editedDevice.deviceN = editDeviceName;
        this.editedDevice.deviceH = editDeviceHardware;
        if (editDeviceName !== '') {
            this.clear();
            this.apiService.updateDevice(this.editedDevice, this.url).subscribe(resUpdateDevice => {
                if (resUpdateDevice.message === 'Updated') {
                    this.getData();
                    this.displayEdit = false;
                }
            });
        } else {
            this.show();
        }
    }

    newDeviceClick(project: ProjectModel) {
        this.displayNew = true;
        this.selectedProject = project;
        this.url = environment.restUrl + 'apiDevices/' + project.user + '/' + project.project;
    }

    addDeviceClick(newDeviceName: string, newDeviceHardware: string) {
        this.newDevice.user = this.selectedProject.user;
        this.newDevice.project = this.selectedProject.project;
        this.newDevice.deviceN = newDeviceName;
        this.newDevice.deviceH = newDeviceHardware;
        if (this.newDevice.deviceN !== '') {
            this.clear();
            this.apiService.addDevice(this.newDevice, this.url).subscribe(resAddDevice => {
                if (resAddDevice.message === 'Saved') {
                    this.getData();
                    this.displayNew = false;
                }
            });
        } else {
            this.show();
        }
    }

    deviceClick(e, dev: VariableModel) {
        const variableUrl = environment.restUrl + 'apiVariables/' + dev.user + '/' + dev.project + '/'
            + dev.deviceN;
        this.apiService.getVariables(variableUrl).subscribe(resVariables => {
            this.variables = resVariables.body;
            this.stringVariable = '';
            for (let i = 0; i < this.variables.length; i++) {
                this.stringVariable += this.variables[i].variableN + ' ';

            }
        });
    }

    changeMode() {
        this.apiService.setNavigationType('takeTour');
        this.router.navigate(['/tourDevices']);
    }
    show() {
        this.msgs.push({
            severity: 'error',
            summary: 'No se ingresó nombre',
        });
    }
    clear() {
        this.displayEdit = false;
        this.displayNew = false;
        this.msgs = [];
    }

    textOnHover(){
        this.textLabel = "Tutorial de dispositivos"
    }
    textOnLeave(){
        this.textLabel = "Tutorial"
    }
}
