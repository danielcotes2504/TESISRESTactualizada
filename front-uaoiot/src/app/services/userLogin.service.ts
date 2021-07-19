import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { throwError } from 'rxjs';
// import { Observable } from 'rxjs/Rx';
import { map, filter, finalize, catchError } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';
import { environment } from '../../environments/environment';
// import { map, filter } from 'rxjs/operators';

@Injectable()

export class UserLoginService {

    public url: string;

    constructor(private _http: Http,
        private loaderService: LoaderService) {
        this.url = environment.baseUrl;
    }

    getPrueba() {
        return 'Funciona el servicio';
    }

    getUsers() {
        
        this.loaderService.show();
        return this._http.get(this.url + 'api/usersLogin').pipe(
            map(res => res.json()),
            catchError((error: Response) => {
                this.loaderService.hide();
                return throwError('Algo salió mal.');
            }),
            finalize(() => {
                this.loaderService.hide();
            })
        );
    }

    getUserByUserName(userName) {
        this.loaderService.show();
        return this._http.get(this.url + 'api/userName/' + userName).pipe(
            map(res => res.json()),
            catchError((error: Response) => {
                this.loaderService.hide();
                return throwError('Algo salió mal.');
            }),
            finalize(() => {
                this.loaderService.hide();
            })
        );
    }

    postUser(user) {
        const json = JSON.stringify(user);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.url + 'api/userLogin', json, { headers: headers }).pipe(map(res => res.json()));
    }

    updateUser(user, idUser) {
        const json = JSON.stringify(user);
        const headers = new Headers();
        headers.append('Content-type', 'appliccation/json');
        return this._http.put(this.url + 'api/userLogin' + idUser, json, { headers: headers }).pipe(map(res => res.json()));
    }

    deleteUser(user) {
        
        return this._http.delete(this.url + 'api/userLogin/' + user).pipe(map(res => res.json()));
        
    }
}
