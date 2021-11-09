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
    return this.httpclient.get(this.baseurl+'settings_data')
  }
}
