import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataHttpService } from "./../../common/data-http.service";
import { ruleConfig } from "./../../common/rule.service";
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-retrieve-password',
  templateUrl: './retrieve-password.component.html',
  styleUrls: ['./retrieve-password.component.less']
})
export class RetrievePasswordComponent implements OnInit {

  constructor(
    private router:Router,
    private dataHttpService: dataHttpService,
    private message: NzMessageService,
    private modalService: NzModalService
  ) { }

  //手机号或者邮箱
  phoneValue:any = "";
  //验证码
  verificationValue:any = "";
  //新面
  newPasswardValue:any = "";
  //确认密码
  newPasswardSureValue:any = "";
  //修改验证
  showError: any = {
    phoneValue: {
      inputTips: '不能为空',
      error: false,
      inputError: false
    },
    verificationValue: {
      inputTips: '不能为空',
      error: false,
      inputError: false
    },
    newPasswardValue: {
      inputTips: '不能为空',
      error: false,
      inputError: false
    },
    newPasswardSureValue: {
      inputTips: '不能为空',
      error: false,
      inputError: false
    }
  };

  //查询二维码定时
  codeTimeout: any = "";
  //二维码60秒获取一次是否能点击
  codeDisable: any = false;
  //时间倒计时
  timeTimeout: any = "";
  //倒计时时间
  time: any = "";
  //所有的接口
  service:any = this.dataHttpService.getAllDataService();

  ngOnInit() {
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
      idType:"1"
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
  

  //鼠标聚焦
  focusInput(type) {
    let th = this;
    if (type == 'phoneValue') {
      th.phoneChange(th.phoneValue);
    }
    else if(type == 'verificationValue'){
      th.verificationChange(th.verificationValue);
    }
    else if(type == 'newPasswardValue'){
      th.validateNewPasswordRightNow(th.newPasswardValue,);
    }
    else if(type == 'newPasswardSureValue'){
      th.validateNewSurePasswordRightNow(th.newPasswardSureValue);
    }
  }

  //鼠标失焦
  blurInput(type) {
    let th = this;
    if(type){
      th.showError[type].error = false;
    }
  }

  //手机号验证
  phoneChange(value) {
    let th = this;
    if (value === '') {
      th.showError.phoneValue.error = true;
      th.showError.phoneValue.inputError = true;
      th.showError.phoneValue.inputTips = '不能为空';
      return;
    }
    th.showError.phoneValue.inputTips = "手机号格式不正确";
    th.showError.phoneValue.error = !ruleConfig.phoneRule.test(value);
    th.showError.phoneValue.inputError = !ruleConfig.phoneRule.test(value);
  }

  //判断密码输入是否符合格式立即判断
  validateNewPasswordRightNow(value) {
    let th = this;

    if (value) {
      th.showError.newPasswardValue.inputTips = "密码格式不正确，密码长度至少8位，包含大小写字母数字和特殊字符";
      let vaild = ruleConfig.validatePassword(value);
      th.showError.newPasswardValue.error = !vaild;
      th.showError.newPasswardValue.inputError = !vaild;
      if (th.newPasswardSureValue) {
        if (th.newPasswardSureValue == value) {
          th.showError.newPasswardSureValue.inputError = false;
        } else {
          th.showError.newPasswardSureValue.inputError = true;
        }
      }
    } else {
      th.showError.newPasswardValue.inputTips = "不能为空";
      th.showError.newPasswardValue.error = true;
      th.showError.newPasswardValue.inputError = true;
    }

  }

  //判断第二次输入的密码是否与第一次一样,立即判断
  validateNewSurePasswordRightNow(value) {
    let th = this;
    if (value) {
      th.showError.newPasswardSureValue.inputTips = "两次输入的密码不一致";
      if (th.newPasswardValue != value) {
        th.showError.newPasswardSureValue.error = true;
        th.showError.newPasswardSureValue.inputError = true;
      } else {
        th.showError.newPasswardSureValue.error = false;
        th.showError.newPasswardSureValue.inputError = false;
      }
    } else {
      th.showError.newPasswardSureValue.inputTips = "不能为空";
      th.showError.newPasswardSureValue.error = true;
      th.showError.newPasswardSureValue.inputError = true;
    }
  }

  //二维码判断是否为空
  verificationChange(value){
    let th = this;
    if(value === ''){
      th.showError.verificationValue.error = true;
      th.showError.verificationValue.inputError = true;
    }else{
      th.showError.verificationValue.error = false;
      th.showError.verificationValue.inputError = false;
    }
  }

  goLogin(){
    let th = this;
    let params = {
      account:th.phoneValue,
      identifyingCode:th.verificationValue,
      password:th.newPasswardValue,
      againPsd:th.newPasswardSureValue
    };
    th.service.backPsd(params).subscribe((data:any) =>{
      if(data.errcode == '200'){
        th.modalService.success({
          nzTitle: '密码修改成功，请到登录页进行登录',
          nzOnOk: () => {
            th.router.navigate(['login'],{
              queryParams:{
                phone:th.phoneValue
              }
            })
          }
        });
      }else{
        th.modalService.error({
          nzTitle:data.errmsg
        })
      }
    })
  }

  goLogin2(){
    let th = this;
    th.router.navigate(['login'])
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
  }

}
