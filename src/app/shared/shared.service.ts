import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import {baserurl} from './constants';
import *  as filesaver from 'file-saver';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseurl = baserurl;
  constructor(public httpreq:HttpClient) { }
  login(email, password) {
    let data = {
      username: email,
      password: password,
    };
    return this.httpreq.post(this.baseurl + 'authenticate ',data);
  }
  fileupload(url,payload) {
    return this.httpreq.post(this.baseurl + url, payload);
  }
  filedownload(url) :Observable<string> {
    return this.httpreq.get(this.baseurl + url,{ responseType: 'text'});
  }
  downloadfile(res: any){
    const blob = new Blob([res],{type:'text/csv'});
    filesaver.saveAs(blob, "template.csv")
  }
  getperson(){
    return this.httpreq.get(this.baseurl+'getperson')
  }
  getsettingdata(){
    return this.httpreq.get(this.baseurl+'getSettings')
  }
  addstocks(data) {
    return this.httpreq.post(this.baseurl+'addstocks',data);
  }
  addlenttoexistingpeople(data) {
    return this.httpreq.post(this.baseurl+'addlenttoexistingpeople',data);
  }
}
