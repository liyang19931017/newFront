import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class CookieService {

  constructor(private router: Router, private route: ActivatedRoute) { }

  setCookie(cname, cvalue, exdays) {
    let th = this;
    if(exdays != 0){
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
    }else{
      document.cookie = cname + "=" + cvalue + ";;path=/";
    }
  }

  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }
    }
    return "";
  }

}


