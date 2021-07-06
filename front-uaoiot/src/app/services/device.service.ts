import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
// import {Observable} from 'rxjs/Rx';
import { map, filter } from 'rxjs/operators';


@Injectable()

export class DeviceService {

    public url: string;

    constructor(private _http: Http) {
        this.url = environment.baseUrl;
    }

    /**
     *
     * @param userName
     */
    getDeviceByUserName(userName) {
        return this._http.get(this.url + 'api/deviceuser/' + userName).pipe(map(res => res.json()));
    }

    /**
     *
     * @param project
     */
    getDeviceByProject(project) {
        return this._http.get(this.url + 'api/deviceproject/' + project).pipe(map(res => res.json()));
    }

    /**
     *
     * @param device
     */
    postDevice(device) {
        const json = JSON.stringify(device);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.url + 'api/device', json, { headers: headers })
            .pipe(map(res => res.json()));
            console.log("dispositivo creado");
    }

    /**
     *
     * @param device
     * @param idDevice
     */
    updateDevice(device, idDevice) {
        const json = JSON.stringify(device);
        const headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this._http.put(this.url + 'api/device/' + idDevice, json, { headers: headers }).pipe(map(res => res.json()));
    }

    /**
     *
     * @param idDevice
     */
    deleteDevice(idDevice) {
        return this._http.delete(this.url + 'api/device/' + idDevice).pipe(map(res => res.json()));
    }

    /**
     *
     * @param project
     */
    deleteDevicetByProject(project) {
        return this._http.delete(this.url + 'api/device/' + project).pipe(map(res => res.json()));
    }

    /**
     *
     * @param user
     */
    deleteDeviceByUser(user) {
        return this._http.delete(this.url + 'api/device/' + user).pipe(map(res => res.json()));
    }
}
