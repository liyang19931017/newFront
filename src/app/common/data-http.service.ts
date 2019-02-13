import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {dataConfig} from './data-config.service';
import { CookieService } from './cookie.service';
declare var $:any;
@Injectable()
export class dataHttpService {

  constructor(
      public http: HttpClient,
      private CookieService: CookieService
    ) { }

  data:any = {};

  dataConfigs:any = dataConfig;

//   http:any = HttpClient;

  getAllDataService(){
      let th = this;
      let https = this.http;
      let data = this.data;
      let dataConfigs = this.dataConfigs;
      $.each(dataConfigs.data,function(name,api){
        if (dataConfigs.simulate) {
            data[name] = function (param) {
                let paramsUrl = "";
                $.each(param,function(key,value){
                    if(paramsUrl){
                        paramsUrl = paramsUrl + '&' + key + '=' + value;
                    }else{
                        paramsUrl = paramsUrl + key + '=' + value
                    }
                });
                const params = new HttpParams({fromString: paramsUrl});
                return https.get(api.simulateUrl, {params});
            };
        } else {
            if (api.simulate) {
                data[name] = function (param) {
                    let paramsUrl = "";
                    $.each(param,function(key,value){
                        if(paramsUrl){
                            paramsUrl = paramsUrl + '&' + key + '=' + value;
                        }else{
                            paramsUrl = paramsUrl + key + '=' + value
                        }
                    });
                    const params = new HttpParams({fromString: paramsUrl});
                    return https.get(api.simulateUrl, {params});
                };
            } else {
                if (api.method == "post") {
                    data[name] = function (param,header) {
                        if(!header || (header && !header.headers)){
                           let headers = new HttpHeaders().set('Authorization', th.CookieService.getCookie('token'));
                           header = {
                            headers:headers
                           }
                        }
                        if(header){
                            if(api.httpUrlType){
                                return https.post(dataConfigs.httpUrl? dataConfigs.httpUrl + dataConfigs.path + api.url:dataConfigs[api.httpUrlType] + dataConfigs.path + api.url, param,header);
                            }else{
                                return https.post(dataConfigs.httpUrl? dataConfigs.httpUrl + dataConfigs.path + api.url:(<any>window).environment.budget + dataConfigs.path + api.url, param,header);
                            }

                        }else{
                            if(api.httpUrlType){
                                return https.post(dataConfigs.httpUrl? dataConfigs.httpUrl + dataConfigs.path + api.url:dataConfigs[api.httpUrlType] + dataConfigs.path + api.url, param);
                            }else{
                                return https.post(dataConfigs.httpUrl? dataConfigs.httpUrl + dataConfigs.path + api.url:(<any>window).environment.budget + dataConfigs.path + api.url, param);;
                            }

                        }
                    };
                }
                else if(api.method == "put"){
                    data[name] = function (param,header) {
                        if(!header || (header && !header.headers)){
                            let headers = new HttpHeaders().set('Authorization', th.CookieService.getCookie('token'));
                            header = {
                             headers:headers
                            }
                         }
                        if(header){
                            if(api.httpUrlType){
                                return https.put(dataConfigs.httpUrl? dataConfigs.httpUrl + dataConfigs.path + api.url:dataConfigs[api.httpUrlType] + dataConfigs.path + api.url, param,header);
                            }else{
                                return https.put(dataConfigs.httpUrl? dataConfigs.httpUrl + dataConfigs.path + api.url:(<any>window).environment.budget + dataConfigs.path + api.url, param,header);
                            }
                        }else{
                            if(api.httpUrlType){
                                return https.put(dataConfigs.httpUrl? dataConfigs.httpUrl + dataConfigs.path + api.url:dataConfigs[api.httpUrlType] + dataConfigs.path + api.url, param);
                            }else{
                                return https.put(dataConfigs.httpUrl? dataConfigs.httpUrl + dataConfigs.path + api.url:(<any>window).environment.budget + dataConfigs.path + api.url, param);
                            }
                        }

                    };
                }
                else if(api.method == "delete"){
                    data[name] = function (param,header) {
                        let paramsUrl = "";
                        $.each(param,function(key,value){
                            if(paramsUrl){
                                paramsUrl = paramsUrl + '&' + key + '=' + value;
                            }else{
                                paramsUrl = paramsUrl + key + '=' + value
                            }
                        });
                        if(dataConfigs.httpUrl){
                            if(paramsUrl){
                                paramsUrl = dataConfigs.httpUrl + dataConfigs.path + api.url + '?' + paramsUrl;
                            }else{
                                paramsUrl = dataConfigs.httpUrl + dataConfigs.path + api.url;
                            }
                        }else{
                            if(paramsUrl){
                                if(api.httpUrlType){
                                    paramsUrl = dataConfigs[api.httpUrlType] + dataConfigs.path + api.url + '?' + paramsUrl;
                                }else{
                                    paramsUrl = (<any>window).environment.budget + dataConfigs.path + api.url + '?' + paramsUrl;
                                }

                            }else{
                                if(api.httpUrlType){
                                    paramsUrl =  dataConfigs[api.httpUrlType] + dataConfigs.path + api.url;
                                }else{
                                    paramsUrl =  (<any>window).environment.budget + dataConfigs.path + api.url;
                                }

                            }
                        }
                        if(!header || (header && !header.headers)){
                            let headers = new HttpHeaders().set('Authorization', th.CookieService.getCookie('token'));
                            header = {
                             headers:headers
                            }
                         }
                        if(header){
                            return https.delete(paramsUrl, header);
                        }else{
                            return https.delete(paramsUrl);
                        }
                    };
                }
                else if(api.method == 'getUrl'){
                    data[name] = function (param,header) {
                        let paramsUrl = "";
                        if(dataConfigs.httpUrl){
                            paramsUrl = dataConfigs.httpUrl + dataConfigs.path + api.url + param;
                        }else{
                            if(api.httpUrlType){
                                paramsUrl = dataConfigs[api.httpUrlType] + dataConfigs.path + api.url + param;
                            }else{
                                paramsUrl = (<any>window).environment.budget + dataConfigs.path + api.url + param;
                            }
                        }
                        if(!header || (header && !header.headers)){
                            let headers = new HttpHeaders().set('Authorization', th.CookieService.getCookie('token'));
                            header = {
                             headers:headers
                            }
                         }
                        if(header){
                            return https.get(paramsUrl, header);
                        }else{
                            return https.get(paramsUrl);
                        }
                    }
                }
                else {
                    data[name] = function (param,header) {
                        let paramsUrl = "";
                        $.each(param,function(key,value){
                            if(paramsUrl){
                                paramsUrl = paramsUrl + '&' + key + '=' + value;
                            }else{
                                paramsUrl = paramsUrl + key + '=' + value
                            }
                        });
                        if(dataConfigs.httpUrl){
                            if(paramsUrl){
                                paramsUrl = dataConfigs.httpUrl + dataConfigs.path + api.url + '?' + paramsUrl;
                            }else{
                                paramsUrl = dataConfigs.httpUrl + dataConfigs.path + api.url;
                            }

                        }else{
                            if(paramsUrl){
                                if(api.httpUrlType){
                                    paramsUrl = dataConfigs[api.httpUrlType] + dataConfigs.path + api.url + '?' + paramsUrl;
                                }else{
                                    paramsUrl = (<any>window).environment.budget + dataConfigs.path + api.url + '?' + paramsUrl;
                                }

                            }else{
                                if(api.httpUrlType){
                                    paramsUrl =  dataConfigs[api.httpUrlType] + dataConfigs.path + api.url;
                                }else{
                                    paramsUrl =  (<any>window).environment.budget + dataConfigs.path + api.url;
                                }

                            }
                        }
                        if(!header || (header && !header.headers)){
                            let headers = new HttpHeaders().set('Authorization', th.CookieService.getCookie('token'));
                            header = {
                             headers:headers
                            }
                         }
                        if(header){
                            return https.get(paramsUrl,header);
                        }else{
                            return https.get(paramsUrl);
                        }

                    };
                }
            }
        }
      })
      return data;
  }



}


