import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { dataHttpService } from "./../../common/data-http.service";
import { CookieService } from "./../../common/cookie.service";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.less']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataHttpService: dataHttpService,
    private message: NzMessageService,
    private cookieService: CookieService,
    private modalService: NzModalService
  ) { 
    let th = this;
    document.onkeydown=function(event){
      var e = event || window.event || arguments.callee.caller.arguments[0];     
       if(e && e.keyCode==13){ // enter 键
        if(location.pathname.indexOf('adminLogin') > -1){
          th.login();
        }
        
      }
    };
  }

  //选择登录方式
  loginType: any = "1";

  //服务商登录
  //登录手机号码
  phoneValue: any = "";
  //密码
  pwdValue: any = "";
  //用户名错误提示
  loginNameError: any = "";
  //密码错误提示
  pawssedError: any = "";

  //客户登录
  //登录手机号码/工号/姓名
  phoneValue2: any = "";
  //密码
  pwdValue2: any = "";
  //用户名错误提示
  loginNameError2: any = "";
  //密码错误提示
  pawssedError2: any = "";



  //请求的接口
  service: any = this.dataHttpService.getAllDataService();


  ngOnInit() {
    let th = this;
    th.activatedRoute.queryParams.subscribe(params => {
      th.phoneValue = params.phone ? params.phone : "";
    });
  }

  selectFun(type) {
    // if(type == '2'){
    //   this.message.error('暂时未开通，敬请期待');
    //   return;
    // }
    this.loginType = type;
  }

  login() {
    let th = this;
    let params = {
      account: '',
      password: '',
      loginType:'0',
      userPermission:'0'
    };

    let hasNoerro = true;
    if (th.phoneValue2 === '') {
      th.loginNameError2 = '用户名不能为空';
      hasNoerro = false;
    } else {
      th.loginNameError2 = '';
    }
    if (th.pwdValue2 === '') {
      th.pawssedError2 = '密码不能为空';
      hasNoerro = false;
    } else {
      th.pawssedError2 = '';
    }
    if (!hasNoerro) {
      return;
    }
    params.account = th.phoneValue2;
    params.password = th.pwdValue2;

    th.service.login(params).subscribe((data: any) => {
      if (data.errcode == '200') {
        if (data.data) {
          th.cookieService.setCookie('token', data.data.token, 0);
          th.cookieService.setCookie('id', data.data.id, 0);
          th.cookieService.setCookie('facilitatorStatus', data.data.facilitatorStatus, 0);
          th.cookieService.setCookie('facilitatorKey', data.data.facilitatorKey, 0);
          th.cookieService.setCookie('userPermission', data.data.userPermission, 0);
          th.cookieService.setCookie('userName', data.data.userName, 0);
        }
        th.router.navigate(['/admin/adminpage/default']);
      } else {
        th.modalService.error({
          nzTitle: data.errmsg
        });
      }
    })
  }

  goRetrieve() {
    this.router.navigate(['retrievePassword'])
  }

  goRegister() {
    this.router.navigate(['register'])
  }

}
