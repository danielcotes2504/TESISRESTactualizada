import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { throwError } from 'rxjs';
// import {Observable} from 'rxjs/Rx';
import { map, filter, finalize, catchError } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';
import { environment } from '../../environments/environment';
@Injectable()

export class ProjectService {
    public url: string;

    constructor(private _http: Http,
        private loaderService: LoaderService) {
        this.url = environment.baseUrl;
    }

    getProjects() {
        this.loaderService.show();
        return this._http.get(this.url + 'api/projects')
            .pipe(
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

    getProjectByName(name) {
        this.loaderService.show();
        return this._http.get(this.url + 'api/projectName/' + name).pipe(
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

    getProjectByUserName(userName) {
        this.loaderService.show();

        return this._http.get(this.url + 'api/projectUser/' + userName).pipe(
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

    getProjectById(idProject) {
        this.loaderService.show();
        return this._http.get(this.url + 'api/projectId/' + idProject).pipe(
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

    postProject(project) {
        const json = JSON.stringify(project);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.url + 'api/project', json, { headers: headers })
            .pipe(map(res => res.json()));
    }

    updateProject(project, idProject) {
        const json = JSON.stringify(project);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put(this.url + 'api/project/' + idProject, json, { headers: headers }).pipe(map(res => res.json()));
    }

    deleteProject(idProject) {
        return this._http.delete(this.url + 'api/project/' + idProject).pipe(map(res => res.json()));
    }

    deleteProjectByUser(user) {
        return this._http.delete(this.url + 'api/project/' + user).pipe(map(res => res.json()));
    }
}
