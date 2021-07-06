import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
// import { Observable } from 'rxjs/Rx';
import { map, filter } from 'rxjs/operators';

@Injectable()

export class TableService {

    public url: string;

    constructor(private _http: Http) {
        this.url = environment.baseUrl;
    }

    getTableByProject(projectId) {
        return this._http.get(this.url + 'api/tableproject/' + projectId).pipe(map(res => res.json()));
    }

    postTable(table) {
        const json = JSON.stringify(table);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.url + 'api/table', json, { headers: headers }).pipe(map(res => res.json()));

    }

    deleteTableByProject(project) {
        return this._http.delete(this.url + 'api/table/' + project).pipe(map(res => res.json()));
    }

    deleteTableById(tableId) {
        return this._http.delete(this.url + 'api/tableById/' + tableId).pipe(map(res => res.json()));
    }
}
