import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthService } from './auth.service';
import { API_FRIEND } from './api';
import { API_GROUP } from './api';
import { API_GROUPCTEATE } from './api';

@Injectable()
export class ListService {
  public friendList = [];
  public groupList = [];

  constructor(
    public http: Http,
    public authService: AuthService
  ) { }

  // 获取好友列表
  public getFriendList() {
    return this.http.post(API_FRIEND, {
      id: this.authService.userInfo.id,
    }).map(this.extractData)
      .catch(this.handleError);
  }

  // 获取群组列表
  public getGroupList() {
    return this.http.post(API_GROUP, {
      _id: this.authService.userInfo.id,
    }).map(this.extractData)
      .catch(this.handleError);
  }

  // 创建群组
  public creatGroup(name) {
    return this.http.post(API_GROUPCTEATE, {
      name: name,
      creator: this.authService.userInfo.id,
    }).map(this.extractData)
      .catch(this.handleError);
  }

  public extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  public handleError(error: Response | any) {
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
