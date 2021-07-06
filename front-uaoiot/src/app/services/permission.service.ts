import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
// import {Observable} from 'rxjs/Rx';
import { map, filter } from 'rxjs/operators';

@Injectable()

export class PermissionService {

    public url: string;

    constructor(private _http: Http) {
        this.url = environment.baseUrl;
    }

    getPermission() {
        return this._http.get(this.url + 'api/aclss').pipe(map(res => res.json()));
    }

    postPermission(permission) {
        const json = JSON.stringify(permission);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.url + 'api/acls', json, { headers: headers })
            .pipe(map(res => res.json()));
    }
}
