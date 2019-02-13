import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { language } from './../../common/language-zh.service';

@Component({
  selector: 'app-ace-input',
  templateUrl: './ace-input.component.html',
  styleUrls: ['./ace-input.component.less']
})
export class AceInputComponent implements OnInit {

  constructor() { }

  ace: any = language;
  @Input() disabled: boolean = false;
  @Input() width:any = '200px';
  @Input() placeholder: any = this.ace.InputTips;
  @Input() value: any = "";
  @Input() direction: any = "right";
  @Input() length: any = "";
  @Output() valueChange = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Input() showError:any = {
    inputTips:'',
    error:false,
    inputError:false
  };

  ngOnInit() {
  }

  change(value) {
    this.valueChange.emit(this.value);
  }

  focusInput(){
    this.focus.emit();
  }

  blurInput(){
    this.blur.emit();
  }

}
