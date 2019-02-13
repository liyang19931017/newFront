import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ace-version-select',
  templateUrl: './ace-version-select.component.html',
  styleUrls: ['./ace-version-select.component.less']
})
export class AceVersionSelectComponent implements OnInit {

  constructor() { }

  @Input() select:any = {};
  @Input() options:any = [];
  @Output() changeSelect:any = new EventEmitter();

  colorArry = ["#5398C7",'#F5A623',"#7ED321"]

  ngOnInit() {
  }

  selectTab(item){
    let th = this;
    if(item.id == th.select.id){
      return;
    }
    th.changeSelect.emit(item);
  }

}
