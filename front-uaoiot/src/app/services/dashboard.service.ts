import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
// import { Observable } from 'rxjs/Rx';
import { map, filter } from 'rxjs/operators';


@Injectable()

export class DashboardService {

    public url: string;

    constructor(private _http: Http) {
        this.url = environment.baseUrl;
    }

    getDashboardByUser(userName) {
        return this._http.get(this.url + 'api/dashboarduser/' + userName).pipe(map(res => res.json()));
    }

    getDashboardByProject(projectId) {
        return this._http.get(this.url + 'api/dashboardproject' + projectId).pipe(map(res => res.json()));
    }

    postDashboard(dashboard) {
        const json = JSON.stringify(dashboard);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.url + 'api/dashboard', json, { headers: headers })
            .pipe(map(res => res.json()));
    }
}
