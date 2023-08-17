import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {
    if (localStorage.getItem('userToken') !== null) this.decodeToken();
  }

  userData = new BehaviorSubject(null);

  decodeToken() {
    const encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(encodedToken));
  }

  logout() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
  }
}
