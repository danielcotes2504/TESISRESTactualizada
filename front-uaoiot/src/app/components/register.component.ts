import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserLogin } from '../models/userLogin';
import { UserService } from '../services/user.service';
import { PermissionService } from '../services/permission.service';
import { UserLoginService } from '../services/userLogin.service';
import { Message } from 'primeng/components/common/api';

@Component({
    selector: 'app-register',
    templateUrl: '../views/register.component.html',
    styleUrls: ['../styles/register.component.scss']
})

export class RegisterComponent implements OnInit {

    userName: String;
    name: String;
    password: String;
    permission: String;
    readPermission: boolean;
    writePermission: boolean;
    public msg: Message[] = [];
    // user:UserLogin;

    constructor(
        private validateService: ValidateService,
        private authService: AuthService,
        private userService: UserService,
        private permissionServie: PermissionService,
        private userLoginService: UserLoginService,
        private router: Router
    ) {

    }

    ngOnInit() {
        this.readPermission = false;
        this.writePermission = false;
        this.authService.getProfile().subscribe(data => {
            console.log(data.user);
        });
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
     * Registrar un usuario creando sus credenciales para acceso y conexión.
     */
    onRegisterSubmit() {
        if (this.readPermission && this.writePermission) {
            this.permission = 'READWRITE';
        } else if (this.readPermission) {
            this.permission = 'READ';
        } else if (this.writePermission) {
            this.permission = 'WRITE';
        }

        const userLogin = {
            user: this.userName,
            name: this.name,
            password: this.password
        };

        const user = {
            login: this.userName,
            password: this.password,
            name: this.name
        };

        const permission = {
            user: user.login,
            topic: 'test1',
            permission: this.permission
        };

        if (!this.validateService.validateEmail(user.login)) {
            this.showToast('warn', 'Invalido', 'Ingrese un usuario valido.');
            return false;
        }
        this.userLoginService.postUser(userLogin).subscribe(data => { }, Error => { });
        this.userService.postUser(user).subscribe(data => {
            this.showToast('success', 'Usuario creado', 'Usuario creado exitosamente.');
        }, Error => {
            this.showToast('error', 'Error', 'Error al crear el usuario.');
        });

        this.permissionServie.postPermission(permission).subscribe(data => { }, Error => { });
    }

}
