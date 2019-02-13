import { Component, OnInit } from '@angular/core';
import { dataHttpService } from './../../../common/data-http.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { TableAddComponent } from './table-add/table-add.component'
declare var $: any;
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {

  constructor(
    private dataHttpService: dataHttpService,
    private _message: NzMessageService,
    private modalService: NzModalService,
  ) { }

  //所有的接口,使用service方法是需要在common下dataConfig文件进行配置
  service: any = this.dataHttpService.getAllDataService();

  //第一步：配置搜索条件如下***********
  //选项的绑定值
  select: any = 'true';
  //选项数组
  options: any = [{
    id: 'true',
    text: '同意'
  }, {
    id: 'false',
    text: '拒绝'
  }];
  //关键字
  keyValue: any = "";

  //第二步：是否显示树,如果不显示，则不需要管，如果需要则把showTree改成true然后进行如下配置
  showTree: any = true;
  isNeedQuery: any = false;//是否需要查询输入框
  treeDataUrl: any = "getBudgetTree";  //树接口在dataConfig里面定义的方法名称
  keyName: any = "projectName"; //接口返回使用接口里的哪个key值显示相应的名称
  dataMethod:any = "get";  //如果html中不传值，则默认为getUrl方式

  //第三步，表格配置
  //表格初始化参数
  _current = 1;  // 当前页数
  _pageSize = 10;  // 显示列数
  _total = 0;   // 列表总数
  _dataSet = [];   // 查询
  _loading = true;
  _allChecked = false;
  _indeterminate = false;
  //是否需要序号
  isNeedIndex: any = true;

  //列表标题的数组
  titleArry: any = ["预算账户编号", "预算账户名称", "预算年度", "预算金额（元）", "预算项目", "上级预算账户", "是否冻结", "操作"];

  //返回参数对应的key值,但是我不建议这种方法，数量少没啥关系，标题为什么可以这么用呢，主要是他永远就那么多，不用太担心，但是这个是针对每一条数据都需要ngFor，所以慎重考虑，只是为了简便开发，
  //如果页面慢，建议还是老实的写html，不要用ngFor，具体html可以看html中我注掉的内容
  dataKey: any = ["accountCode", "accountName", "budgetAnnual", "budgetMoney", "projectName", "parentName", "isFreezeText"];

  ngOnInit() {
    this.queryData('');
  }

  //查询按钮方法，获取列表数据，初始化的时候调取,这边使用的时候，需要修改调取接口，传入参数params和是否需要对数据进行处理,initialization这个参数是决定是否从第一页开始获取数据
  queryData(initialization) {
    let th = this;
    //打开列表loading
    th._loading = true;
    th._allChecked = false;
    if (initialization) {
      th._current = 1;
    }
    //按照接口定义组参数
    let params = {
      keyword: th.keyValue,
      pageNum: th._current,
      pageSize: th._pageSize,
    }
    //调取接口
    th.service.getBudgetOrganizationList(params).subscribe((data: any) => {
      if (data.errcode === "0") {
        $.each(data.data.list, function (key, item) {
          if (item.isFreeze == 0) {
            item.isFreezeText = "否";
          } else {
            item.isFreezeText = "是";
          }
        });
        //把data数据处理完再赋值，不然操控双向绑定的数据，不断改变会造成DOM的重新渲染，一次渲染即可
        th._loading = false;
        th._total = data.data.total;
        th._dataSet = data.data.list;
      } else {
        th._loading = false;
        th._total = 0;
        th._dataSet = [];
      }
    })
  }

  //列表勾选的方法
  _checkAll(value) {
    if (value) {
      this._dataSet.forEach(data => {
        data.checked = true;
      });
    } else {
      this._dataSet.forEach(data => {
        data.checked = false;
      });
    }
    this._refreshStatus();
  }

  // 刷新全选状态
  _refreshStatus() {
    const allChecked = this._dataSet.every(value => value.checked === true);
    const allUnChecked = this._dataSet.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
  }

  //批量删除
  delAll() {
    let th = this;
    let array = [];
    for (var i = 0; i < th._dataSet.length; i++) {
      if (th._dataSet[i].checked == true) {
        array.push(th._dataSet[i]);
      }
    }
    if (array.length == 0) {
      th.modalService.info({
        nzTitle: "请先选择数据",
        nzContent: '<b></b>',
      });
      return;
    }
    th.modalService.confirm({
      nzTitle: '确定删除选中数据吗？',
      nzContent: '<b></b>',
      nzOnOk() {
        th.service.selfleveldelete(array).subscribe((data: any) => {
          // console.log(data);
          if (data.errcode == "0") {
            th._message.create('success', '删除成功！')
            th.queryData(true);
          } else {
            th._message.create('error', data.errmsg)
          }
        })
      },
      nzOnCancel() { }
    });
  }

  //新增方法,content我给注掉了，但是这个是必须的，可以根据引入的
  Add() {
    let th = this;
    let modal = th.modalService.create({
      nzTitle: "",
      nzContent: TableAddComponent,
      nzClosable: false,
      nzComponentParams: {
        // adminToken:th.token,
        // categoryCode:th.categoryCode,
        // taskId:th.taskId
      },
      nzWidth: '1000px',
      nzFooter: null
    });
    modal.afterOpen.subscribe(() => {
      console.log('[afterOpen] emitted!')
    });
    modal.afterClose.subscribe((result) => {
      if (result.status == 'ok') {
      }
    });

    // subscription.subscribe(result => {

    // })
  }

  //查看详情的方法,content我给注掉了，但是这个是必须的，可以根据引入的
  lookDetail(data) {
    let th = this;
    let modal = th.modalService.create({
      nzTitle: "",
      nzContent: TableAddComponent,
      nzClosable: false,
      nzComponentParams: {
        detail:true
        // adminToken:th.token,
        // categoryCode:th.categoryCode,
        // taskId:th.taskId
      },
      nzWidth: '1000px',
      nzFooter: null
    });
    modal.afterOpen.subscribe(() => {
      console.log('[afterOpen] emitted!')
    });
    modal.afterClose.subscribe((result) => {
      if (result.status == 'ok') {
      }
    });
  }

  //删除的方法,
  delete(data) {
    let th = this;
    this.modalService.confirm({
      nzTitle: '确定删除' + data.accountCode + '这条数据吗？',
      nzContent: '<b></b>',
      nzOnOk() {
        let param = {
          idList: data.id
        };
        th.service.deleteAccountList(param).subscribe((data: any) => {
          if (data.errcode == "0") {
            th._message.create('success', '删除成功！')
            th.queryData(true);
          } else {
            th.modalService.info({
              nzTitle: data.errmsg,
              nzContent: '<b></b>',
              nzMaskClosable: false
            });
          }
        },
          (error: any) => {
            console.log(error);
          })
      }
    });
  }

  //编辑数据
  editData(data) {
    let th = this;
    let modal = th.modalService.create({
      nzTitle: "",
      nzContent: TableAddComponent,
      nzClosable: false,
      nzComponentParams: {
        isEdit:true,
        data:data
      },
      nzWidth: '1000px',
      nzFooter: null
    });
    modal.afterOpen.subscribe(() => {
      console.log('[afterOpen] emitted!')
    });
    modal.afterClose.subscribe((result) => {
      if (result.status == 'ok') {
      }
    });
  }

  //树的点击事件
  selectNodeSingle(treeNode) {
    let th = this;
    console.log(treeNode);
  }

  //树加载完成后的回调方法
  complateCallback(){
    console.log('树加载成功');
  }
}
