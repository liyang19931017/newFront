import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from './common/cookie.service';
import { dataHttpService } from './common/data-http.service';
import { AppComponent } from './app.component';
import { AppRouteModule } from './route/app-route.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HlmsInterceptorService } from './common/hlms-interceptor.service';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HomeComponent } from './pages/home/home.component';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { ControllersModuleModule } from './controllers/controllers-module.module';
import { Exception404Component } from './exception/404.component';
import { LoginComponent } from './pages/login/login.component';
import { RetrievePasswordComponent } from './pages/retrieve-password/retrieve-password.component';
import { RegisterComponent } from './pages/register/register.component';
import { ExceptionComponent } from './exception/exception.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminComponent } from './pages/admin/admin.component';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    Exception404Component,
    ExceptionComponent,
    AdminComponent,
    RetrievePasswordComponent,
    RegisterComponent,
    AdminLoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRouteModule,
    AngularCropperjsModule,
    NgZorroAntdModule.forRoot(),
    ControllersModuleModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HlmsInterceptorService, multi: true },
    CookieService,
    dataHttpService,
    // { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
