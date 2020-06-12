import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { appConfig } from '../app.config';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': user.token
            })
          };
        return this.http.get(appConfig.apiUrl + '/users', httpOptions);
    }

    getById(_id: string) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': user.token
            })
          };
        return this.http.get(appConfig.apiUrl + '/users/' + _id, httpOptions);
    }

    create(user: User) {
        return this.http.post(appConfig.apiUrl + '/users/register', user);
    }

    sendMail(name: string){
        const user = JSON.parse(localStorage.getItem('currentUser'));
        //const currentUser = JSON.parse(user._body);
        //let headers = new HttpHeaders;
        var obj = {};
        obj['opname'] = name;
        obj['email'] = user.email;
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': user.token
            })
        };
        // headers.append('Content-Type', 'application/json');
        // headers.append('x-auth-header',currentUser.token);
        // const httpOptions = {
        //     headers: headers
        //     };
        //let options = new RequestOptions({headers: headers});
        return this.http.post(appConfig.apiUrl + '/users/sendemail', obj, httpOptions); 
    }

    update(user: User) {
        const user1 = JSON.parse(localStorage.getItem('currentUser'));
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': user1.token
            })
          };
        return this.http.put(appConfig.apiUrl + '/users/' + user1._id, user1, httpOptions);
    }

    delete(_id: string) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const currentUser = JSON.parse(user._body);
        let headers = new HttpHeaders;
        headers.append('Content-Type', 'application/json');
        headers.append('x-auth-header',currentUser.token)
        const httpOptions = {
            headers: headers
            };
        //let options = new RequestOptions({headers: headers});
        return this.http.delete(appConfig.apiUrl + '/users/' + _id, httpOptions);
    }
}