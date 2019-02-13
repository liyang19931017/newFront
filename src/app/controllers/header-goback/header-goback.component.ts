import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-goback',
  templateUrl: './header-goback.component.html',
  styleUrls: ['./header-goback.component.less']
})
export class HeaderGobackComponent implements OnInit {

  constructor() { }

  @Input() name:any = "返回全部应用";
  @Input() title:any = "";
  @Input() detail:any = "";
  @Output() goBack:any = new EventEmitter();

  ngOnInit() {
  }

  goback(){
    this.goBack.emit();
  }

}
