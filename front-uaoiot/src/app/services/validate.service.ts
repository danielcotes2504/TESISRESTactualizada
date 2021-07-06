import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.login === undefined || user.name === undefined || user.password === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(user) {
    /*const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[
      0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re)
    console.log(re.test(user))
    return re.test(user);*/

    return true;

  }
}
