import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { API_LOGIN } from '../api'
import { API_REGISTER } from '../api'

export interface User {
  username: string;
  password: string
}

@Injectable()
export class AuthService {
  private currentUser: User;

  constructor(public http: Http) {
  }

  public isLogin() {
    return this.http
      .get(API_LOGIN)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public login(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw('Please insert credentials');
    } else {
      return this.http
        .post(API_LOGIN, credentials)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  public register(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return this.http
        .post(API_REGISTER, credentials)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
