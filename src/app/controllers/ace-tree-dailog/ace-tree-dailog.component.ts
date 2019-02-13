import { EventEmitter, Component, OnInit, Output, Input } from '@angular/core';
import { dataHttpService } from '../../common/data-http.service';
import { CookieService } from '../../common/cookie.service';
declare var $: any;

@Component({
  selector: 'app-ace-tree-dailog',
  templateUrl: './ace-tree-dailog.component.html',
  styleUrls: ['./ace-tree-dailog.component.less']
})
export class AceTreeDailogComponent implements OnInit {

  constructor(
    private dataHttpService:dataHttpService,
    private cookieService:CookieService
  ) { 
    let th = this;
    $(document).bind('click',function(e){ 
      var e = e || window.event; //浏览器兼容性 
      var elem = e.target || e.srcElement; 
      while (elem) { //循环判断至跟节点，防止点击的是div子元素 
      if (elem.id && (elem.id=='key' || elem.id=='key1' || elem.id=='key2')) { 
      return; 
      } 
      elem = elem.parentNode; 
      } 
      
       th.show = false;
      });
  }

  @Input() dataUrl;
  @Input() keyName;
  @Input() selectId;
  @Input() paramData;
  @Input() isSelectChildren;
  @Input() disable:any;
  @Input() treeId:any;
  @Input() deleteId = '1';
  @Input() selectName = '';
  @Output() selectNode = new EventEmitter();
  zTreeObj: any;
  setting: {};
  queryName: any = "";
  zNodes: any;
  tenantid:any = this.cookieService.getCookie('tenantid');
  dataHttpServices:any = this.dataHttpService.getAllDataService();
  isNetErro:any = false;
  isDataErro:any = false;
  dataTree:any;
  watchQueryTimeout:any;
  show:any = false;

  ngOnInit() {
  }

  setValueData(option){
    if(option){
      this.dataUrl = option.dataUrl;
      this.keyName = option.keyName;
      this.selectId = option.selectId;
      this.paramData = option.paramData;
      this.treeId = option.treeId;
      this.deleteId = option.deleteId;
      this.selectName = option.selectName;
    }
    if(!this.treeId){
      this.treeId = "budgeTreeDailog";
    }
    this.queryTree();
  }

  queryTree(){
    let th = this;
    if(th.dataUrl && th.dataUrl != 'getBudgetOrganizationDailgTree'){
      th.dataHttpServices[th.dataUrl](th.tenantid).subscribe((data:any) =>{
        if(data && data.errcode == 0){
          th.isDataErro = false;
            th.dataTree = data.data;
            th.setTree(0,th.dataTree);
        }else{
          th.isDataErro = true;
        }
      },(error: any) => {
      })
    }else if(th.dataUrl == 'getBudgetOrganizationDailgTree'){
      th.dataHttpServices[th.dataUrl](th.paramData).subscribe((data:any) =>{
        if(data && data.errcode == 0){
          th.isDataErro = false;
            th.dataTree = data.data;
            th.setTree(0,th.dataTree);
        }else{
          th.isDataErro = true;
        }
      },(error:any) =>{
      })
    }
    else{
      th.dataHttpServices.getBudgetTree(th.tenantid).subscribe((data:any) =>{
        if(data && data.errcode == 0){
          th.isDataErro = false;
            th.dataTree = data.data;
            th.setTree(0,th.dataTree);
        }else{
          th.isDataErro = true;
        }
      },(error: any) => {
      })
    }
    
  }

  setTree(type,data){
    let th = this;
    if(type == 0){
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
          key:{
            name:th.keyName?th.keyName:'projectName'
          }
        },
        callback: {
          beforeClick:function(treeId, treeNode, clickFlag){
            if(!th.isSelectChildren){
              return true;
            }else{
              if(treeNode.children.length == 0 || treeNode.isLeaf == '1'){
                return true;
              }else{
                return false;
              }
            }
          },
          onClick: function (event, treeId, treeNode) {
            var nodes = th.zTreeObj.transformToArray(treeNode);
            let idList = [];
            $.each(nodes,function(key,item){
              idList.push(item.id);
            });
            let treeNodeObj = {
              treeNode:treeNode,
              idList:idList
            };
            // if(th.keyName?th.keyName:'projectName')
            let keyW = th.keyName?th.keyName:'projectName';
            th.queryName = treeNode[keyW];
            th.show = false;
            th.selectNode.emit(treeNodeObj);
          }
        }
      }
      th.zTreeObj = $.fn.zTree.init($("#"+ th.treeId), th.setting, data);
      if(th.selectId){
        let selectNode = th.zTreeObj.getNodeByParam('id',th.selectId);
        let keyWs = th.keyName?th.keyName:'projectName';
        if(selectNode){
          th.queryName = selectNode[keyWs];
        }
        th.zTreeObj.selectNode(selectNode,false);
      }
      if(th.deleteId){
        let deleteNode = th.zTreeObj.getNodeByParam('id',th.deleteId);
        th.zTreeObj.removeNode(deleteNode);
      }
      // fuzzySearch('budgeTree','#key',null,true);
      let nodes = th.zTreeObj.getNodes();      
      th.setParams(nodes);
    }else{
      th.zTreeObj.updateNode(data);
    }
  }

  setParams(data){
    let th = this;
    if(data && data.length > 0){
      $.each(data,function(key,item){
        if(item.children && item.children.length > 0 ){
          th.setParams(item.children);
        }else{
          let node = th.zTreeObj.getNodeByTId(item.tId);
          node.children = "";
          node.isParent = false;
          th.setTree(1,node);
        }
      })
    }
  }

  resetSelect(){
    this.zTreeObj.refresh();
    this.queryName = "";
  }

  showTree(){
    if(this.disable){
      return;
    }
    this.show = !this.show;
  }

  ngOnDestroy(){
    let th = this;
    if(th.watchQueryTimeout){
      clearTimeout(th.watchQueryTimeout);
      th.watchQueryTimeout = "";
    }
    if(th.zTreeObj){
      th.zTreeObj.destroy(th.treeId);
    }
  }

}
