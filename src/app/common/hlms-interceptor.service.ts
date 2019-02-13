import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { CookieService } from './cookie.service';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Injectable()
export class HlmsInterceptorService implements HttpInterceptor {

  constructor(
    private CookieService: CookieService,
    private modalService: NzModalService,
    private router: Router
  ) { }

  index: any = 0;
  noValidArr = ['hlms/api/tenant/logo/login/query', 'hlms/api/tenant/login/getTenantInfoByCode']

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let th = this;
    let tenantId = this.CookieService.getCookie('tenantid');
    let userId = this.CookieService.getCookie('hlmsUserid');
    const authReq = req.clone({
      url: (req.url)  //对任意请求的url添加token参数
    });
    return next.handle(authReq).pipe(mergeMap((event: any) => {
      if (event instanceof HttpResponse && event.status != 200) {
        return ErrorObservable.create(event);
      }
      return Observable.create(observer => observer.next(event)); //请求成功返回响应
    }),
      catchError((res: HttpResponse<any>) => { //请求失败处理
        switch (res.status) {
          case 401:
            break;
          case 200:
            console.log('业务错误');
            break;
          case 304:
            console.log('token失效');
            th.openErrorMode304();
            break;
          case 404:
            break;
          case 403:
            console.log('业务错误');
            break;
          case 500:
            console.log('系统服务错误');
          break;
        }
        return ErrorObservable.create(event);
      }));
  }

  openErrorMode304() {
    let th = this;
    th.index++;
    if (th.index > 1) {
      return;
    }
    setTimeout(function () {
      th.modalService.info({
        nzTitle: '用户登录时间过长，请重新登录',
        nzMaskClosable: false,
        nzOnOk() {
          th.index = 0;
          if(location.pathname.indexOf('admin') > -1){
            th.router.navigate(['/adminLogin']);
          }else{
            th.router.navigate(['/login']);
          }
        }
      });
    }, 500)
  }

}
