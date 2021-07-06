import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
// import { Observable } from 'rxjs/Rx';
import { map, filter } from 'rxjs/operators';

@Injectable()

export class TokenService {

    public url: string;

    constructor(private _http: Http) {
        this.url = environment.baseUrl;
    }

    getTokenByUser(userName) {
        return this._http.get(this.url + 'api/tokenuser/' + userName).pipe(map(res => res.json()));

    }
}
