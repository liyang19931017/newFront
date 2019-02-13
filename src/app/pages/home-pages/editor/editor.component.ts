import { Component, OnInit, ViewChild } from '@angular/core';
import { UEditorComponent } from 'ngx-ueditor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent implements OnInit {

  constructor() { }

  @ViewChild('full') full: UEditorComponent;

  full_source: any;

  config: any = {
    initialFrameWidth: '59%',
    initialFrameHeight: '500',
    imageScaleEnabled: false,
    imagePopup: false,
    allowDivTransToP: false,
    autoHeightEnabled: false,
    serverUrl: "",
    topOffset: "50",
    zIndex: "9",
    toolbars: [['undo', 'redo', "bold", "underline", "fontborder", "forecolor", "|", "paragraph", "|", "indent", "justifyleft", "justifycenter", "justifyright", "justifyjustify", "touppercase", "tolowercase", "|", "spechars", "searchreplace", "drafts"]]
  };

  ngOnInit() {
  }

  ready(ueditor) {
    let th = this;
    ueditor.addListener('contentChange', function () {
      var html = th.full.Instance.getContent();
    })
  }

}
