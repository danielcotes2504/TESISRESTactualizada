import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { throwError } from 'rxjs';
// import {Observable} from 'rxjs/Rx';
import { map, filter, finalize, catchError } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';
// import { map, filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable()

export class LibraryService {

    public url: string;

    constructor(private _http: Http,
        private loaderService: LoaderService) {
        this.url = environment.baseUrl;
    }

    getLibraries() {
        this.loaderService.show();
        return this._http.get(this.url + 'api/libraries').pipe(
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

    postLibrary(library) {
        const json = JSON.stringify(library);
        const headers = new Headers();

        headers.append('Content-Type', 'application/json');
        return this._http.post(this.url + 'api/library', json, { headers: headers })
            .pipe(map(res => res.json()));
    }

    deleteLibrary(idLibrary) {
        return this._http.delete(this.url + 'api/library/' + idLibrary).pipe(map(res => res.json()));
    }
}
