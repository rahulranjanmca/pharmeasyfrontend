

/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AuthService } from 'ng2-ui-auth';
import { AppState } from './app.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { GlobalService } from './common/global.service';
import { Subscription } from 'rxjs';


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ]
  , templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public userInfo: string[] = [];
  public loggedIn: boolean=false;
  public publicPages: string[] = ['/login'];
  public path: string = '';
  public clientInfoSubscribtion: Subscription;

  constructor(
    public appState: AppState,
    public authService: AuthService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private globalService: GlobalService

  ) {
  
  }

  public isSecured() {
    var ispublic = false;
    for (let publicPage of this.publicPages) {
      if (location.href.endsWith(publicPage)) {
        ispublic = true;
      }
    }
    return !ispublic;

  }

  public ngOnInit() {
   
    if (localStorage.getItem( 'access_token') != null &&
      localStorage.getItem('access_token') !== '') {
      
          this.loggedIn = true;
      
     
    }
    else {
      if (this.loggedIn === false && this.isSecured()) {
        this.router.navigate(['/login']);
      }
    }
    this.userInfo['token'] = this.authService.getToken();
  }



  public isMaps(path) {

    return false;
  }


}
