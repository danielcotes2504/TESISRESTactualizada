import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ValueModel {
    user: string;
    project: string;
    deviceN: string;
    deviceH: string;
    variableN: string;
    variableT: string;
    variableInd: string;
    operation: string;
    constant: number;
    value: number;
    positive: number;
    negative: number;
    date: Date;
}

export interface VariableModel {
    user: string;
    project: string;
    deviceN: string;
    deviceH: string;
    variableInd: string;
    constant: number;
    operation: string;
    variableN: string;
    variableT: string;
    positive: number;
    negative: number;
}

export interface DeviceModel {
    user: string;
    project: string;
    deviceN: string;
    deviceH: string;
}

export interface ProjectModel {
    user: string;
    project: string;
}

export interface UserModel {
    user: string;
}

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    setNavigationType(value: string) {
        localStorage.set('navigation', value);
    }

    getNavigationType(): string {
        return localStorage.getItem('navigation');
    }

    setCurrentUser(value: string) {
        sessionStorage.setItem('user', value);
    }

    getCurrentUser(): string {
        /*  return sessionStorage.get('user'); */
        return JSON.parse(localStorage.getItem('user')).user;
    }

    setCurrentProject(value: string) {
        sessionStorage.setItem('project', value);
    }

    getCurrentProject(): string {
        return sessionStorage.getItem('project');
    }

    setCurrentVariable(value: VariableModel) {
        sessionStorage.setItem('variable', JSON.stringify(value));
    }

    getCurrentVariable(): VariableModel {
        return JSON.parse(sessionStorage.getItem('variable'));
    }

    setCurrentDevice(value: DeviceModel) {
        sessionStorage.setItem('device', JSON.stringify(value));
    }

    getCurrentDevice(): DeviceModel {
        return JSON.parse(sessionStorage.getItem('device'));
    }

    setCurrentChartType(value: string) {
        sessionStorage.setItem('chartType', value);
    }

    getCurrentChartType(): string {
        return sessionStorage.getItem('chartType');
    }

    setCurrentTimeScale(value: string) {
        sessionStorage.setItem('timeScale', value);
    }

    getCurrentTimeScale(): string {
        return sessionStorage.getItem('timeScale');
    }

    getProjects(projectURL: string): Observable<HttpResponse<ProjectModel[]>> {
        return this.http.get<ProjectModel[]>(projectURL, { observe: 'response' })
            .pipe(
                catchError(this.handleError)
            );
    }

    updateProject(project: ProjectModel, projectURL: string): Observable<HttpResponse<ProjectModel>> {
        return this.http.put<HttpResponse<ProjectModel>>(projectURL, project, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    addProject(project: ProjectModel, projectURL: string): Observable<HttpResponse<ProjectModel>> {
        return this.http.post<HttpResponse<ProjectModel>>(projectURL, project, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    getDevices(deviceURL: string): Observable<HttpResponse<DeviceModel[]>> {
        return this.http.get<DeviceModel[]>(deviceURL, { observe: 'response' })
            .pipe(
                catchError(this.handleError)
            );
    }

    addDevice(device: DeviceModel, deviceURL: string): Observable<HttpResponse<DeviceModel>> {
        return this.http.post<HttpResponse<DeviceModel>>(deviceURL, device, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateDevice(device: DeviceModel, deviceURL: string): Observable<HttpResponse<DeviceModel>> {
        return this.http.put<HttpResponse<DeviceModel>>(deviceURL, device, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    getVariables(variableURL: string): Observable<HttpResponse<VariableModel[]>> {
        return this.http.get<VariableModel[]>(variableURL, { observe: 'response' })
            .pipe(
                catchError(this.handleError)
            );
    }

    addVariable(variable: VariableModel, variableURL: string): Observable<HttpResponse<VariableModel>> {
        return this.http.post<HttpResponse<VariableModel>>(variableURL, variable, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateVariable(variable: VariableModel, variableURL: string): Observable<HttpResponse<VariableModel>> {
        return this.http.put<HttpResponse<VariableModel>>(variableURL, variable, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    getValues(valueURL: string): Observable<HttpResponse<ValueModel[]>> {
        return this.http.get<ValueModel[]>(valueURL, { observe: 'response' })
            .pipe(
                catchError(this.handleError)
            );
    }

    delete(deviceURL: string): Observable<HttpResponse<{}>> {
        return this.http.delete<HttpResponse<{}>>(deviceURL, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }

}
