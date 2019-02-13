import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { language } from './../../common/language-zh.service';

@Component({
  selector: 'app-ace-textarea',
  templateUrl: './ace-textarea.component.html',
  styleUrls: ['./ace-textarea.component.less']
})
export class AceTextareaComponent implements OnInit {

  constructor() { }

  ace:any = language;

  @Input() placeholder:any = this.ace.InputTips;
  @Input() value:any = "";
  @Input() length:any = 300;
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

  change(value){
    this.valueChange.emit(this.value);
  }

  focusInput(){
    this.focus.emit();
  }

  blurInput(){
    this.blur.emit();
  }
}
