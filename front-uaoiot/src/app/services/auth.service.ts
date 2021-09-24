import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { map } from 'rxjs/operators';
// import { Observable, Subject } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tokenNotExpired } from 'angular2-jwt';
//Al cerrar la ventana se eliminará cualquier dato del usuario logueado
/*window.addEventListener('unload', (event) => {
    window.sessionStorage.clear();
  });*/

@Injectable()

export class AuthService {
    authToken: any;
    token: String;
    user: any;
    url: String;
    name: String;
    public getLoggedInName = new Subject();
    public getLoggedInUser = new Subject();

    constructor(private http: Http, private router: Router, private _http: HttpClient) {
        this.url = environment.baseUrl;
    }

    /**
     * Registrar un usuario.
     * @param user Json con los datos del usuario.
     */
    public registerUser(user) {
        const json = JSON.stringify(user);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.url + 'api/register', json, { headers: headers }).pipe(map(res => res.json()));
    }

    /**
     * Autenticar un usuario en el inicio de sesión.
     * @param user Usuario ingresado.
     */
    public authenticateUser(user) {
        const json = JSON.stringify(user);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.url + 'api/auth', user, { headers: headers })
            .pipe(map(res => {
                if (res.json().success) {
                    this.getLoggedInName.next(res.json().user.name);
                    this.getLoggedInUser.next(res.json().user.user);
                } else {
                    this.getLoggedInName.next('Sign In');
                }
                return res.json();
            }));

    }


    public getProfile() {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get('userlogins/profile', { headers: headers })
            .pipe(map(res => res.json()));
    }

    /**
     * Guardarr datos en el local storage del navegador.
     * @param token Token de inicio de sesión.
     * @param user  Usuario ingresado.
     */
    public storeUserData(token, user) {
        sessionStorage.setItem('id_token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }

    public storeSelectedProtocol(protocol) {
        sessionStorage.setItem('protocol', protocol);
    }


    public loadToken() {
        const token = sessionStorage.getItem('id_token');
        this.authToken = token;
    }

    /**
     * Obtener token de inicio de sesión.
     */
    public getToken() {
        if (!this.token) {
            this.token = sessionStorage.getItem('id_token');
        }

        return this.token;
    }

    public setName(value) {
        this.name = value.name;
    }

    public getName() {
        if (!this.name) {
            this.name = JSON.parse(sessionStorage.getItem('user')).name;
        }
        return this.token;
    }

    public getUserDetails() {
        const token = this.getToken();
        let payload;

        if (token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        } else {
            return null;
        }
    }

    /**
     * Verificar si el administrador está logueado.
     */
    public isAdminLoggedIn() {
        const user = this.getUserDetails();
        if (this.loggedIn()) {
            if (user.data.user === 'admin') {
                sessionStorage.setItem('admin', 'true');
                return true;
                
            }
        } else {
            sessionStorage.setItem('admin', 'false');
            return false;
        }
    }
    /**
     * Verificar si el protocolo es REST
     */
    public isRestProtocol() {
        const protocol = sessionStorage.getItem('protocol');
        if (protocol === 'REST') {
            return true;
        } else {
            return false;
        }
    }
    /**
     * Verificar si el protocolo es MQTT
     */
    public isMqttProtocol() {
        const protocol = sessionStorage.getItem('protocol');
        if (protocol === 'MQTT') {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Verificar si existe alguien logueado.
     */
    public loggedIn() {
        const user = this.getUserDetails();
        if (user && sessionStorage.getItem('id_token')) {
                        return user.exp > Date.now() / 1000, true;
            
           // return true;
        } else {
            this.getLoggedInName.next('Sign In');
            return false;
        }
      
        
    }

    /**
     * Cerrar sesión.
     */
    public logout() {
        this.getLoggedInName.next('Sign In');
        this.authToken = null;
        this.user = null;
        this.token = null;
        sessionStorage.clear();
        this.router.navigate(['']);
    }

    
}
