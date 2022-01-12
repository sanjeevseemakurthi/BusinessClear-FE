import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, public sharedservice: SharedService) { }
  filedata:any;

  ngOnInit(): void {
  }
  fileChange(event){
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      let formData:FormData = new FormData();
      formData.append('file', file, file.name);
      this.filedata = formData;
    }
  }
  uploadfile() {
    this.sharedservice.fileupload(this.data.url,this.filedata).subscribe(res=> {
      console.log(res, "uploadedsucess")
    },err =>{
      console.log("fail");
    });
  }
  downloadtemplate(){
    this.sharedservice.filedownload(this.data.templateurl).subscribe(res=> {
      console.log(res);
      this.sharedservice.downloadfile(res);
      console.log(res, "downloadsucess")
    },err =>{
    
    });
  }
}
