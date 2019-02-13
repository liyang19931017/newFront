import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzMessageService, UploadFile, NzModalService } from 'ng-zorro-antd';
import { environment } from './../../../environments/environment.dev';
import { CropperImgComponent } from './../upload-img/cropper-img/cropper-img.component';

@Component({
  selector: 'app-upload-img-text',
  templateUrl: './upload-img-text.component.html',
  styleUrls: ['./upload-img-text.component.less']
})
export class UploadImgTextComponent implements OnInit {

  @Input() fileList = [];
  @Input() imgUrl = "";
  @Input() className: any = "";
  @Input() account: any = 1;
  @Input() fileType: any = '';
  @Input() fileSize: any = '';
  @Input() width: any = '';
  @Input() height: any = '';
  @Input() showAdd: any = true;
  @Input() showType: any = 'picture-card';
  @Input() upload: any = function (item) {
  };
  @Output() fileChange = new EventEmitter();
  previewImage = '';
  previewVisible = false;


  constructor(
    private msg: NzMessageService,
    private modalService:NzModalService
  ) { }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  ngOnInit() {
    // this.imgUrl = environment.service + '/hlms/api/facilitator/file/upload/';
  }

  checkImg = (img: File) => {
    let th = this;
    if (th.fileType) {
      const isJPG = th.fileType.indexOf(img.type);
      if (isJPG == -1) {
        th.msg.error('图片格式不正确，请重新上传');
      }
      return isJPG >= 0;
    }
    if (th.fileSize) {
      const isLIMIT = img.size / 1024 / 1024 < th.fileSize;
      if (!isLIMIT) {
        th.msg.error('文件太大，请重新上传');
      }
      return isLIMIT;
    }
  }

  changeImg(info) {
    let th = this;
    if (info.type == 'error') {
      th.msg.error('网络出现问题，请重新上传');
      th.deleteOne(th.fileList.length - 1);
    }
    if (info.type == 'success') {

      if(th.width && th.height){
        var image = new Image();
        image.src = environment.imgUrl + info.file.response.data[0];
        image.onload = function(){
          if(image.width != th.width || image.height != th.height){
            th.cropperFun(info);
          }else{
            let finallyImg = info.fileList.pop();
            let fileListOne = {
              uid:finallyImg.uid,
              name:finallyImg.name,
              status:'done',
              url:environment.imgUrl + finallyImg.response.data[0],
              dataUrl:finallyImg.response.data[0]
            };
            let fileListCopy = JSON.parse(JSON.stringify(th.fileList));
            fileListCopy.push(fileListOne);
            th.fileList = fileListCopy;
            th.fileChange.emit(th.fileList);
          }
        }
      }else{
        let finallyImg = info.fileList.pop();
        let fileListOne = {
          uid:finallyImg.uid,
          name:finallyImg.name,
          status:'done',
          url:environment.imgUrl + finallyImg.response.data[0],
          dataUrl:finallyImg.response.data[0]
        };
        let fileListCopy = JSON.parse(JSON.stringify(th.fileList));
        fileListCopy.push(fileListOne);
        th.fileList = fileListCopy;
        th.fileChange.emit(th.fileList);
      }
    }
  }

  cropperFun = (info) =>{
    let th = this;
    let finallyImg = info.fileList.pop();
    let modal = th.modalService.create({
      nzTitle: "",
      nzContent: CropperImgComponent,
      nzClosable: false,
      nzMaskClosable:false,
      nzComponentParams: {
        config:{
          viewMode: 1,
          checkCrossOrigin: false,
          zoomable: true,
          guides: false,
          zoomOnWheel: true
        },
        settings:{
          width:th.width,
          height:th.height
        },
        url:environment.imgUrl + finallyImg.response.data[0],
      },
      nzWidth: '743px',
      nzFooter: null
    });

    modal.afterOpen.subscribe(() => {
      console.log('[afterOpen] emitted!')
    });
    modal.afterClose.subscribe((result) => {
      if(result.status == 'ok'){
        let fileListOne = {
          uid:finallyImg.uid,
          name:finallyImg.name,
          status:'done',
          url:environment.imgUrl + result.data.data,
          dataUrl: result.data.data
        };
        let fileListCopy = JSON.parse(JSON.stringify(th.fileList));
        fileListCopy.push(fileListOne);
        th.fileList = fileListCopy;
        th.fileChange.emit(th.fileList);
      }
      console.log('[afterClose] The result is:', result)
    });
  }

  deleteOne(index){
    let th = this;
    let fileListArry:any = JSON.stringify(th.fileList);
    fileListArry = JSON.parse(fileListArry);
    fileListArry.splice(-1,1);
    th.fileList = fileListArry;
    th.fileChange.emit(th.fileList);
  }

  remove = (file) => {
    let th = this;
    if(!th.showAdd){
      return;
    }
    let fileListCopy = JSON.parse(JSON.stringify(th.fileList));
    if(fileListCopy && fileListCopy.length > 0){
      for(var a = 0;a < fileListCopy.length; a ++){
        if(fileListCopy[a].dataUrl == file.dataUrl){
          fileListCopy.splice(a,1);
          th.fileList = fileListCopy;
          th.fileChange.emit(th.fileList);
          return false;
        }
      }
    }
    return false;
  }

  

}
