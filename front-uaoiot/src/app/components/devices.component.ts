import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';
import { Device } from '../models/device';
import { PermissionService } from '../services/permission.service';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'app-devices-view',
    templateUrl: '../views/devices.component.html',
    styleUrls: ['../styles/devices.component.scss']
})

export class DevicesComponent implements OnInit {

    public userDevice: String;
    public idProject: String;
    public nameProject: String;
    public nameDevice: String;
    public display = false;
    public displayUpdate: boolean;
    public displayDelete: boolean;
    public filteredProject: String;
    public filteredProjectsArray = [];
    public idDeviceToDelete: String;
    public idDeviceToUpdate: String;
    public deviceObj: Device;
    public variablesArray = [];
    public projectsArray = [];
    public devicesArray = [];
    public msg: Message[] = [];

    constructor(
        private deviceService: DeviceService,
        private projectService: ProjectService,
        private permissionService: PermissionService
    ) { }

    ngOnInit() {
        this.nameProject = '';
        this.nameDevice = '';
        if (localStorage.getItem('user') != null) {
            const userProfile = JSON.parse(localStorage.getItem('user'));
            this.userDevice = userProfile.user;
        } else {
            this.userDevice = '';
        }
        this.getUserProjects(this.userDevice);
        this.getAllDevices(this.userDevice);
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

    /**
     * Filtrar proyectos.
     */
    filterProject(event) {
        this.filteredProjectsArray = [];
        for (let i = 0; i < this.projectsArray.length; i++) {
            const project = this.projectsArray[i].name;
            if (project.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
                this.filteredProjectsArray.push(project);
            }
        }

    }

    /**
     * Mostrar el cuadro de diálogo para eliminar un dispositivo.
     * @param index Posición del dispositivo seleccionado.
     */
    showDialogDeleteDevice(index) {
        this.idDeviceToDelete = this.devicesArray[index].id;
        this.displayDelete = true;
    }

    /**
     * Eliminar un dispositivo.
     */
    deleteDevice() {
        this.deviceService.deleteDevice(this.idDeviceToDelete).subscribe(data => {
            this.displayDelete = false;
            this.showToast('success', 'Eliminado', 'Dispositivo eliminado exitosamente.');
            this.getAllDevices(this.userDevice);
        }, Error => {
            this.displayDelete = false;
            this.showToast('error', 'Error', 'Error al eliminar el dispositivo.');
        });



    }

    /**
     * Agregar un dispositivo.
     * @param name Nobre del dispositivo.
     * @param user Usuario.
     * @param project Proyecto asociado.
     */
    addDevice(name: String, user: String, project: String, projectId: String, variables) {

        if (name === '' || user === '' || project === '') {
            this.showToast('warn', 'Datos incompletos', 'Datos incompletos para crear dispositivo.');
        } else {
            const device = {
                name: name,
                user: user,
                project: project,
                projectId: projectId,
                variables: variables
            };
            this.deviceService.postDevice(device).subscribe(data => {
                const permission = {
                    user: user,
                    topic: name + '_' + user,
                    permission: 'READWRITE'
                };
                this.showToast('success', 'Dispositivo creado', 'Dispositivo ' + name + ' creado exitosamente.');
                this.createNewPermission(permission);
                this.getAllDevices(this.userDevice);

            }, Error => {
                this.showToast('error', 'Error', 'Error al crear el dispositivo.');
            });

            this.display = false;
        }
    }

    /**
     * Mostrar el cuadro de diálogo para actualizar un dispositivo.
     * @param index
     */
    showDialogUpdateDevice(index) {
        this.idDeviceToUpdate = this.devicesArray[index].id;
        this.displayUpdate = true;
        this.nameDevice = this.devicesArray[index].name;
        this.nameProject = this.devicesArray[index].project;
        this.variablesArray = this.devicesArray[index].variables;
    }

    /**
     * Actualizar un dispositivo.
     */
    updateDevice() {

        const deviceJson = {
            name: this.nameDevice,
            user: this.userDevice,
            project: this.nameProject,
            projectId: this.idProject,
            variables: this.variablesArray
        };
        this.deviceService.updateDevice(deviceJson, this.idDeviceToUpdate).subscribe(data => {
            this.showToast('success', 'Actualizado', 'Dispostivio actualizado exitosamente.');
            this.getAllDevices(this.userDevice);
            this.displayUpdate = false;

        }, Error => {
            this.showToast('error', 'Error', 'Error al actualizar el dispositivo.');
        });
    }

    createNewPermission(permission) {
        this.permissionService.postPermission(permission).subscribe(data => {

        }, Error => {

        });
    }

    /**
     * Obtener todos los dispositivos de un usuario.
     * @param userName Nombre de usuario.
     */
    getAllDevices(userName) {

        this.devicesArray = [];
        this.deviceService.getDeviceByUserName(userName).subscribe(data => {

            const datasArray = data.device;
            for (const datas in datasArray) {
                if (datasArray.hasOwnProperty(datas)) {
                    const deviceObj = new Device(datasArray[datas]._id, datasArray[datas].name, datasArray[datas].user,
                        datasArray[datas].project, datasArray[datas].projectId, datasArray[datas].variables);
                    this.devicesArray.push(deviceObj);
                }
            }
        }, Error => {
            this.showToast('error', 'Error', 'Error al consultar los dispositivos.');
        });
    }

    /**
     * Obtener los proyectos de un usuario.
     * @param userName Nombre de usuario.
     */
    getUserProjects(userName) {
        this.projectService.getProjectByUserName(userName).subscribe(data => {
            const datasArray = data.project;
            for (const datas in datasArray) {
                if (datasArray.hasOwnProperty(datas)) {
                    const projectObj = new Project(datasArray[datas]._id, datasArray[datas].name, datasArray[datas].user);
                    this.projectsArray.push(projectObj);
                }
            }
        }, Error => {
            this.showToast('error', 'Error', 'Error al consultar los proyectos.');
        });
    }

    /**
     * Obtener id de un proyecto en específico.
     */
    getProjectId() {

        const encodeStringName = this.nameProject.split(' ').join('%20');
        this.projectService.getProjectByName(encodeStringName).subscribe(data => {
            this.idProject = data.project[0]._id;
            this.updateDevice();
        }, Error => {
            this.showToast('warn', 'Datos incompletos', 'Datos incompletos para crear dispositivo.');
        });
    }

    /**
     * Obtener la información de un dispositivo.
     */
    getDeviceData() {
        if (localStorage.getItem('user') != null) {
            const userProfile = JSON.parse(localStorage.getItem('user'));
            this.userDevice = userProfile.user;
        } else {
            this.userDevice = '';
        }
        const encodeStringName = this.nameProject.split(' ').join('%20');
        this.projectService.getProjectByName(encodeStringName).subscribe(data => {
            this.idProject = data.project[0]._id;
            this.addDevice(this.nameDevice, this.userDevice, this.nameProject, this.idProject, this.variablesArray);
        }, Error => {
            this.showToast('warn', 'Datos incompletos', 'Datos incompletos para crear dispositivo.');
        });
    }

    /**
     * Mostrar cuadro de diálogo para agregar un dispositivo.
     */
    showDialogAddDevice() {

        this.nameProject = '';
        this.nameDevice = '';
        this.variablesArray = [];
        this.display = true;
    }
}
