import { Component, OnInit } from '@angular/core';
import { language } from './../../common/language-zh.service';

@Component({
  selector: 'app-home-bottom',
  templateUrl: './home-bottom.component.html',
  styleUrls: ['./home-bottom.component.less']
})
export class HomeBottomComponent implements OnInit {

  constructor() { }

  ace:any = language;

  ngOnInit() {
  }

}
