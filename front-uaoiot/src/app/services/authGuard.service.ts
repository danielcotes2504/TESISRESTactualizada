import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()

export class AuthGuardService implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate() {
        if (!this.auth.loggedIn()) {
            this.router.navigate(['/login']);
            return false;
        } else {
            return true;
        }
    }
}
