import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthService } from './auth.service';
import { API_Friend } from './api';

@Injectable()
export class ListService {
  public friendList = [];

  constructor(
    public http: Http,
    public authService: AuthService
  ) {
  }

  // 获取好友列表
  public getFriendList() {
    const getFriendList = this.http.post(API_Friend, {
      id: this.authService.userInfo.id,
    }).map(this.extractData)
      .catch(this.handleError);
    getFriendList.subscribe(
      succ => { this.friendList = succ.list; console.log(this.friendList); },
      err => console.log(err),
    );
    return getFriendList;
  }

  private extractData(res: Response) {
    const body = res.json();
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
