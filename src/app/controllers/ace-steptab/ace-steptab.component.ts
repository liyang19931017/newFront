import { Component, OnInit, Input } from '@angular/core';
import { AceInputComponent } from '../ace-input/ace-input.component';

@Component({
  selector: 'app-ace-steptab',
  templateUrl: './ace-steptab.component.html',
  styleUrls: ['./ace-steptab.component.less']
})
export class AceSteptabComponent implements OnInit {

  constructor() { }

  @Input() selectNumber:any = 0;
  @Input() tabArry:any = [];
  width:any = '100%';

  ngOnInit() {
    let x = 0;
    this.width = Math.round(100*100 / this.tabArry.length) / 100 + '%';
    console.log(this.width);
  }

}
