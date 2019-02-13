import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { language } from './../../common/language-zh.service';

@Component({
  selector: 'app-ace-multy-select',
  templateUrl: './ace-multy-select.component.html',
  styleUrls: ['./ace-multy-select.component.less']
})
export class AceMultySelectComponent implements OnInit {

  constructor() { }

  ace:any = language;

  @Input() select:any = "";
  @Input() length:any = "";
  @Input() options:any = [];
  @Input() allowClear:any = false;
  @Input() disabled:any = false;
  @Output() valueChange = new EventEmitter();
  @Input() placeholder:any = this.ace.SelectTips;

  ngOnInit() {
  }

  change(value){
    this.select = value;
    console.log(value);
    this.valueChange.emit(this.select);
  }

}
