import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ShepherdService } from 'angular-shepherd';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tour-devices',
    templateUrl: '../views/tourDevices.component.html',
    styleUrls: ['../styles/tourDevices.component.scss']
})
export class TourDevicesComponent implements OnInit, AfterViewInit {

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
                id: 'devices-1',
                options: {
                    attachTo: '.project-1 bottom',
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
                    title: 'Proyectos',
                    text: ['Estas tarjetas hacen referencia a los proyectos' +
                        ' que ya han sido creados previamente en la sección proyectos.'],
                }
            },
            {
                id: 'devices-2',
                options: {
                    attachTo: '.title-1 bottom',
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
                    title: 'Nombre del proyecto',
                    text: ['En la parte superior aparecerá el nombre que le diste a tu proyecto.'],
                }
            },
            {
                id: 'devices-3',
                options: {
                    attachTo: '.card-1 bottom',
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
                    title: 'Dispositivos',
                    text: ['Las tarjetas en el interior indican los dispositivos ' +
                        'que están asociados a este proyecto. En las cuales se les indica el nombre y el ' +
                        'tipo de dispositivo.'],
                }
            },
            {
                id: 'devices-4',
                options: {
                    attachTo: '.bottom-1 bottom',
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
                    title: 'Opciones del dispositivo',
                    text: ['Al igual que los proyectos, también puedes editar y borrar tus dispositivos. ' +
                        'Debes tener en cuenta que si eliminas un dispositivo, las variables en su interior también se eliminarán.'],
                }
            },
            {
                id: 'devices-5',
                options: {
                    attachTo: '.add-device-1 bottom',
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
                    title: 'Nuevo dispositivo',
                    text: ['En la parte inferior puedes añadir un dispositivo más a tu proyecto.'],
                }
            },
            {
                id: 'devices-6',
                options: {
                    attachTo: '.container-1 bottom',
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
                    title: 'Mover dispositivos',
                    text: ['Si tienes más de un proyecto creado, puedes arrastrar dispositivos entre proyectos.'],
                }
            }]);
        if (this.router.url === '/tourDevices') {
            this.shepherdService.start();
        }
    }
}
