import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
// import { Observable } from 'rxjs/Rx';
// import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';

@Injectable()

export class ChartService {

    public url: string;

    constructor(private _http: Http) {
        this.url = environment.baseUrl;
    }

    /**
     * Obtener las gráficas de un proyecto.
     * @param projectId ID del proyecto seleccionado.
     */
    getChartByProject(projectId) {
        return this._http.get(this.url + 'api/chartproject/' + projectId).pipe(map(res => res.json()));
    }

    /**
     * Crear una gráfica.
     * @param chart Atributos de la gráfica a crear.
     */
    postChart(chart) {
        const json = JSON.stringify(chart);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.url + 'api/chart', json, { headers: headers })
            .pipe(map(res => res.json()));
    }

    /**
     * Eliminar gráficas de un proyecto específico.
     * @param project Proyecto seleccionado.
     */
    deleteChartsByProject(project) {
        return this._http.delete(this.url + 'api/chart/' + project).pipe(map(res => res.json()));
    }

    /**
     * Eliminar una gráfica.
     * @param chartId ID de la gráfica a eliminar.
     */
    deleteChartsById(chartId) {
        return this._http.delete(this.url + 'api/chartById/' + chartId).pipe(map(res => res.json()));
    }
}
