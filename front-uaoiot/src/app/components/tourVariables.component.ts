import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ShepherdService } from 'angular-shepherd';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tour-variables',
    templateUrl: '../views/tourVariables.component.html',
    styleUrls: ['../styles/tourVariables.component.scss']
})
export class TourVariablesComponent implements OnInit, AfterViewInit {

    constructor(private shepherdService: ShepherdService,
        private router: Router) {
    }

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
                id: 'variables-0',
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
                    title: 'Variables',
                    text: ['En UAOIoT REST existen dos tipos de variables: Las variables dependientes e independientes. ' +
                        'Para que puedas crear una variable dependiente debe existir ' +
                        'previamente una variable independiente para que la puedas vincular.'],
                }
            },
            {
                id: 'variables-1',
                options: {
                    attachTo: '.new-card bottom',
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
                    title: 'Añadir variable',
                    text: ['Al hacer clic en esta tarjeta podrás añadir una nuevo variable a tu proyecto. ' +
                        'Debes tener en cuenta que para crear una nueva variable debes crear primero un dispositivo'],
                }
            },
            {
                id: 'variables-2',
                options: {
                    attachTo: '.old-card bottom',
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
                    title: 'Variable creada',
                    text: ['Las tarjetas rojas indican las variables que tienes asociado a tu proyecto.'],
                }
            },
            {
                id: 'variables-3',
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
                    title: 'Entrar a la variable',
                    text: ['Aquí encontrarás el nombre de tu variable, en el cual puedes hacer clic para ingresar y conocer ' +
                        'los datos que han sido enviados a esta variable.'],
                }
            },
            {
                id: 'variables-4',
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
                    title: 'Opciones de la variable',
                    text: ['En esta sección podrás cambiar el nombre de la variable o eliminarla definitivamente.'],
                }
            }]);
        if (this.router.url === '/tourVariables') {
            this.shepherdService.start();
        }
    }
}
