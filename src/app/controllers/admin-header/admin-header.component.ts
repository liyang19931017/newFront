import { Component, OnInit } from '@angular/core';
import { language } from './../../common/language-zh.service';
import { Router } from '@angular/router';
import { CookieService } from './../../common/cookie.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.less']
})
export class AdminHeaderComponent implements OnInit {

  constructor(
    private router:Router,
    private cookieService:CookieService,
  ) { }

  ace:any = language;
  loginName:any = this.cookieService.getCookie('userName');
  hiddenMenu:any = true;
  hiddenMenuSetting:any = true;
  

  ngOnInit() {
  }

  showSetting(){
    let th = this;
    th.hiddenMenu = false;
  }
  hiddenSetting(){
    let th = this;
    th.hiddenMenu = true;
  }
  showMenu(){
    let th = this;
    th.hiddenMenuSetting = false;
  }
  hiddenMenuFun(){
    let th = this;
    th.hiddenMenuSetting = true;
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
    th.router.navigate(['adminLogin']);
  }

  gotoRenwu(){
    
  }

  gotoPage(route){
    let th = this;
    th.router.navigate(['admin/adminpage/' + route]);
  }

}
