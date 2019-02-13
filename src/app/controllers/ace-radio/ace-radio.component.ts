import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ace-radio',
  templateUrl: './ace-radio.component.html',
  styleUrls: ['./ace-radio.component.less']
})
export class AceRadioComponent implements OnInit {

  constructor() { }

  @Input() value:any = "";
  @Input() options:any = [];

  @Output() change = new EventEmitter();

  ngOnInit() {
  }

  changeValue(item){
    this.change.emit(item);
  }

}
