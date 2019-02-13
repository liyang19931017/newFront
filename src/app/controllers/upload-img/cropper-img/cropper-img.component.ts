import { Component, OnInit,Input, ViewChild} from '@angular/core';
import { AngularCropperjsComponent } from 'angular-cropperjs';
import { dataHttpService } from './../../../common/data-http.service';
import { CookieService } from './../../../common/cookie.service';
import { NzModalRef, NzModalService, NzMessageService } from 'ng-zorro-antd';
declare var $: any;

@Component({
  selector: 'app-cropper-img',
  templateUrl: './cropper-img.component.html',
  styleUrls: ['./cropper-img.component.less']
})
export class CropperImgComponent implements OnInit {

  constructor(
    private modal: NzModalRef,
    private modalService: NzModalService,
    private message: NzMessageService,
    private dataHttpService: dataHttpService,
    private cookieService: CookieService,
  ) { }

  @ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;

  @Input() config = {
    aspectRatio: 16 / 6.5,
    viewMode: 1,
    checkCrossOrigin: false,
    zoomable: true,
    guides: false,
    zoomOnWheel: true
  };

  userId:any = this.cookieService.getCookie('id');
  token:any = this.cookieService.getCookie('token');
  service:any = this.dataHttpService.getAllDataService();

  @Input() settings:any = {};

  show:any = false;

  @Input() url:any = "";

  ngOnInit() {
    this.show = true;
  }

  save(){
    let th = this;
    if (th.angularCropper == undefined) {
      th.modalService.info({
        nzTitle: '请先上传图片！'
      });
      return;
    }
    if (th.angularCropper && th.angularCropper.isLoading === true) {
      return;
    }
    if (th.url !== '' && th.angularCropper.cropper) {
      let cancas = th.angularCropper.cropper.getCroppedCanvas()
      let base64all = cancas.toDataURL();
      let param = {
        userId: th.userId,
        token: th.token,
        imgStr: base64all
      };

      th.service.uploadForBase64(param).subscribe((data: any) => {
        if (data.errcode == '200') {
          console.log(data);
          th.modal.destroy({status:'ok',data:data});
        }else {
          this.modalService.error({
            nzTitle:data.errmsg
          });
        }
      })
    }
    
    
  }

  cancel(){
    let th = this;
    if (th.angularCropper && th.angularCropper.cropper) {
      th.angularCropper.cropper.destroy()
    }
    th.modal.destroy({status:'cancel'});
  }

}
