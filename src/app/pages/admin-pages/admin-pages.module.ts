import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ControllersModuleModule } from './../../controllers/controllers-module.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AdminRoutingModule } from './admin-pages-routing.module';

const MODULE = [
  AdminRoutingModule,
  ControllersModuleModule,
  FormsModule,
  NgZorroAntdModule.forRoot(),
];
const COMPONENT = [
];
const COMPONENT_INNER = [
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

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AdminPagesModule { }
