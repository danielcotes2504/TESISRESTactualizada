import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { UserLoginService } from '../services/userLogin.service';
@Component({
    selector: 'app-rest-documents',
    templateUrl: '../views/restDocuments.component.html',
    styleUrls: ['../styles/restDocuments.component.scss']
})
export class RestDocumentsComponent implements OnInit {
    postURL: string;
    getURL: string;
    host: string;
    port: string;
    postParameter: string= "/[Usuario]/[Proyecto]/[Dispositivo]/[Variable]/[Token de usuario]";
    getParameter: string ="/[Usuario]/[Proyecto]/[Dispositivo]/[Variable]";
    public userNameFromLogin;
    public stringUserName;
    constructor(private router: Router, public authService: AuthService,
        public userLoginService: UserLoginService) { }

    ngOnInit() {
        this.authService.getLoggedInName.subscribe(name => this.stringUserName = name);
        this.authService.getLoggedInUser.subscribe(user => this.userNameFromLogin = user);
        console.log(this.authService.getLoggedInUser.subscribe(user => this.userNameFromLogin = user))
        this.getUserName();
        console.log(this.userNameFromLogin)
      if(this.userNameFromLogin === "admin"){
        this.router.navigate(['/admin']);
      }

        this.postURL = environment.restUrl+ this.postParameter;
        this.getURL = environment.restUrl+ this.getParameter;
        const words = environment.restUrl.split("/");
        const hostPort= words[2].split(":");
        this.host= hostPort[0];
        this.port= hostPort[1];
        
    }

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
}
