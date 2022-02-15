import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { UserLoginService } from '../services/userLogin.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-tutorial-admin',
    templateUrl: '../views/tutorialAdmin.component.html',
    styleUrls: ['../styles/tutorialAdmin.component.scss']
})

export class TutorialAdminComponent implements OnInit {
    public userNameFromLogin;
    public stringUserName;
    constructor(
        public authService: AuthService,
        public userLoginService: UserLoginService,
        public router: Router
    ) {

    }
    ngOnInit() {

        this.authService.getLoggedInName.subscribe(name => this.stringUserName = name);
        this.authService.getLoggedInUser.subscribe(user => this.userNameFromLogin = user);
        console.log(this.authService.getLoggedInUser.subscribe(user => this.userNameFromLogin = user))
        this.getUserName();
        console.log(this.userNameFromLogin)
      if(this.userNameFromLogin !== "admin"){
        this.router.navigate(['/restProjects']);
      }
        
       
       

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