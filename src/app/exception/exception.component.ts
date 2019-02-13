import { Component, Input } from '@angular/core';

@Component({
    selector: 'exception',
    template: `
        <div style="-webkit-box-flex: 0;-ms-flex: 0 0 62.5%;flex: 0 0 62.5%;width: 62.5%;padding-right: 152px;zoom: 1;">
            <div class="img" style="height: 360px;width: 100%;max-width: 430px;float: right;background-repeat: no-repeat;
            background-position: 50% 50%;
            background-size: 100% 100%;" [style.background-image]="img_url"></div>
        </div>
        <div>
            <h1 style="color: #434e59;
            font-size: 72px;
            font-weight: 600;
            line-height: 72px;
            margin-bottom: 24px;">{{type}}</h1>
            <div style="    color: rgba(0,0,0,.45);
            font-size: 20px;
            line-height: 28px;
            margin-bottom: 16px;">{{content}}</div>

        </div>
        
    `
})

export class ExceptionComponent {
    @Input() img_url;
    @Input() type;
    @Input() content;
}