import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { dataHttpService } from './../../common/data-http.service';
declare var $: any;

@Component({
  selector: 'app-ace-multi-tree',
  templateUrl: './ace-multi-tree.component.html',
  styleUrls: ['./ace-multi-tree.component.less']
})
export class AceMultiTreeComponent implements OnInit {

  constructor(
    private dataHttpService:dataHttpService,
  ) { }

  @Input() isNeedQuery:any = true; //是否需要搜索Input框，默认是需要的
  @Input() dataUrl;  //请求的url，在dataConfig文件中配置完，直接传参进来方法名就行
  @Input() dataMethod = "getUrl"; //请求的方式，只有两种，getUrl和其他，getUrl是路径参数，其他为body里面组装参数
  @Input() dataParams;    //请求的参数组装好传进来
  @Input() keyName;     //树用来展示获取数据中的object中的哪个key值名称
  @Input() disableInfluence:any = false;
  @Output() complateCallback = new EventEmitter();  //第一个数据

  zTreeObj: any;  //树对象
  setting: {};    //树的设置
  queryName: any = "";  //查询的value值
  zNodes: any;
  tenantid = "";
  dataHttpServices:any = this.dataHttpService.getAllDataService();
  isNetErro: any = false;  //是否网络问题
  isDataErro: any = false;  //是否数据错误
  dataTree: any;   //获取的树数据
  watchQueryTimeout: any;  //多长时间查询一次
  loading: any = true; //控制是否显现loading
  dataArry:any = [];

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
        } else if (data.data && data.data.length == 0) {
          th.dataTree = data.data;
        }
        th.setDataArry(th.dataTree);
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

  setDataArry(data){
    let th = this;
    var getDataArry = function(treeNode,parent){
      let parentIdArry:any = [];
      if(parent){
        parentIdArry =JSON.stringify(parent.parentIdArry);
        parentIdArry = JSON.parse(parentIdArry);
        parentIdArry.push(parent.id);
      }
      if(treeNode && treeNode.length > 0){
        $.each(treeNode,function(index,item){
          item.parentIdArry = parentIdArry;
          th.dataArry.push(item);
          if(item.children && item.children.length > 0){
            getDataArry(item.children,item);
          }
        });
      }
    }
    getDataArry(data,'');

    th.complateCallback.emit();
    
  }

  queryNameFun(value){
    let th = this;
    let idShowArry = [];
    if(th.dataArry && th.dataArry.length > 0){
      if(value != ''){
        $.each(th.dataArry,function(key,item){
          item.notShow = true;
          if(item[th.keyName].indexOf(value) > -1){
            $.each(item.parentIdArry,function(keyOne,itemOne){
              if(idShowArry.indexOf(itemOne) == -1){
                idShowArry.push(itemOne);
              }
            });
            if(idShowArry.indexOf(item.id) == -1){
              idShowArry.push(item.id);
            }
          }
        });
        $.each(th.dataArry,function(key,item){
          if(idShowArry.indexOf(item.id) > -1){
            item.open = true;
            item.notShow = false;
          }
        });
      }else{
        $.each(th.dataArry,function(key,item){
          item.notShow = false;
        });
      }
      
    }
  }

  changeQueryName(value){
    let th = this;
    if(th.watchQueryTimeout){
      clearTimeout(th.watchQueryTimeout);
      th.watchQueryTimeout = "";
    }
    th.watchQueryTimeout = setTimeout(() => {
      th.queryNameFun(value);
    }, 500);
  }

  getTreeNodeById(id){
    let th = this;
    if(th.dataArry && th.dataArry.length > 0){
      for(var a = 0;a < th.dataArry.length;a ++){
        if(th.dataArry[a].id == id){
          return th.dataArry[a];
        }
      }
    }
  }

  getTreeNodeByIdAndKey(id,key){
    let th = this;
    if(th.dataArry && th.dataArry.length > 0){
      for(var a = 0;a < th.dataArry.length;a ++){
        if(th.dataArry[a][key] == id){
          return th.dataArry[a];
        }
      }
    }
  }

  getSelectedArry(){
    let th = this;
    let selectArry = [];
    if(th.dataArry && th.dataArry.length > 0){
      $.each(th.dataArry,function(key,item){
        if(item.checked){
          selectArry.push(item);
        }
      })
    }
    return selectArry;
  }

  getSelectedAndHalfcheckedArry(){
    let th = this;
    let selectAndHalfCheckArry = [];
    if(th.dataArry && th.dataArry.length > 0){
      $.each(th.dataArry,function(key,item){
        if(item.checked || item.halfChecked){
          selectAndHalfCheckArry.push(item);
        }
      })
    }
    return selectAndHalfCheckArry;
  }

  updateStatus(){
    let th = this;
    for(var a = th.dataArry.length - 1;a >= 0;a --){
      if(th.dataArry[a].children && th.dataArry[a].children.length > 0){
        th.updataTreeStatus(th.dataArry[a]);
      }
    }
    // $.each(th.dataArry,function(key,item){
    //   if(item.children && item.children.length > 0){
    //     th.updataTreeStatus(item);
    //   }
    // })
  }

  updataTreeStatus(treeNode){
    if (treeNode.children.every(item => item.checked === false)) {
      treeNode.checked = false;
      treeNode.halfChecked = false;
    } else if (treeNode.children.every(item => item.checked === true)) {
      treeNode.checked = true;
      treeNode.halfChecked = false;
    } else {
      treeNode.halfChecked = true;
    }
  }

}
