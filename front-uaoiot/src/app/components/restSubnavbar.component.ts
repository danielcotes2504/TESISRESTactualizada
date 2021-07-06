import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ApiService, VariableModel } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-rest-sub-navbar',
    templateUrl: '../views/restSubnavbar.component.html',
    styleUrls: ['../styles/restSubnavbar.component.scss']
})
export class RestSubNavbarComponent implements OnInit {

    project: string;
    variable: VariableModel;
    user: string;
    items: MenuItem[] = [];

    constructor(private router: Router, private apiService: ApiService) {
        this.user = this.apiService.getCurrentUser();
        this.project = this.apiService.getCurrentProject();
        this.variable = this.apiService.getCurrentVariable();
    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        switch (this.router.url) {
            case '/restProjects': {
                this.items = [{ label: 'Proyectos', routerLink: '' }];
                break;
            }
            case '/restVariables': {
                this.items = [{ label: 'Proyectos', routerLink: '/restProjects' },
                { label: this.project, routerLink: '/restVariables' }];
                break;
            }
            case '/restData': {
                this.items = [{ label: 'Proyectos', routerLink: '/restProjects' },
                { label: this.project, routerLink: '/restVariables' },
                { label: this.variable.variableN, routerLink: '/restData' }];
                break;
            }
        }
    }
}
