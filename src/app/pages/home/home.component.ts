import { Component, OnInit } from '@angular/core';
import { CookieService } from './../../common/cookie.service';
import { dataHttpService } from './../../common/data-http.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private cookieService:CookieService,
    private dataHttpService:dataHttpService,
    private modalService:NzModalService,
  ) { }

  setStatus:any = false;

  service:any = this.dataHttpService.getAllDataService();
  
  userId:any = this.cookieService.getCookie('id');
  facilitatorStatus:any = this.cookieService.getCookie('facilitatorStatus');
  token:any = this.cookieService.getCookie('token');

  ngOnInit() {
    // this.getUserInfo();
  }

  getUserInfo(){
    let th = this;
    let params = {
      userId:th.userId,
      token:th.token
    };
    th.service.getUserInfo(params).subscribe((data:any) =>{
      if(data.errcode == '200'){
        if(data.data){
          // data.data.facilitatorStatus = '3';
          if(data.data.facilitatorStatus !== th.facilitatorStatus){
            th.cookieService.setCookie('facilitatorStatus',data.data.facilitatorStatus,0)
          }
        }
      }else{
        th.modalService.error({
          nzTitle:data.errmsg
        });
      }
      th.setStatus = true;
    })
  }

}
