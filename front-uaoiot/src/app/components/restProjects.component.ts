import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectModel, DeviceModel, ApiService } from '../services/api.service';
import { Message } from 'primeng/components/common/api';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-rest-projects',
    templateUrl: '../views/restProjects.component.html',
    styleUrls: ['../styles/restProjects.component.scss']
})
export class RestProjectsComponent implements OnInit {

    displayNewProject = false;
    displayEditProject = false;
    projects: ProjectModel[] = [];
    devices: DeviceModel[][] = [[]];
    updatedProject: ProjectModel = { user: '', project: '' };
    newProject: ProjectModel = { user: '', project: '' };
    user: string;
    url: string;
    msgs: Message[] = [];
    navigationType = '';
    pjPass: ProjectModel;
    public displayDeleteProject = false;
    public textLabel:string='Tutorial';
    

    @Output() changeModeEvent = new EventEmitter<string>();

    constructor(private router: Router, private apiService: ApiService) {
    }

    ngOnInit() {
        this.user = this.apiService.getCurrentUser();
        this.getData();
    }

    getData() {
        this.apiService.getProjects(environment.restUrl + 'apiProjects/' + this.user)
            .subscribe(resProject => {
                this.projects = resProject.body;
            });
    }

    previusProjectsClick(event, project: ProjectModel) {
        this.apiService.setCurrentProject(project.project);
        this.router.navigate(['/restVariables']);
    }

    openDeleteDialog(event,selectedProject: ProjectModel) {
        this.displayDeleteProject=true;
        this.pjPass = selectedProject
        console.log(this.pjPass);
     
        }
    trashClick() {
        this.displayDeleteProject=false;
        this.url = environment.restUrl + 'apiProjects/' + this.pjPass.user + '/' + this.pjPass.project;
        this.apiService.delete(this.url).subscribe(resDeleteProject => {
            if (resDeleteProject.message === 'Deleted') {
                this.getData();
            }
        });
    }

    editClick(event, project: ProjectModel) {
        this.pjPass = project;
        this.displayEditProject = true;
        this.url = environment.restUrl + 'apiProjects/' + project.user + '/' + project.project;

        this.updatedProject = project;
        console.log(project.project);
    }

    updateProjectClick(event, newDeviceName: string) {
        this.updatedProject.project = newDeviceName;
        if (this.updatedProject.project !== '') {
            this.clear();
            this.apiService.updateProject(this.updatedProject, this.url).subscribe(resUpdateProject => {
                if (resUpdateProject.message === 'Updated') {
                    this.getData();
                    this.displayEditProject = false;
                }
            });
        } else {
            this.show();
        }
    }

    newProjectClick() {
        this.displayNewProject = true;
        this.url = environment.restUrl + 'apiProjects/' + this.user;
    }

    addProjectClick(event, projectName: string) {
        this.newProject.project = projectName;
        this.newProject.user = this.user;
        if (this.newProject.project !== '') {
            this.clear();
            this.apiService.addProject(this.newProject, this.url).subscribe(resAddProject => {
                if (resAddProject.message === 'Saved') {
                    this.getData();
                    this.displayNewProject = false;
                }
            });
        } else {
            this.show();
        }
    }

    changeMode() {
        this.apiService.setNavigationType('takeTour');
        this.changeModeEvent.emit('takeTour');
        this.router.navigate(['/tourProjects']);
    }

    show() {
        this.msgs.push({
            severity: 'error',
            summary: 'No se ingresó nombre'
        });
    }
    clear() {
        this.displayEditProject = false;
        this.displayNewProject = false;
        this.msgs = [];
    }

    textOnHover(){
        this.textLabel = "Tutorial de proyectos"
    }
    textOnLeave(){
        this.textLabel = "Tutorial"
    }
}
