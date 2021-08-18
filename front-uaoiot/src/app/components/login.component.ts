import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SelectItem } from 'primeng/components/common/api';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { NavbarComponent } from './navbar.component';



@Component({
    selector: 'app-login',
    templateUrl: '../views/login.component.html',
    styleUrls: ['../styles/login.component.scss'],
    providers: [MessageService, NavbarComponent]
})

export class LoginComponent implements OnInit {

    public userName: String;
    public userPassword: String;
    public msgs: Message[] = [];
    public isLogged: boolean;
    public stringName: String;
    public protocolOptions: SelectItem[];
    public selectedProtocol: String= 'REST';

    constructor(
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService,
        private navbar: NavbarComponent
    ) {
        this.protocolOptions = [{ label: 'REST', value: 'REST' }, { label: 'MQTT', value: 'MQTT' }];
    }

    ngOnInit() {
        if (this.authService.loggedIn()) {
            if (this.authService.isAdminLoggedIn()) {
                this.router.navigate(['/admin']);
            } else {
                this.router.navigate(['/projects']);
            }
        }
    }




    
    /**
     * Autenicación del inicio de sesión.
     */
    onLoginSubmit() {
        const user = {
            user: this.userName,
            password: this.userPassword,
        };
        let protocol = this.selectedProtocol;
        if (protocol === undefined) {
            protocol = 'MQTT';
        } else {
            protocol = protocol;
        }

        this.authService.authenticateUser(user).subscribe(data => {
            if (data.success) {
                this.authService.storeUserData(data.token, data.user);
                this.authService.storeSelectedProtocol(protocol);
                if (this.authService.isAdminLoggedIn()) {
                    this.router.navigate(['/admin']);
                } else if (protocol === 'REST') {
                    this.router.navigate(['/restProjects']);
                } else {
                    const dataUserItem = data.user;
                    this.stringName = dataUserItem;
                    this.router.navigate(['/projects']);
                }
            } else {
                this.showError();
                this.router.navigate(['']);
            }
            this.navbar.getUserName();
        });
    }

    showError() {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Datos incorrectos', detail: 'Validación fallida' });
       
    }
}
