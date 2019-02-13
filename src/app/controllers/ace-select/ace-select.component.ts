import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { language } from './../../common/language-zh.service';

@Component({
  selector: 'app-ace-select',
  templateUrl: './ace-select.component.html',
  styleUrls: ['./ace-select.component.less']
})
export class AceSelectComponent implements OnInit {

  constructor() { }

  ace:any = language;

  @Input() select:any = "";
  @Input() options:any = [];
  @Input() allowClear:any = false;
  @Input() disabled:any = false;
  @Input() width:any = '200px';
  @Output() valueChange = new EventEmitter();
  @Input() placeholder:any = this.ace.SelectTips;

  ngOnInit() {
  }

  change(value){
    console.log(value);
    this.valueChange.emit(value);
  }

}
