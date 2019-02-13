import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef, NzModalService, NzMessageService } from 'ng-zorro-antd';
import { dataHttpService } from './../../../../common/data-http.service';
declare var $: any;

@Component({
  selector: 'app-table-add',
  templateUrl: './table-add.component.html',
  styleUrls: ['./table-add.component.less']
})
export class TableAddComponent implements OnInit {

  constructor(
    private modal: NzModalRef,
    private modalService: NzModalService,
    private message: NzMessageService,
    private dataHttpService: dataHttpService,
  ) { }

  @Input() isEdit: any = false;
  @Input() data: any = {};
  @Input() detail: any = false;

  //判断是否可以注册
  showError: any = {
    name: {
      inputTips: '不能为空',
      error: false,
      inputError: false
    },
    webUrl: {
      inputTips: '不能为空',
      error: false,
      inputError: false
    },
    appUrl: {
      inputTips: '不能为空',
      error: false,
      inputError: false
    }
  };

  //所有的接口
  service: any = this.dataHttpService.getAllDataService();

  //名称
  nameValue: any = "";

  //web表单url
  webUrlValue: any = "";

  //表单类型选择的值
  select: any;

  //web端表单参数
  webParamValue: any = "";
  //app端表单URL
  appUrlValue: any = "";
  //app端表单参数
  appParamValue: any = "";



  ngOnInit() {
    let th = this;
    if (th.isEdit) {
      th.nameValue = th.data.facilitatorName;
      th.webUrlValue = th.data.formWebUrl;
      th.webParamValue = th.data.formWebParam;
      th.appUrlValue = th.data.formAppUrl;
      th.appParamValue = th.data.formAppParam;
    } else {
    }
  }

  //鼠标聚焦
  focusName(type) {
    let th = this;
    if (type == 'name') {
      th.changeRequire(th.nameValue, 'name');
    }
    else if (type == 'webUrl') {
      th.changeRequire(th.webUrlValue, 'webUrl');
    }
    else if (type == 'appUrl') {
      th.changeRequire(th.appUrlValue, 'appUrl');
    }
  }

  //鼠标失焦
  blurName(type) {
    let th = this;
    if (type) {
      th.showError[type].error = false;
    }
  }

  changeRequire(value, type) {
    let th = this;
    if (value === '') {
      th.showError[type].error = true;
      th.showError[type].inputError = true;
    } else {
      th.showError[type].error = false;
      th.showError[type].inputError = false;
    }
  }

  save() {
    let th = this;
    let hasNoerror = true;
    if (th.nameValue === '') {
      th.showError.name.error = true;
      th.showError.name.inputError = true;
      th.showError.name.inputTips = "不能为空";
      hasNoerror = false;
    }
    if (th.webUrlValue === '') {
      th.showError.webUrl.error = true;
      th.showError.webUrl.inputError = true;
      th.showError.webUrl.inputTips = "不能为空";
      hasNoerror = false;
    }
    if (th.appUrlValue === '') {
      th.showError.appUrl.error = true;
      th.showError.appUrl.inputError = true;
      th.showError.appUrl.inputTips = "不能为空";
      hasNoerror = false;
    }
    if (th.showError.name.inputError) {
      th.showError.name.error = true;
      hasNoerror = false;
    }
    if (th.showError.webUrl.inputError) {
      th.showError.webUrl.error = true;
      hasNoerror = false;
    }
    if (th.showError.appUrl.inputError) {
      th.showError.appUrl.error = true;
      hasNoerror = false;
    }
    if (!hasNoerror) {
      return;
    }
    if (th.isEdit) {
      let params = {
        id: th.data.id,
        formName: th.nameValue,
        formType: th.select,
        formWebUrl: th.webUrlValue,
        formWebParam: th.webParamValue,
        formAppUrl: th.appUrlValue,
        formAppParam: th.appParamValue
      };
      th.service.updateForm(params).subscribe((data: any) => {
        if (data.errcode == '200') {
          th.message.success('编辑成功');
          th.modal.destroy({ status: 'ok' });
        } else {
          th.modalService.error({
            nzTitle: data.errmsg
          })
        }
      })
    } else {
      let params = {
        formName: th.nameValue,
        formType: th.select,
        formWebUrl: th.webUrlValue,
        formWebParam: th.webParamValue,
        formAppUrl: th.appUrlValue,
        formAppParam: th.appParamValue

      }
      th.service.registerForm(params).subscribe((data: any) => {
        if (data.errcode == '200') {
          th.message.success('注册成功');
          th.modal.destroy({ status: 'ok' });
        } else {
          th.modalService.error({
            nzTitle: data.errmsg
          })
        }
      })
    }


  }

  cancel() {
    let th = this;
    th.modal.destroy({ status: 'cancel' });
  }

}
