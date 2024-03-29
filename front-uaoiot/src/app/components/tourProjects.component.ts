import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ShepherdService } from 'angular-shepherd';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tour-projects',
    templateUrl: '../views/tourProjects.component.html',
    styleUrls: ['../styles/tourProjects.component.scss']
})
export class TourProjectsComponent implements OnInit, AfterViewInit {

    @Output() changeModeEvent = new EventEmitter<string>();

    constructor(private shepherdService: ShepherdService,
        private router: Router) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.shepherdService.defaultStepOptions = {
            classes: 'custom-class-name-1 custom-class-name-2',
            scrollTo: false,
            showCancelLink: true
        };
        this.shepherdService.disableScroll = true;
        this.shepherdService.modal = false;
        this.shepherdService.confirmCancel = false;
        this.shepherdService.addSteps([
            {
                id: 'projects-0',
                options: {
                    attachTo: '.new-card bottom',
                    buttons: [
                        {
                            classes: 'custom-class-name-1 custom-class-name-2',
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
                    title: 'Crear proyecto',
                    text: ['Al hacer clic en esta tarjeta podrás añadir un nuevo proyecto a tu usuario.'],
                }
            },
            {
                id: 'projects-1',
                options: {
                    attachTo: '.old-card bottom',
                    buttons: [
                        {
                            classes: 'custom-class-name-1 custom-class-name-2',
                            text: 'Atrás',
                            type: 'back'
                        },
                        {
                            classes: 'custom-class-name-1 custom-class-name-2',
                            text: 'Adelante',
                            type: 'next'
                        }
                    ],
                    classes: 'custom-class-name-1 custom-class-name-2',
                    highlightClass: 'highlight',
                    scrollTo: false,
                    showCancelLink: true,
                    title: 'Proyecto creado',
                    text: ['Las tarjetas rojas indican los proyectos que tienes asociado a tu usuario.'],
                }
            },
            {
                id: 'projects-2',
                options: {
                    attachTo: '.card-header bottom',
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
                    title: 'Entrar al proyecto',
                    text: ['Aquí encontrarás el nombre de tu proyecto, en el cual puedes hacer clic para ingresar y conocer ' +
                        'las variables que tiene asociado tu proyecto.'],
                }
            },
            {
                id: 'projects-3',
                options: {
                    attachTo: '.previous-card-bottom bottom',
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
                    title: 'Opciones del proyecto',
                    text: ['En esta sección podrás cambiar el nombre de tu proyecto o eliminarlo definitivamente.'],
                }
            }
        ]);
        if (this.router.url === '/tourProjects') {
            this.shepherdService.start();
        } else {
            this.shepherdService.cancel();
        }
    }
}
