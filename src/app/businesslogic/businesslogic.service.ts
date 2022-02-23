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
  updaterecord(data) {
    return this.httpclient.post(this.baseurl+'editstocks',data);
  }
  // analyticspage 
  getstocksbyamount(data) {
    return this.httpclient.post(this.baseurl+'getstockbyamount',data);
  }
  getstocksbyqty(data) {
    return this.httpclient.post(this.baseurl+'getstockbyqty',data);
  }
  getperson(){
    return this.httpclient.get(this.baseurl+'getperson')
  }
  getpersonfinance(data){
    return this.httpclient.post(this.baseurl+'getpersonfinance',data);
  }
  getpersonstocks(data){
    return this.httpclient.post(this.baseurl+'getpersonstocks',data);
  }
  getpersonlent(data) {
    return this.httpclient.post(this.baseurl+'getpersonlent',data);
  }
  updatepersondetials(data){
    return this.httpclient.post(this.baseurl+'addnewperson',data);
  }
  addnewpersonfin(data){
    return this.httpclient.post(this.baseurl+'addnewpersonfin',data);
  }
  addnewpersonlent(data) {
    return this.httpclient.post(this.baseurl+'addnewpersonlent',data);
  }
  addnewperson(data){
    return this.httpclient.post(this.baseurl+'addnewperson',data);
  }
  addfintoexistingpeople(data) {
    return this.httpclient.post(this.baseurl+'addfintoexistingpeople',data);
  }
  addlenttoexistingpeople(data) {
    return this.httpclient.post(this.baseurl+'addlenttoexistingpeople',data);
  }
  getexpense(data){
    return this.httpclient.post(this.baseurl+'getexpense',data);
  }
  addexpense(data) {
    return this.httpclient.post(this.baseurl+'addexpense',data);
  }
  addnewpersion(data) {
    return this.httpclient.post(this.baseurl+'addnewperson',data);
  }
}
