import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
// import { Observable } from 'rxjs/Rx';
import { map, filter } from 'rxjs/operators';

@Injectable()

export class UserService {

    public url: string;

    constructor(private _http: Http) {
        this.url = environment.baseUrl;
    }

    getPrueba() {
        return 'Funciona el servicio';
    }

    getUsers() {
        return this._http.get(this.url + 'api/users').pipe(map(res => res.json()));
    }

    postUser(user) {
        const json = JSON.stringify(user);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.url + 'api/user', json, { headers: headers })
            .pipe(map(res => res.json()));
    }

    deleteUser(user) {
        return this._http.delete(this.url + 'api/user/' + user).pipe(map(res => res.json()));
    }
}
