import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataHttpService } from "./../../common/data-http.service";
import { ruleConfig } from "./../../common/rule.service";
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private dataHttpService: dataHttpService,
    private message: NzMessageService,
    private modalService: NzModalService
  ) { 
    let th = this;
    document.onkeydown=function(event){
      var e = event || window.event || arguments.callee.caller.arguments[0];     
       if(e && e.keyCode==13){ // enter 键
        if(location.pathname.indexOf('register') > -1){
          th.register();
        }
        
      }
    };
  }

  //手机号或者邮箱
  phoneValue: any = "";
  //验证码
  verificationValue: any = "";

  //接口
  service: any = this.dataHttpService.getAllDataService();

  //查询二维码定时
  codeTimeout: any = "";
  //二维码60秒获取一次是否能点击
  codeDisable: any = false;
  //时间倒计时
  timeTimeout: any = "";
  //倒计时时间
  time: any = "";

  //密码
  passwordValue: any = "";
  newPasswordTimeout: any = "";
  //确认密码
  passwordSureValue: any = "";
  newSurePasswordTimeout: any = "";

  //已经确认重复的手机号
  repeatPhoneArry:any = [];

  //是否显示错误
  showError: any = {
    phone: false,
    phoneInput: false,
    phoneTips: "手机号格式不正确",
    verification: false,
    verificationInput: false,
    verificationTips: "不能为空",
    passward: false,
    passwardInput: false,
    passwardTips:"密码格式不正确，密码长度至少8位，包含大小写字母数字和特殊字符",
    copyPassward: false,
    copyPasswardInput: false,
    copyPasswardTips: "两次输入的密码不一致",
    email:false,
    emailInput:false,
    emailTips: "不能为空",
    origination:false,
    originationInput:false,
    originationTips:"不能为空"
  };

  //地址
  emailValue: any = "";
  //企业名称/组织名称
  originationValue: any = "";

  //防止注册按钮多次点击
  registerDisable:any = false;

  ngOnInit() {
  }

  //手机号验证
  phoneChange(value) {
    let th = this;
    if (value === '') {
      th.showError.phone = true;
      th.showError.phoneInput = true;
      th.showError.phoneTips = '不能为空';
      return;
    }
    th.showError.phoneTips = "手机号格式不正确";
    th.showError.phone = !ruleConfig.phoneRule.test(value);
    th.showError.phoneInput = !ruleConfig.phoneRule.test(value);
    if(!th.showError.phoneInput && th.repeatPhoneArry.length > 0){
      if(th.repeatPhoneArry.indexOf(value) > -1){
        th.showError.phoneTips = "手机号码已注册，请修改手机号";
        th.showError.phone = true;
        th.showError.phoneInput = true;
      }
    }
  }

  //输入框聚焦
  focusInput(type) {
    let th = this;
    th.showError.phone = false;
    th.showError.verification = false;
    th.showError.passward = false;
    th.showError.copyPassward = false;
    th.showError.email = false;
    th.showError.origination = false;
    if (type == 'phone') {
      th.phoneChange(th.phoneValue);
    } else if (type == 'passward') {
      th.validateNewPasswordRightNow(th.passwordValue);
    } else if (type == 'copyPassward') {
      th.validateNewSurePasswordRightNow(th.passwordSureValue);
    }
    else if (type == 'verification') {
      th.verificationChange(th.verificationValue);
    }
    else if (type == 'email') {
      th.emailChange(th.emailValue);
    }
    else if (type == 'origination') {
      th.originationChange(th.originationValue);
    }
  }

  blurInput(type) {
    let th = this;
    if (type == 'phone') {
      th.showError.phone = false;
    } else if (type == 'passward') {
      th.showError.passward = false;
    } else if (type == 'copyPassward') {
      th.showError.copyPassward = false;
    }
    else if (type == 'verification') {
      th.showError.verification = false;
    }
    else if (type == 'email') {
      th.showError.email = false;
    }
    else if (type == 'origination') {
      th.showError.origination = false;
    }
  }

  //注册
  goLogin() {
    this.router.navigate(['login'])
  }

  //获取验证码
  getIdentifyingCode() {
    let th = this;
    th.codeDisable = true;
    th.codeTimeout = setTimeout(() => {
      th.codeDisable = false;
    }, 60000);
    th.time = 60;
    th.setTimeSHow();
    let params = {
      mobilePhone: th.phoneValue,
      idType:"0"
    };
    th.service.getIdentifyingCode(params).subscribe((data: any) => {
      if (data.errcode == '200') {
        th.message.create('success', '验证码已发送，请注意查收。')
      } else {
        th.modalService.error({
          nzTitle: data.errmsg
        });
      }
    })
  }

  //刷新时间
  setTimeSHow() {
    let th = this;
    th.timeTimeout = setTimeout(() => {
      th.time--;
      if (th.time > 0) {
        th.setTimeSHow();
      }
    }, 1000);
  }

  //判断密码输入是否符合格式立即判断
  validateNewPasswordRightNow(value) {
    let th = this;

    if (value) {
      th.showError.passwardTips = "密码格式不正确，密码长度至少8位，包含大小写字母数字和特殊字符";
      let vaild = ruleConfig.validatePassword(value);
      th.showError.passward = !vaild;
      th.showError.passwardInput = !vaild;
      if (th.passwordSureValue) {
        if (th.passwordSureValue == value) {
          th.showError.copyPasswardInput = false;
        } else {
          th.showError.copyPasswardInput = true;
        }
      }
    } else {
      th.showError.passwardTips = "不能为空";
      th.showError.passward = true;
      th.showError.passwardInput = true;
    }

  }

  //判断第二次输入的密码是否与第一次一样,立即判断
  validateNewSurePasswordRightNow(value) {
    let th = this;
    if (value) {
      th.showError.copyPasswardTips = "两次输入的密码不一致";
      if (th.passwordValue != value) {
        th.showError.copyPassward = true;
        th.showError.copyPasswardInput = true;
      } else {
        th.showError.copyPassward = false;
        th.showError.copyPasswardInput = false;
      }
    } else {
      th.showError.copyPasswardTips = "不能为空";
      th.showError.copyPassward = true;
      th.showError.copyPasswardInput = true;
    }
  }

  //二维码判断是否为空
  verificationChange(value){
    let th = this;
    if(value === ''){
      th.showError.verification = true;
      th.showError.verificationInput = true;
    }else{
      th.showError.verification = false;
      th.showError.verificationInput = false;
    }
  }
  //判断email地址是否为空
  emailChange(value){
    let th = this;
    if(value === ''){
      th.showError.email = true;
      th.showError.emailInput = true;
    }else{
      th.showError.email = false;
      th.showError.emailInput = false;
    }
  }
  //判断email地址是否为空
  originationChange(value){
    let th = this;
    if(value === ''){
      th.showError.origination = true;
      th.showError.originationInput = true;
    }else{
      th.showError.origination = false;
      th.showError.originationInput = false;
    }
  }

  //注册按钮
  register(){
    let th = this;
    th.registerDisable = true;
    setTimeout(() => {
      th.register1();
    }, 200);
  }
  register1() {
    let th = this;
    let haveNoError = true;
    if(th.phoneValue === ''){
      th.showError.phone = true;
      th.showError.phoneInput = true;
      th.showError.phoneTips = "不能为空";
      haveNoError = false;
    }
    if(th.verificationValue === ''){
      th.showError.verification = true;
      th.showError.verificationInput = true;
      th.showError.verificationTips = "不能为空";
      haveNoError = false;
    }
    if(th.passwordValue === ''){
      th.showError.passward = true;
      th.showError.passwardInput = true;
      th.showError.passwardTips = "不能为空";
      haveNoError = false;
    }
    if(th.passwordSureValue === ''){
      th.showError.copyPassward = true;
      th.showError.copyPasswardInput = true;
      th.showError.copyPasswardTips = "不能为空";
      haveNoError = false;
    }
    if(th.emailValue === ''){
      th.showError.email = true;
      th.showError.emailInput = true;
      th.showError.emailTips = "不能为空";
      haveNoError = false;
    }
    if(th.originationValue === ''){
      th.showError.origination = true;
      th.showError.originationInput = true;
      th.showError.originationTips = "不能为空";
      haveNoError = false;
    }
    if(th.showError.phoneInput){
      th.showError.phone = true;
      haveNoError = false;
    }
    if(th.showError.verificationInput){
      th.showError.verification = true;
      haveNoError = false;
    }
    if(th.showError.passwardInput){
      th.showError.passward = true;
      haveNoError = false;
    }
    if(th.showError.copyPasswardInput){
      th.showError.copyPassward = true;
      haveNoError = false;
    }
    if(th.showError.emailInput){
      th.showError.email = true;
      haveNoError = false;
    }
    if(th.showError.originationInput){
      th.showError.origination = true;
      haveNoError = false;
    }
    if(!haveNoError){
      th.registerDisable = false;
      return;
    }
    
    let params = {
      mobilePhone: th.phoneValue,
      identifyingCode: th.verificationValue,
      password: th.passwordValue,
      againPsd: th.passwordSureValue,
      email:th.emailValue,
      enterpriseName: th.originationValue
    };
    th.service.register(params).subscribe((data: any) => {
      th.registerDisable = false;
      if (data.errcode == '200') {
        th.modalService.success({
          nzTitle: '注册成功，请到登录页进行登录',
          nzOnOk: () => {
            th.router.navigate(['login'],{
              queryParams:{
                phone:th.phoneValue,
                isRegister:'1'
              }
            })
          }
        });
      } else if(data.errcode == '309'){
        th.modalService.error({
          nzTitle: '手机号已注册，请修改手机号，重新获取验证码',
          nzOnOk:() =>{
            th.repeatPhoneArry.push(th.phoneValue);
            th.phoneChange(th.phoneValue);
          }
        });

      }else{
        th.modalService.error({
          nzTitle: data.errmsg
        });
      }
    })
  }

  //页面销毁事件
  ngOnDestroy() {
    let th = this;
    if (th.codeTimeout) {
      clearTimeout(th.codeTimeout);
      th.codeTimeout = "";
    }
    if (th.timeTimeout) {
      clearTimeout(th.timeTimeout);
      th.timeTimeout = "";
    }
    if (th.newPasswordTimeout) {
      clearTimeout(th.newPasswordTimeout);
      th.newPasswordTimeout = "";
    }
    if (th.newSurePasswordTimeout) {
      clearTimeout(th.newSurePasswordTimeout);
      th.newSurePasswordTimeout = "";
    }
  }


}
