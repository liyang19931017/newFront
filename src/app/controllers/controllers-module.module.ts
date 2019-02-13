import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeBottomComponent } from './home-bottom/home-bottom.component';
import { HeaderGobackComponent } from './header-goback/header-goback.component';
import { AceInputComponent } from './ace-input/ace-input.component';
//ant 0.7.1
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AceSelectComponent } from './ace-select/ace-select.component';
import { AceVersionSelectComponent } from './ace-version-select/ace-version-select.component';
import { AceTextareaComponent } from './ace-textarea/ace-textarea.component';
import { UploadImgComponent } from './upload-img/upload-img.component';
import { AceSteptabComponent } from './ace-steptab/ace-steptab.component';
import { AceRadioComponent } from './ace-radio/ace-radio.component';
import { UploadImgTextComponent } from './upload-img-text/upload-img-text.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AceMultySelectComponent } from './ace-multy-select/ace-multy-select.component';
import { CropperImgComponent } from './upload-img/cropper-img/cropper-img.component';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { AceCountTextareaComponent } from './ace-count-textarea/ace-count-textarea.component';
import { AceTableComponent } from './ace-table/ace-table.component';
import { AceMultiTreeComponent } from './ace-multi-tree/ace-multi-tree.component';
import { AceMultiTreeControlComponent } from './ace-multi-tree/ace-multi-tree-control/ace-multi-tree-control.component';
import { AceSingleTreeComponent } from './ace-single-tree/ace-single-tree.component';
import { AceTreeDailogPostComponent } from './ace-tree-dailog-post/ace-tree-dailog-post.component';
import { AceTreeDailogComponent } from './ace-tree-dailog/ace-tree-dailog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularCropperjsModule,
    NgZorroAntdModule.forRoot()
  ],

  declarations: [HomeHeaderComponent, HomeBottomComponent, HeaderGobackComponent, AceInputComponent, AceSelectComponent, AceVersionSelectComponent, AceTextareaComponent, 
    UploadImgComponent, AceSteptabComponent, AceRadioComponent, UploadImgTextComponent, AdminHeaderComponent, AceMultySelectComponent, CropperImgComponent,
    AceCountTextareaComponent, AceTableComponent, AceMultiTreeComponent,AceMultiTreeControlComponent, AceSingleTreeComponent, AceTreeDailogPostComponent, AceTreeDailogComponent],

  providers:[],

  exports:[HomeHeaderComponent,HomeBottomComponent,HeaderGobackComponent,AceInputComponent,AceSelectComponent,AceVersionSelectComponent,AceTextareaComponent,
    UploadImgComponent,AceSteptabComponent,AceRadioComponent,UploadImgTextComponent,AdminHeaderComponent,AceMultySelectComponent,AceCountTextareaComponent,
    AceTableComponent,AceMultiTreeComponent,AceMultiTreeControlComponent,AceSingleTreeComponent,AceTreeDailogPostComponent,AceTreeDailogComponent],

  entryComponents:[CropperImgComponent]
})
export class ControllersModuleModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: ControllersModuleModule,
    };
}
 }
