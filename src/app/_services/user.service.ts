import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { appConfig } from '../app.config';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        console.log("user local storage value is",user);
        //const currentUser = JSON.parse(user._body);
        // let headers = new HttpHeaders;
        // headers.append('Content-Type', 'application/json');
        // headers.append('x-auth-header',user.token)
        // const httpOptions = {
        //     headers: headers
        //     };
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': user.token
            })
          };
        //let options = new RequestOptions({headers: headers});
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
        //const currentUser = JSON.parse(user._body);
        // let headers = new HttpHeaders;
        // headers.append('Content-Type', 'application/json');
        // headers.append('x-auth-header',currentUser.token);
        // const httpOptions = {
        //     headers: headers
        //     };
        //let options = new RequestOptions({headers: headers});
        return this.http.get(appConfig.apiUrl + '/users/' + _id, httpOptions);
    }

    create(user: User) {
        return this.http.post(appConfig.apiUrl + '/users/register', user);
    }

    sendMail(name: string){
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const currentUser = JSON.parse(user._body);
        let headers = new HttpHeaders;
        var obj = {};
        obj['opname'] = name;
        obj['email'] = currentUser.email;
        headers.append('Content-Type', 'application/json');
        headers.append('x-auth-header',currentUser.token);
        const httpOptions = {
            headers: headers
            };
        //let options = new RequestOptions({headers: headers});
        return this.http.post(appConfig.apiUrl + '/users/sendemail', obj, httpOptions); 
    }

    update(user: User) {
        const user1 = JSON.parse(localStorage.getItem('currentUser'));
        const currentUser = JSON.parse(user1._body);
        let headers = new HttpHeaders;
        headers.append('Content-Type', 'application/json');
        headers.append('x-auth-header',currentUser.token);
        const httpOptions = {
            headers: headers
            };
        //let options = new RequestOptions({headers: headers});
        return this.http.put(appConfig.apiUrl + '/users/' + user._id, user, httpOptions);
        // return this.http.put(appConfig.apiUrl + '/users/' + user._id, user, httpOptions).map(this.extractData);
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