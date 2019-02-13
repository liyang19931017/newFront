import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { ControllersModuleModule } from './../../controllers/controllers-module.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TableComponent } from './table/table.component';
import { TableAddComponent } from './table/table-add/table-add.component';
import { EditorComponent } from './editor/editor.component';
import { UEditorModule } from 'ngx-ueditor';

const MODULE = [
  HomeRoutingModule,
  ControllersModuleModule,
  FormsModule,
  NgZorroAntdModule.forRoot(),
  UEditorModule.forRoot(
    {
      // 指定ueditor.js路径目录
      path: '../assets/ueditor/',
      // 默认全局配置项
      options: {
        themePath: '../assets/ueditor/themes/',
        wordCount: true,
        maximumWords: '9999'
      }
    }
  ),
];
const COMPONENT = [
  TableComponent,
  EditorComponent
];
const COMPONENT_INNER = [
  TableAddComponent
]

@NgModule({
  imports: [
    ...MODULE,
    CommonModule
  ],
  declarations: [
    ...COMPONENT,
    ...COMPONENT_INNER,
  ],
  entryComponents: [
    ...COMPONENT_INNER
  ]
})
export class HomeModule { }
