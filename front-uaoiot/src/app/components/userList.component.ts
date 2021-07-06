import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { UserLoginService } from '../services/userLogin.service';
import { UserLogin } from '../models/userLogin';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { PermissionService } from '../services/permission.service';
import { ProjectService } from '../services/project.service';
import { DeviceService } from '../services/device.service';
import { Message } from 'primeng/components/common/api';

@Component({
    selector: 'userList',
    templateUrl: '../views/userList.component.html',
    styleUrls: ['../styles/userList.component.scss']
})

export class UserListComponent implements OnInit {

    users: UserLogin[];
    cols: any[];
    user: UserLogin;
    selectedUser: UserLogin;
    idUserToUpdate;
    userName: String;
    name: String;
    password: String;
    permission: String;
    readPermission: boolean;
    writePermission: boolean;
    displayUpdate = false;
    displayDelete = false;
    displayAdd = false;
    msg: Message[] = [];
    userToDelete;

    constructor(
        private _userService: UserLoginService,
        private validateService: ValidateService,
        private authService: AuthService,
        private userService: UserService,
        private permissionServie: PermissionService,
        private projectSevice: ProjectService,
        private deviceService: DeviceService
    ) {

        this.users = [];
    }

    ngOnInit() {

        this.readPermission = false;
        this.writePermission = false;

        this.cols = [
            { field: 'userName', header: 'Usuario' },
            { field: 'name', header: 'Nombre' }
        ];

        this.initUserList();


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
     * Inciar listadod de usuarios.
     */
    initUserList() {

        this.users = [];
        this._userService.getUsers().subscribe(
            result => {

                for (let i = 0; i < result.users.length; i++) {
                    const userItem = result.users[i];
                    this.user = new UserLogin(userItem._id, userItem.user, userItem.name, userItem.password);
                    this.users.push(this.user);

                }

                if (!this.users) {
                    this.showToast('info', 'No hay usuarios.', 'No se encontraron usuarios.');
                }
            },
            Error => {
                this.showToast('error', 'Error', 'Error al consultar los usuarios.');
            }
        );
    }

    /**
     * Agregar un usuario.
     */
    addUser() {
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
            return false;
        }

        this._userService.postUser(userLogin).subscribe(data => { }, Error => { });
        this.userService.postUser(user).subscribe(data => {
            this.showToast('success', 'Creado', 'Usuario creado exitosamente.');
            this.initUserList();
            this.displayAdd = false;
        }, Error => {
            this.showToast('error', 'Error', 'Error al crear el usuario.');
        });
    }

    /**
     * Actualizar usuario.
     */
    updateUser() {

        const userJson = {
            user: this.userName,
            name: this.name,
        };
        this._userService.updateUser(userJson, this.idUserToUpdate).subscribe(data => {
            this.showToast('success', 'Actualizado', 'Usuario actualizado exitosamente.');
            this.initUserList();
            this.displayUpdate = false;
        }, Error => {
            this.showToast('error', 'Error', 'Error al actualizar el usuario.');
            this.displayUpdate = false;
        });
    }

    /**
     * Eliminar proyectos del dispositivo actual.
     * @param user Usuario.
     */
    deleteProject(user) {
        this.projectSevice.deleteProjectByUser(user).subscribe(data => { }, Error => { });
    }

    /**
     * Eliminar dispositovos del usuario actual.
     * @param user Usuario
     */
    deleteDevices(user) {
        this.deviceService.deleteDeviceByUser(user).subscribe(data => { }, Error => { });
    }

    /**
     * Eliminar usuario.
     */
    deleteUser() {
        this.userService.deleteUser(this.userToDelete).subscribe(data => {

            this._userService.deleteUser(this.userToDelete).subscribe(data1 => {

                this.initUserList();
                this.showToast('success', 'Eliminado', 'Usuario eliminado exitosamente.');
                this.displayDelete = false;
                this.projectSevice.deleteProjectByUser(this.userToDelete).subscribe(data2 => { }, Error => { });
            }, Error => {
                this.showToast('error', 'Error', 'Error al aliminar el usuario.');
            });

        }, Error => {
            this.showToast('error', 'Error', 'Error al aliminar el usuario.');
        });
    }

    showDialogAddUser() {
        this.displayAdd = true;
        this.userName = '';
        this.name = '';
        this.password = '';
    }

    showDialogEditUser(user) {
        this.displayUpdate = true;
        this.idUserToUpdate = user.id;
        this.userToDelete = user.userName;
        this.userName = user.userName;
        this.name = user.name;
        this.password = user.password;
    }

    showDialogDeleteUser(user) {
        this.userToDelete = user.userName;
        this.displayDelete = true;
    }
}
