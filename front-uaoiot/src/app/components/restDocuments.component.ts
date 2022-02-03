import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-rest-documents',
    templateUrl: '../views/restDocuments.component.html',
    styleUrls: ['../styles/restDocuments.component.scss']
})
export class RestDocumentsComponent implements OnInit {
    postURL: string;
    getURL: string;
    host: string;
    port: string;
    postParameter: string= "/[Usuario]/[Proyecto]/[Dispositivo]/[Variable]/[Token de usuario]";
    getParameter: string ="/[Usuario]/[Proyecto]/[Dispositivo]/[Variable]";
    constructor() { }

    ngOnInit() {
        this.postURL = environment.restUrl+ this.postParameter;
        this.getURL = environment.restUrl+ this.getParameter;
        const words = environment.restUrl.split("/");
        const hostPort= words[2].split(":");
        this.host= hostPort[0];
        this.port= hostPort[1];
        
    }
}
