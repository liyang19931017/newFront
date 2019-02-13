import { Component, OnInit } from '@angular/core';
import { language } from './../../common/language-zh.service';
import { Router } from '@angular/router';
import { CookieService } from './../../common/cookie.service';
import { dataHttpService } from './../../common/data-http.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.less']
})
export class HomeHeaderComponent implements OnInit {

  constructor(
    private router:Router,
    private cookieService:CookieService,
    private dataHttpService:dataHttpService,
    private modalService:NzModalService,
  ) { }

  ace:any = language;
  loginName:any = this.cookieService.getCookie('userName');
  hiddenMenu:any = true;
  service:any = this.dataHttpService.getAllDataService();
  
  userId:any = this.cookieService.getCookie('id');
  facilitatorStatus:any = this.cookieService.getCookie('facilitatorStatus');
  token:any = this.cookieService.getCookie('token');
  

  ngOnInit() {
  }
  goAccount(){
    let th = this;
    th.hiddenMenu = true;
    th.router.navigate(['home/homepage/account']);
  }

  gotoDefault(){
    let th = this;
    th.router.navigate(['home/homepage/default']);
  }

  showSetting(){
    let th = this;
    th.hiddenMenu = false;
  }
  hiddenSetting(){
    let th = this;
    th.hiddenMenu = true;
  }

  logout(){
    let th = this;
    th.hiddenMenu = true;
    th.cookieService.setCookie('token', '', 0);
    th.cookieService.setCookie('id', '', 0);
    th.cookieService.setCookie('facilitatorStatus', '', 0);
    th.cookieService.setCookie('facilitatorKey','', 0);
    th.cookieService.setCookie('userPermission', '', 0);
    th.cookieService.setCookie('userName', '', 0);
    th.router.navigate(['login']);
  }
}
