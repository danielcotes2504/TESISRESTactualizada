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
        this.shepherdService.disableScroll = false;
        this.shepherdService.modal = true;
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
                            text: 'Siguiente',
                            type: 'next'
                        }
                    ],
                    classes: 'custom-class-name-1 custom-class-name-2',
                    highlightClass: 'highlight',
                    scrollTo: false,
                    showCancelLink: true,
                    title: 'Crear proyecto',
                    text: ['Al hacer click en esta tarjeta podrás añadir un nuevo proyecto'],
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
                            text: 'Siguiente',
                            type: 'next'
                        }
                    ],
                    classes: 'custom-class-name-1 custom-class-name-2',
                    highlightClass: 'highlight',
                    scrollTo: false,
                    showCancelLink: true,
                    title: 'Proyecto creado',
                    text: ['Las tarjetas azules indican tus proyectos actuales.'],
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
                            text: 'Siguiente',
                            type: 'next'
                        }
                    ],
                    classes: 'custom-class-name-1 custom-class-name-2',
                    highlightClass: 'highlight',
                    scrollTo: false,
                    showCancelLink: true,
                    title: 'Entrar al proyecto',
                    text: ['Aquí encontrarás el nombre de tu proyecto, donde puedes hacer click para ingresar y conocer ' +
                        'las variables que tienes asociadas a tu proyecto.'],
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
                            text: 'Entendido',
                            action: ()=>{
                                this.shepherdService.complete()
                                this.router.navigateByUrl('/restProjects')
                            
                            }
                            
                            
                            
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
        if(!this.shepherdService.isActive){
            console.log(this.shepherdService.isActive)
            this.router.navigateByUrl('/restProjects')
        }

        
       

        
    }
  
    
    
}


