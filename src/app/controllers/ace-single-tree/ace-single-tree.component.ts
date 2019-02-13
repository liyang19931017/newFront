import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { dataHttpService } from '../../common/data-http.service';
import { CookieService } from '../../common/cookie.service';
declare var $: any;
declare var fuzzySearch: any;
@Component({
  selector: 'app-ace-single-tree',
  templateUrl: './ace-single-tree.component.html',
  styleUrls: ['./ace-single-tree.component.less']
})
export class AceSingleTreeComponent implements OnInit {

  constructor(
    private dataHttpService:dataHttpService,
    private cookieService:CookieService
  ) { }

  @Input() isNeedQuery:any = true; //是否需要搜索Input框，默认是需要的
  @Input() dataUrl;  //请求的url，在dataConfig文件中配置完，直接传参进来方法名就行
  @Input() dataMethod = "getUrl"; //请求的方式，只有两种，getUrl和其他，getUrl是路径参数，其他为body里面组装参数
  @Input() dataParams;    //请求的参数组装好传进来
  @Input() keyName;     //树用来展示获取数据中的object中的哪个key值名称
  @Input() treeId:any = 'budgeTree';     //树用来展示获取数据中的object中的哪个key值名称
  @Input() inputId:any = 'key';     //树用来展示获取数据中的object中的哪个key值名称
  @Output() selectNode = new EventEmitter();  //选中后往外传出的数据
  @Output() firstNode = new EventEmitter();  //第一个数据
  @Output() complateCallback = new EventEmitter();  //第一个数据

  zTreeObj: any;  //树对象
  setting: {};    //树的设置
  queryName: any = "";  //查询的value值
  zNodes: any;
  tenantid = this.cookieService.getCookie('tenantid');
  dataHttpServices:any = this.dataHttpService.getAllDataService();
  isNetErro: any = false;  //是否网络问题
  isDataErro: any = false;  //是否数据错误
  dataTree: any;   //获取的树数据
  watchQueryTimeout: any;  //多长时间查询一次
  loading: any = true; //控制是否显现loading

  ngOnInit() {
    this.queryTree();
  }

  queryTree(isDelete:any = false) {
    let th = this;
    if (th.dataUrl && th.dataMethod == 'getUrl') {
      if(th.dataParams){
        th.getDataTree(th.dataUrl,th.dataParams,isDelete);
      }else{
        th.getDataTree(th.dataUrl,th.tenantid,isDelete);
      }
    } else if (th.dataUrl && th.dataMethod != 'getUrl') {
      if(th.dataParams){
        th.getDataTree(th.dataUrl,th.dataParams,isDelete);
      }else{
        th.getDataTree(th.dataUrl,{},isDelete);
      }
    }
  }

  getDataTree(url,params,isDelete){
    let th = this;
    th.dataHttpServices[url](params).subscribe((data: any) => {
      if (data && data.errcode == 0) {
        th.queryName = "";
        th.isDataErro = false;
        if(data.data){
          if(!Array.isArray(data.data)){
            data.data = [data.data];
          }
        }else{
          data.data = [];
        }
        if (data.data && data.data.length > 0) {
          if(th.zTreeObj){
            th.dataTree = th.zTreeObj.getNodes();
          }
          if(th.dataTree && th.dataTree.length > 0){
            if(isDelete){
              th.dataTree[0] = th.extendTree(th.dataTree[0],data.data[0]);
            }else{
              $.extend(true,th.dataTree[0],data.data[0]);
            }
          }else{
            th.dataTree = data.data;
          }
          th.setTree(0, th.dataTree);
          th.firstNode.emit([th.dataTree[0][th.keyName]]);
        } else if (data.data && data.data.length == 0) {
          th.dataTree = data.data;
          th.setTree(0, th.dataTree);
          th.firstNode.emit([]);
        }
      } else {
        th.isDataErro = true;
      }
      th.loading = false;
    }, (error: any) => {
      console.log(error);
    })
  }

  extendTree(treeData1,data1){
    var getDeepTreeData = function(treeData,data){
      $.each(data,function(key,item){
        $.each(treeData,function(keyOne,itemOne){
          if(item.id === itemOne.id){
            item.open = itemOne.open;
            if(item.children && item.children.length > 0){
              getDeepTreeData(itemOne.children,item.children);
            }
          }
        })
      })
    }
    getDeepTreeData(treeData1.children,data1.children);
    data1.open = treeData1.open;
    return data1;
  };

  setTree(type, data) {
    let th = this;
    if (type == 0) {
      th.setting = {
        check: {
          enable: true//checkbox
        },
        view: {
          nameIsHTML: true, //允许name支持html				
          selectedMulti: false
        },
        edit: {
          enable: false,
          editNameSelectAll: false
        },
        data: {
          simpleData: {
            enable: true
          },
          key: {
            name: th.keyName ? th.keyName : 'projectName'
          }
        },
        callback: {
          onClick: function (event, treeId, treeNode) {
            var nodes = th.zTreeObj.transformToArray(treeNode);
            let idList = [];
            $.each(nodes, function (key, item) {
              idList.push(item.id);
            });
            let treeNodeObj = {
              treeNode: treeNode,
              idList: idList
            };
            th.selectNode.emit(treeNodeObj);
          }
        }
      }

      th.zTreeObj = $.fn.zTree.init($("#" + th.treeId), th.setting, data);
      th.complateCallback.emit();
      if(th.isNeedQuery){
        fuzzySearch(th.treeId, '#' + th.inputId, null, true);
      }
     
      let nodes = th.zTreeObj.getNodes();
      th.setParams(nodes, '');
      document.getElementById(th.treeId);
      document.getElementsByTagName('ul')
    } else {
      th.zTreeObj.updateNode(data);
    }
  }

  setParams(data, parent) {
    let th = this;
    if (data && data.length > 0) {
      $.each(data, function (key, item) {
        if (parent) {
          item.parentIdArry = [];
          item.parentNameArry = [];
          $.each(parent.parentIdArry, function (key, items) {
            item.parentIdArry.push(items);
          });
          $.each(parent.parentNameArry, function (key, items) {
            item.parentNameArry.push(items);
          });
          item.parentIdArry.push(parent.id);
          item.parentNameArry.push(parent[th.keyName]);
        } else {
          item.parentIdArry = [];
          item.parentNameArry = [];
        }
        if (item.children && item.children.length > 0) {
          if(!item.isParent){
            let node = th.zTreeObj.getNodeByTId(item.tId);
            node.isParent = true;
            th.setTree(1, node);
          }
          th.setParams(item.children, item);
        } else {
          let node = th.zTreeObj.getNodeByTId(item.tId);
          node.children = "";
          node.isParent = false;
          th.setTree(1, node);
        }
      })
    }
  }

  changeQueryName(event) {
    let th = this;
    if (th.watchQueryTimeout) {
      clearTimeout(th.watchQueryTimeout);
      th.watchQueryTimeout = "";
    }
    th.watchQueryTimeout = setTimeout(() => {
      let node = th.zTreeObj.getNodesByParamFuzzy("projectName", event, null);
      th.zTreeObj.updateNode(node);
    }, 500);

  }

  queryNameFun(value){
    let th = this;
    let node = th.zTreeObj.getNodesByParamFuzzy(th.keyName, value, null);
    th.zTreeObj.updateNode(node);
  }

  restSelect() {
    this.zTreeObj.refresh();
    // this.zTreeObj.expandAll(true);
  }

  getTreeNodeById(id) {
    let th = this;
    let treeNodeData = th.zTreeObj.getNodeByParam('id', id);
    return treeNodeData;
  }

  selectedNode(selectId){
    let th = this;
    let selectNode = th.zTreeObj.getNodeByParam('id',selectId);
    th.zTreeObj.selectNode(selectNode,false);
    th.selectNode.emit({treeNode:selectNode});
  }

  expandNode(id){
    let th = this;
    let selectNode = th.zTreeObj.getNodeByParam('id',id);
    th.zTreeObj.expandNode(selectNode,false,false,false);
    th.selectedNode(id);
  }

  ngOnDestroy() {
    let th = this;
    if (th.watchQueryTimeout) {
      clearTimeout(th.watchQueryTimeout);
      th.watchQueryTimeout = "";
    }
    if (th.zTreeObj) {
      th.zTreeObj.destroy(th.treeId);
    }
  }

}
