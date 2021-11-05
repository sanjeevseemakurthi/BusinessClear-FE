import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import {baserurl} from './constants'
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseurl = baserurl;
  constructor(public httpreq:HttpClient) { }
  login(email, password) {
    let data = {
      login: email,
      password: password,
    };
    return this.httpreq.post(this.baseurl + '/login',data);
  }
}
