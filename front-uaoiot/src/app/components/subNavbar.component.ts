import {
    Component, Output, Input, EventEmitter, ViewEncapsulation,
    ChangeDetectorRef, OnChanges, SimpleChanges, SimpleChange, OnInit
} from '@angular/core';
import { SocketService } from '../services/socket.service';
import { DashboardComponent } from './dashboard.component';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
    selector: 'app-sub-navbar',
    templateUrl: '../views/subNavbar.component.html',
    styleUrls: ['../styles/subNavbar.component.scss']
})

export class SubNavbarComponent implements OnInit, OnChanges {

    public display = false;
    public displayTable = false;
    public typeDataChart;
    public titleDataChart;
    public titleDialog: String;
    public stepItems: MenuItem[];
    public activeIndex = 0;
    public dataToChart;
    public variablesData;
    public nameProject = 'none';
    public color2 = '#1976D2';
    public colors = ['#1976D2', '#c42727', '#bda235', '#50bd35'];

    @Output() subNavbarEvent = new EventEmitter<string>();
    @Input() devicesArray;
    public _devicesArray;

    constructor(
        private socketService: SocketService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private projectService: ProjectService
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        const variables = changes.devicesArray;
        this._devicesArray = variables.currentValue;
    }

    ngOnInit() {
        this.getProjectInfo();
    }

    /**
     * Obtener informmación del proyecto actual.
     */
    getProjectInfo() {
        const link = this.router.url;
        const idProject = link.replace('/dashboard/', '');
        this.projectService.getProjectById(idProject).subscribe(data => {
            this.nameProject = data.project[0].name;
        }, Error => {
            alert('Error ' + Error);
        });
    }

    sendData() {
        this.subNavbarEvent.emit(this.dataToChart);
        this.display = false;
    }
}
