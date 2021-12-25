import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baserurl } from '../shared/constants'; 
@Injectable({
  providedIn: 'root'
})
export class BusinesslogicService {
  baseurl = baserurl;
  constructor(public httpclient:HttpClient) { }
  getsettingdata(){
    return this.httpclient.get(this.baseurl+'getSettings')
  }
  addsettings(data) {
    return this.httpclient.post(this.baseurl+'addSettingsmultiple',data);
  }
  updatesettings(data) {
    return this.httpclient.post(this.baseurl+'editSettingsmultiple',data);
  }
  deletesettings(data) {
    return this.httpclient.post(this.baseurl+'deleteSettingsmultiple',data);
  }
  addstocks(data) {
    return this.httpclient.post(this.baseurl+'addstocks',data);
  }
  getlatesttransactions(data) {
    return this.httpclient.post(this.baseurl+'gettransactions',data);
  }
  getSettingsall() {
    return this.httpclient.get(this.baseurl+'getSettingsall');
  }
  deleterecord(data) {
    return this.httpclient.post(this.baseurl+'deletetransactionbyid',data);
  }
}
