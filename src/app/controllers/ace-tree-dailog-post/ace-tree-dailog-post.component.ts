import { EventEmitter, Component, OnInit, Output, Input } from '@angular/core';
import { dataHttpService } from '../../common/data-http.service';
import { CookieService } from '../../common/cookie.service';
declare var $: any;
declare var fuzzySearch: any;

@Component({
  selector: 'app-ace-tree-dailog-post',
  templateUrl: './ace-tree-dailog-post.component.html',
  styleUrls: ['./ace-tree-dailog-post.component.less']
})
export class AceTreeDailogPostComponent implements OnInit {

  @Input() dataUrl;
  @Input() keyName;
  @Input() selectId;
  @Input() paramData;
  @Input() treeId:any;
  @Input() disable:any;
  @Input() isSelectChildren;
  @Input() deleteId = '1';
  @Input() selectName = '';
  // @Input() selectId2:any;
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
  firstSetId:any = false;
  
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
    if(th.firstSetId){
      th.queryName = "";
      let treeNode = {};
      treeNode['id'] = "";
      if(th.keyName){
        treeNode[th.keyName] = "";
      }else{
        treeNode['projectName'] = "";
      }
      let treeNodeObj = {
        treeNode:treeNode,
        idList:[]
      };
      th.selectNode.emit(treeNodeObj);
    }else{
      th.firstSetId = true;
    }

    if(th.dataUrl){
      th.dataHttpServices[th.dataUrl](th.paramData).subscribe((data:any) =>{
        if(data && data.errcode == 0){
          th.isDataErro = false;
            th.dataTree = data.data;
            $.each(th.dataTree,function(key,item){
              item.preNodeArry = [];
              $.each(th.dataTree,function(keyOne,itemOne){
                if(key != keyOne){
                  let dataOne = {};
                  dataOne[th.keyName] = itemOne[th.keyName];
                  dataOne['id'] = itemOne.id;
                  item.preNodeArry.push(dataOne);
                }
              });
            });
            th.setTree(0,th.dataTree);
        }else{
          th.isDataErro = true;
        }
      },(error: any) => {
        console.log(error);
      })
    }else{
      th.dataHttpServices.getBudgetOrganizationDailgTree(th.paramData).subscribe((data:any) =>{
        if(data && data.errcode == 0){
          th.isDataErro = false;
            th.dataTree = data.data;
            $.each(th.dataTree,function(key,item){
              item.preNodeArry = [];
              $.each(th.dataTree,function(keyOne,itemOne){
                if(key != keyOne){
                  let dataOne = {};
                  dataOne[th.keyName] = itemOne[th.keyName];
                  dataOne['id'] = itemOne.id;
                  item.preNodeArry.push(dataOne);
                }
              });
            });
            th.setTree(0,th.dataTree);
        }else{
          th.isDataErro = true;
        }
      },(error: any) => {
        console.log(error);
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
        }else{
          if(!th.queryName){
            th.queryName = th.selectName;
          }
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

  setParChil(treeNode){
    if(!treeNode){
      return;
    }
    let th = this;
    let treeParent = treeNode.getParentNode();
    th.queryName = "";
    if(treeParent){
      let treeData = {
        id:treeParent.id,
        tenantId:treeParent.tenantId,
        accountCode:treeParent.accountCode,
        accountName:treeParent.accountName,
        parentId:treeParent.parentId,
        accountLevel:treeParent.accountLevel,
        children:[],
        isParent:true
      }
      $.each(treeParent.children,function(key,item){
        if(item.id != treeNode.id){
          treeData.children.push({
            id:item.id,
            tenantId:item.tenantId,
            accountCode:item.accountCode,
            accountName:item.accountName,
            parentId:item.parentId,
            accountLevel:item.accountLevel,
            children:[],
            isParent:false
          })
        }
      });
      th.zTreeObj = $.fn.zTree.init($("#"+ th.treeId), th.setting,treeData);
    }else{
      let treeData = [];
      th.zTreeObj = $.fn.zTree.init($("#"+ th.treeId), th.setting,treeData);
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

  restSelect(){
    this.zTreeObj.refresh();
    this.queryName = "";
  }


  showTree(){
    if(this.disable){
      return;
    }
    this.show = !this.show;
  }
  getTreeNodeById(id){
    let th = this;
    let treeNodeData =  th.zTreeObj.getNodeByParam('id',id);
    return treeNodeData;
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
