import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthService } from './auth.service';
import { API_SEARCH, API_ADD, API_ACCEPT } from './api';
import { API_GROUPJOIN } from './api';

@Injectable()
export class SearchService {

  constructor(
    public http: Http,
    public authService: AuthService
  ) {
  }
  // 搜索用户名或群组
  public getUserList(info) {
    if (info.email === null || info.range === null) {
      return Observable.throw('请输入用户名和范围！');
    } else {
      return this.http.post(API_SEARCH, info)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }
  // 添加好友
  public addFriend(id) {
    return this.http.post(API_ADD, {
      from: this.authService.userInfo.id,
      to: id
    }).map(this.extractData)
      .catch(this.handleError);
  }

  // 加入群组
  public joinGroup(id) {
    return this.http.post(API_GROUPJOIN, {
      from: this.authService.userInfo.id,
      to: id
    }).map(this.extractData)
      .catch(this.handleError);
  }

  public accetp(id) {
    return this.http.post(API_ACCEPT, {
      from: this.authService.userInfo.id,
      to: id
    }).map(this.extractData)
      .catch(this.handleError);
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
