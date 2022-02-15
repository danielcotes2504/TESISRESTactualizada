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
    userName: String="";
    name: String="";
    password: String="";
    newPassword: String ="";
    permission: String;
    readPermission: boolean;
    writePermission: boolean;
    displayUpdate = false;
    displayDelete = false;
    displayAdd = false;
    msgs: Message[] = [];
    msg: Message[] = [];
    counter:number=0;
    userToDelete;
    clickable = true;

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

      // Only AlphaNumeric with Some Characters [-_ ]
  keyPressAlphaNumericWithCharacters(event) {
   
    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, alpahbets, space, underscore
    if (/[a-zA-Z0-9-_ ]/.test(inp)) {
       
      return true;
      
    } else {
        (async () => { 
          
            // Do something before delay
            if(this.counter<=0){
                this.showCharacterError();
            }
            this.counter++;       
    
            await this.delay(2000);
    
            // Do something after
             this.hide();
        })();
      event.preventDefault();
      
    
      return false;
    }
    
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

    show() {
        this.msgs.push({
          severity: "error",
          summary: "No se ingresó el nombre, usuario o contraseña",
        });
      }
      show2() {
        this.msgs.push({
          severity: "error",
          summary: "No se ingresó la contraseña",
        });
      }
      hide(){
          this.msgs=[]
          this.counter=0;
      }
    
      showCharacterError() {
        this.msgs.push({
          severity: "error",
          summary: "Solo se permiten caracteres especiales en la contraseña",
        });
    
      
      }
      showLongName() {
        this.msgs.push({
            severity: 'error',
            summary: 'El nombre, usuario o contraseña es demasiado largo'
        });
    }
    showLongPassword() {
        this.msgs.push({
            severity: 'error',
            summary: 'La contraseña es demasiado larga'
        });
    }
    /**
     * Agregar un usuario.
     */
    addUser() {
     /*   if(this.clickable==true){
            this.clickable =false;
        if (this.readPermission && this.writePermission) {
            this.permission = 'READWRITE';
        } else if (this.readPermission) {
            this.permission = 'READ';
        } else if (this.writePermission) {
            this.permission = 'WRITE';
        }*/

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

      
      /*  if (!this.validateService.validateEmail(user.login)) {
            return false;
        }*/

    if (this.userName !== "" && this.name !== "" && this.password !== "") {
        if(this.userName.length<=30 && this.name.length<=30) {
       
            this.clear();
            this._userService.postUser(userLogin).subscribe(data => { }, Error => { });
            this.userService.postUser(user).subscribe(data => {
                this.showToast('success', 'Creado', 'Usuario creado exitosamente.');
                this.initUserList();
                this.displayAdd = false;
            }, Error => {
                this.showToast('error', 'Error', 'Error al crear el usuario.');
            });
        }
        else{
            (async () => { 
          
                // Do something before delay
                if(this.counter<=0){
                    this.showLongName();
                }
                this.counter++;       
        
                await this.delay(2000);
        
                // Do something after
                 this.hide();
            })();
        }

    
    } else {
        (async () => { 
          
            // Do something before delay
            if(this.counter<=0){
                this.show();
            }
            this.counter++;       
    
            await this.delay(2000);
    
            // Do something after
             this.hide();
        })();
    }



 
   // }
    }

    /**
     * Actualizar usuario.
     */
    updateUser() {
       
        const userJson = {
            password: this.newPassword
                     
        };

        if (this.newPassword !== "") {
            if(this.newPassword.length<=30) {
           
                this.clear();
                this._userService.updateUser(userJson, this.idUserToUpdate).subscribe(data => {
                    this.showToast('success', 'Actualizado', 'Usuario actualizado exitosamente.');
                    this.initUserList();
                    this.newPassword = " ";
                    this.displayUpdate = false;
                    
                }, Error => {
                    this.showToast('error', 'Error', 'Error al actualizar el usuario.');
                    this.displayUpdate = false;
                });
            }
            else{
                (async () => { 
              
                    // Do something before delay
                    if(this.counter<=0){
                        this.showLongPassword()
                    }
                    this.counter++;       
            
                    await this.delay(2000);
            
                    // Do something after
                     this.hide();
                })();
            }
    
        
        } else {
            (async () => { 
              
                // Do something before delay
                if(this.counter<=0){
                    this.show2();
                }
                this.counter++;       
        
                await this.delay(2000);
        
                // Do something after
                 this.hide();
            })();
        }
        
       
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
                //this.projectSevice.deleteProjectByUser(this.userToDelete).subscribe(data2 => { }, Error => { });
            }, Error => {
                this.showToast('error', 'Error', 'Error al aliminar el usuario.');
            });

        }, Error => {
            this.showToast('error', 'Error', 'Error al aliminar el usuario.');
        });
    }

    showDialogAddUser() {
        this.clickable= true;
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
        this.password = " ";
    }

    showDialogDeleteUser(user) {
        this.userToDelete = user.userName;
        this.displayDelete = true;
    }
    clear() {
        this.displayAdd=false;
        this.displayUpdate=false;
       // this.displayNewProject = false;
        this.msgs = [];
      }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
}
