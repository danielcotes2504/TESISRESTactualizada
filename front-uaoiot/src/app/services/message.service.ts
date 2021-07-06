import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
// import {Observable} from 'rxjs/Rx';
import { map, filter } from 'rxjs/operators';

@Injectable()

export class MessageService {

    public url: string;

    constructor(private _http: Http) {
        this.url = environment.baseUrl;
    }

    getMessages() {
        return this._http.get(this.url + 'api/messages')
            .pipe(map(res => res.json()));
    }
}
