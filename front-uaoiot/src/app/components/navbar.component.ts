import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserLoginService } from '../services/userLogin.service';
import { UserLogin } from '../models/userLogin';
import { MenuItem } from 'primeng/api';
import { TokenService } from '../services/token.service';
import { Message } from 'primeng/components/common/api';
import { windowWhen } from 'rxjs-compat/operator/windowWhen';

@Component({
    selector: 'app-nav-bar',
    templateUrl: '../views/navbar.component.html',
    styleUrls: ['../styles/navbar.component.scss'],
})

export class NavbarComponent implements OnInit {

    public display = false;
    public displayLogout = false;
    public isLogged: boolean;
    public userNameFromLogin;
    public stringUserName;
    public tokenString: String;
    public userLogged: UserLogin;
    public itemsProfile: MenuItem[];
    public msg: Message[] = [];
    
    constructor(
        public authService: AuthService,
        public userLoginService: UserLoginService,
        public tokenService: TokenService,
        public router: Router
    ) { }

    ngOnInit() {

        this.authService.getLoggedInName.subscribe(name => this.stringUserName = name);
        this.authService.getLoggedInUser.subscribe(user => this.userNameFromLogin = user);
        console.log(this.authService.getLoggedInUser.subscribe(user => this.userNameFromLogin = user))
        this.getUserName();
        this.getProfileSettings();
      
        
       
       

    }

    /**
    * Método para mostrar los mensajes de alerta.
    * @param severity  Severidad del mensaje (success, info, warn, error).
    * @param title Título del mensaje.
    * @param message Contenido del mensaje.
    */
    showToast(severity, title, message) {
        this.msg = [];
        this.msg.push({ severity: severity, summary: title, detail: message });
    }

    /**
     * Mostrar credenciales.
     */
    showCredentials() {
        this.getInfo();
        this.display = true;
    }

    /**
     * Obtener información del usuario.
     */
    getInfo() {
        this.authService.getLoggedInUser.subscribe(user => this.userNameFromLogin = user);
        this.tokenService.getTokenByUser(this.userNameFromLogin).subscribe(data => {
            const token = data.token[0];
            this.tokenString = token.value;
        }, Error => {
            this.showToast('error', 'Error', 'Error al consultar las credenciales.');
        });
    }

    /**
     * Copiar en el portapapeles.
     * @param inputElement Elemento html que contiene el texto.
     */
    copyToClipboard(inputElement) {
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
        this.showToast('info', 'Credenciales', 'Texto copiado en el portapapeles.');
    }

    /**
     * Obtener nombre del usuario actual.
     */
    getUserName() {
        this.stringUserName = '';
        if (sessionStorage.getItem('user') == null) {
            this.stringUserName = 'perfil';
        } else {
            const userProfile = JSON.parse(sessionStorage.getItem('user'));
            this.userNameFromLogin = userProfile.user;
            this.stringUserName = userProfile.name;

            
        }
    }

    getProfileSettings() {
      /*  const userProfile = JSON.parse(sessionStorage.getItem('user'));
        this.userNameFromLogin = userProfile.user;
        this.stringUserName = userProfile.name;*/

    //console.log(this.userNameFromLogin);
   /* if(this.userNameFromLogin==='admin') {
        this.itemsProfile = [
                    { label: 'Cerrar sesión', command: (onclick) => (this.displayLogout = true) }];
    }
    else{
        this.itemsProfile = [
            { label: 'Credenciales', command: (onclick) => { this.showCredentials(); } },
            { label: 'Cerrar sesión', command: (onclick) => (this.displayLogout = true) }];
    }*/
    this.itemsProfile = [
        { label: 'Credenciales', command: (onclick) => { this.showCredentials(); } },
        { label: 'Cerrar sesión', command: (onclick) => (this.displayLogout = true) }];
    }

    setNameNavbar() {
        const userProfile = JSON.parse(sessionStorage.getItem('user'));
        this.userNameFromLogin = userProfile.user;
        this.stringUserName = userProfile.name;
    }

    /**
     * Cerrar sesión.
     */
    logout() {
        this.displayLogout = false;
        this.authService.logout();
        this.router.navigate(['']);
       
        return false;
    }
}
