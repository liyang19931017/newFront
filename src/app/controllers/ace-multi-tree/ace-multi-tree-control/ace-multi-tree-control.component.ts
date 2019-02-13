import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ace-multi-tree-control',
  templateUrl: './ace-multi-tree-control.component.html',
  styleUrls: ['./ace-multi-tree-control.component.less']
})
export class AceMultiTreeControlComponent implements OnInit {

  @Input() treeData: any = [];
  treeDataCopy: any = [];
  @Input() keyName: any = 'name';
  @Input() parent: any;
  @Input() disableInfluence:any = false;
  @Output() selectChange = new EventEmitter;
  index = 500;
  watchPuDataTimeout:any = "";

  constructor() { }

  ngOnInit() {
  }

  updateAllChecked(treeDataOne) {
    console.log(treeDataOne);
    let th = this;
    var updateAllCheckedFun = function name(treeNode) {
      treeNode.halfChecked = false;
      if (treeNode.checked) {
        if (treeNode.children && treeNode.children.length > 0) {
          treeNode.children.forEach(item => {
            if(!th.disableInfluence || !item.disable){
              item.checked = true;
              updateAllCheckedFun(item);
            }
          });
        }
      } else {
        if (treeNode.children && treeNode.children.length > 0) {
          treeNode.children.forEach(item => {
            if(!th.disableInfluence || !item.disable){
              item.checked = false;
              updateAllCheckedFun(item);
            }
          });
        }
      }
    }

    updateAllCheckedFun(treeDataOne)

    th.updateParentChecked();
  }

  updateParentChecked() {
    let th = this;
    if (th.parent) {
      if (th.parent.children.every(item => item.checked === false)) {
        th.parent.checked = false;
        th.parent.halfChecked = false;
      } else if (th.parent.children.every(item => item.checked === true)) {
        th.parent.checked = true;
        th.parent.halfChecked = false;
      } else {
        th.parent.halfChecked = true;
      }
      th.selectChange.emit(th.parent);
    }
  }

  selectChangeFun() {
    this.updateParentChecked();
  }

  setIndex(){
    this.index = this.index + 500;
  }
}
