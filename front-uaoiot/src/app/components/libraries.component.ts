import { Component, OnInit } from '@angular/core';
import { Library } from '../models/library';
import { LibraryService } from '../services/library.service';
import { Message } from 'primeng/components/common/api';

@Component({
    selector: 'app-libraries',
    templateUrl: '../views/libraries.component.html',
    styleUrls: ['../styles/libraries.component.scss']
})

export class LibrariesComponent implements OnInit {

    public librariesArray = [];
    public msg: Message[] = [];

    constructor(private librariesService: LibraryService) { }

    ngOnInit() {
        this.getLibraries();
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
     * Obtener todas la librerias guardadas.
     */
    getLibraries() {
        this.librariesArray = [];

        this.librariesService.getLibraries().subscribe(data1 => {
            const dataArray = data1.library;

            for (const data in dataArray) {
                if (dataArray.hasOwnProperty(data)) {
                    const libraryObj = new Library(dataArray[data]._id, dataArray[data].name,
                        dataArray[data].laguage, dataArray[data].imgUrl, dataArray[data].fileUrl);
                    this.librariesArray.push(libraryObj);
                }
            }
        }, Error => {
            this.showToast('error', 'Error', 'Error al consultar las librerias.');
        });
    }
}
