import { Component, OnInit } from '@angular/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { Library } from '../models/library';
import { LibraryService } from '../services/library.service';
import { Message } from 'primeng/components/common/api';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-libraries-admin',
    templateUrl: '../views/librariesAdmin.component.html',
    styleUrls: ['../styles/librariesAdmin.component.scss']
})

export class LibrariesAdminComponent implements OnInit {

    public nameLibrary;
    public languageLibrary;
    public idLibraryToDelete;
    public msg: Message[] = [];
    public urlFile = environment.baseUrl + 'api/file/';
    public librariesArray = [];
    public displayAdd = false;
    public displayDelete = false;
    public uploadedFiles: any[] = [];
    public uploader: FileUploader = new FileUploader({ url: environment.baseUrl + 'api/file/upload', itemAlias: 'file' });
    public languages = [{ name: 'JAVA' }, { name: 'Arduino' }, { name: 'Javascript' }, { name: 'Android' },
    { name: 'Python' }, { name: 'Otro' }, { name: 'None' }];


    constructor(private librariesService: LibraryService) { }

    ngOnInit() {
        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            this.addLibrary(this.nameLibrary, item.file.name, this.languageLibrary.name);
            this.displayAdd = false;
        };
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
     * Obtener librerias guardadas.
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
        }, Error => { });
    }

    showDialogAddLibrary() {
        this.displayAdd = true;
    }

    /**
     * Agrregar una libreria.
     * @param name Nombre de la libreria.
     * @param fileName Nombre del archivo.
     * @param language Lenguaje de la libreria.
     */
    addLibrary(name, fileName, language) {

        let imgUrl = '';

        if (language === 'JAVA') {
            imgUrl = 'assets/images/java_card.jpg';
        } else if (language === 'Arduino') {
            imgUrl = 'assets/images/arduino_card.jpg';
        } else {
            imgUrl = 'assets/images/ejemplos.jpg';
        }

        const libraryJson = {
            name: name,
            language: language,
            imgUrl: imgUrl,
            fileUrl: this.urlFile + fileName
        };

        this.librariesService.postLibrary(libraryJson).subscribe(data => {
            this.showToast('success', 'Agregada', 'Libreria agregada exitosamente.');
            this.getLibraries();
        }, Error => {
            this.showToast('error', 'Error', 'Error al agregar la libreria.');
        });

        this.nameLibrary = '';
        this.languageLibrary = '';
    }


    showDialogDeleteLibrary(index) {
        this.idLibraryToDelete = this.librariesArray[index].id;
        this.displayDelete = true;
    }

    /**
     * Eliminar libreria.
     */
    deleteLibrary() {
        this.librariesService.deleteLibrary(this.idLibraryToDelete).subscribe(data => {
            this.displayDelete = false;
            this.showToast('success', 'Eliminada', 'Libreria eliminada exitosamente.');
            this.getLibraries();
        }, Error => {
            this.displayDelete = false;
            alert(Error);
            this.showToast('error', 'Error', 'Error al eliminar la libreria.');
        });
    }

}
