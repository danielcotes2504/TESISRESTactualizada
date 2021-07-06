import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';
import { UserLoginService } from '../services/userLogin.service';
import { DashboardService } from '../services/dashboard.service';
import { PermissionService } from '../services/permission.service';
import { Router } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ChartService } from '../services/chart.service';
import { DeviceService } from '../services/device.service';
import { Device } from '../models/device';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'app-project',
    templateUrl: '../views/project.component.html',
    styleUrls: ['../styles/project.component.scss']
})

export class ProjectComponent implements OnInit {
    public projectsArray = [];
    public devicesArray = [];
    public msg: Message[] = [];
    public projectObj: Project;
    public nameProject: String;
    public userProject: String;
    public display: boolean;
    public displayDelete = false;
    public displayUpdate = false;
    public idProjectToDelete: String;
    public idProjectToUpdate: String;
    public idProject;

    constructor(
        private projectService: ProjectService,
        private userLoginService: UserLoginService,
        private chartService: ChartService,
        private deviceService: DeviceService,
        private dashboardService: DashboardService,
        private permissionService: PermissionService,
        private router: Router) { }

    ngOnInit() {

        if (localStorage.getItem('user') != null) {
            const userProfile = JSON.parse(localStorage.getItem('user'));
            this.userProject = userProfile.user;
        } else {
            this.userProject = '';
        }
        this.getAllProjects(this.userProject);
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
     * Ir al dashboard según el proyecto seleccionado.
     */
    goToDashboard(index) {

        this.devicesArray = [];
        this.deviceService.getDeviceByProject(this.projectsArray[index].id).subscribe(data => {

            const datasArray = data.device;
            for (const datas in datasArray) {
                if (datasArray.hasOwnProperty(datas)) {
                    const deviceObj = new Device(datasArray[datas]._id, datasArray[datas].name,
                        datasArray[datas].user, datasArray[datas].project, datasArray[datas].projectId, datasArray[datas].variables);
                    this.devicesArray.push(deviceObj);
                }
            }

            if (this.devicesArray.length === 0) {
                this.showToast('info', 'Sin dispositivos', 'Debes crear un dispositivo para este proyecto.');
            } else {
                this.router.navigate(['dashboard/' + this.projectsArray[index].id]);
            }
        }, Error => {

        });
    }
    

    /**
     * Método para obtener todos los proyectos de un usuario.
     * @param userName Nombre de usuario.
     */
    getAllProjects(userName) {

        this.projectsArray = [];

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
     * Método para obtener los datos de un proyecto.
     */
    getProjectData() {
        if (localStorage.getItem('user') != null) {
            const userProfile = JSON.parse(localStorage.getItem('user'));
            this.userProject = userProfile.user;
        } else {
            this.userProject = '';
        }
        this.addProject(this.nameProject, this.userProject);
        this.display = false;
    }

    /**
     * Obtener dispositivos asociados al proyecto que se va a actualizar.
     */
    getDevicesToUpdate(idProject) {

        this.devicesArray = [];
        this.deviceService.getDeviceByProject(idProject).subscribe(data => {
            const datasArray = data.device;
            for (const datas in datasArray) {
                if (datasArray.hasOwnProperty(datas)) {
                    const deviceObj = new Device(datasArray[datas]._id, datasArray[datas].name, datasArray[datas].user,
                        datasArray[datas].project, datasArray[datas].projectId, datasArray[datas].variables);
                    this.devicesArray.push(deviceObj);
                    console.log('DEVICE: ' + datasArray[datas].project);
                }
            }
        }, Error => {

        });
    }

    /**
     * Actualizar dispositivos asociados al proyecto a actualizar.
     * @param devicesArray Arreglo de dispositivos asociados al proyecto a actualizar.
     */
    updateProjectDevices(devicesArray) {
        for (let i = 0; i < devicesArray.length; i++) {
            const deviceJson = {
                name: devicesArray[i].name,
                user: devicesArray[i].user,
                project: this.nameProject,
                projectId: devicesArray[i].projectId,
                variables: devicesArray[i].variables
            };
            this.deviceService.updateDevice(deviceJson, devicesArray[i].id).subscribe(data => {
            }, Error => { });
        }
    }

    showDialogAddProject() {
        this.display = true;
    }

    showDialogDeleteProject(index) {
        this.idProjectToDelete = this.projectsArray[index].id;
        this.displayDelete = true;
    }

    showDialogUpdateProject(index) {
        this.idProjectToUpdate = this.projectsArray[index].id;
        this.displayUpdate = true;
        this.nameProject = this.projectsArray[index].name;
        this.getDevicesToUpdate(this.idProjectToUpdate);
    }

    /**
     * Actualizar proyecto.
     */
    updateProject() {
        const projectJson = {
            name: this.nameProject,
            user: this.userProject
        };

        this.projectService.updateProject(projectJson, this.idProjectToUpdate).subscribe(data => {
            this.updateProjectDevices(this.devicesArray);
            this.getAllProjects(this.userProject);
            this.showToast('success', 'Actualizado', 'Proyecto actualizado exitosamente.');
            this.displayUpdate = false;

        }, Error => {
            this.showToast('error', 'Error', 'Error al actualizar el proyecto.');
        });

    }

    /**
     * Método para eliminar un proyecto y las gráficas y dispoitivos asociados.
     */
    deleteProject() {
        this.projectService.deleteProject(this.idProjectToDelete).subscribe(data => {

            this.displayDelete = false;
            this.showToast('success', 'Eliminado', 'Proyecto eliminado exitosamente.');
            this.deviceService.deleteDevicetByProject(this.idProjectToDelete).subscribe(data1 => { }, Error => { });
            this.getAllProjects(this.userProject);
        }, Error => {
            this.displayDelete = false;
            this.showToast('error', 'Error', 'Error al eliminar el proyecto.');
        });
    }

    /**
     * Crear un proyecto.
     * @param name Nombre del proyecto.
     * @param user Nombre de usuario.
     */
    addProject(name: String, user: String) {
        const projectJson = {
            name: name,
            user: user
        };
        this.projectService.postProject(projectJson).subscribe(data => {
            this.idProject = data.project;
            const permission = {
                user: user,
                topic: name + '_' + user,
                permission: 'READWRITE'
            };
            const dashboard = {
                project: this.idProject._id,
                user: user
            };
            this.showToast('success', 'Proyecto creado', 'El proyecto ' + name + ' ha sido creado.');
            this.getAllProjects(user);
        }, Error => {
            this.showToast('error', 'Error', 'Erro al crear el proyeto.');
        });
        this.nameProject = '';
    }

    createNewPermission(permission) {
        this.permissionService.postPermission(permission).subscribe(data => {

        }, Error => {

        });
    }
}
