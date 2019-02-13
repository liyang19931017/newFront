import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'exception-404',
    template: `<exception [type]="type" [content]="content" [img_url]="url" style="display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center;
    align-items: center;
    height: 100%;min-height: 500px; height: 80%;"></exception>`
})
export class Exception404Component implements OnInit {
    type = '404';
    content = '抱歉，你访问的页面不存在';
    url = 'url("assets/img/404.svg")';

    ngOnInit() {
        //禁用浏览器后退操作
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });
    }
}