/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnChanges,
  ViewEncapsulation,
  Inject
} from '@angular/core';
import { AuthService } from 'ng2-ui-auth';
import { AppState } from '../app.service';
import { Observable } from 'rxjs/Rx';
import { Router } from "@angular/router";
import { GlobalService } from "./../common/global.service";
import { AbstractEntity } from "./../common/abstract.entity";
import { ActivatedRoute } from '@angular/router';
import { ConfigService, CustomConfig } from 'ng2-ui-auth';



/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None
  , templateUrl: '../html/login.component.html'
})
export class LoginComponent  {
  authClientId: string;
  current: AbstractEntity;
  constructor(
    public authService: AuthService,
    private router: Router,
    public globalService: GlobalService,
    private activatedRoute: ActivatedRoute,
    private configService: ConfigService,
    @Inject("urls") private urls: Map<String, any>

  ) {
    if (localStorage.getItem("access_token") != null && localStorage.getItem("access_token") != '') {
      this.router.navigateByUrl('/dashboard');
    }
    this.fillAuthClientId();
    this.current = new AbstractEntity();
  }

  fillAuthClientId() {
    this.authClientId="abc";
    
  }

  





  register() {
    this.globalService.putData<AbstractEntity>(false, this.urls.get('cani-login') + "/one/users", this.current)
      .subscribe(
      value => {
        this.current = value;
        console.log(value);
      },
      error => {
        console.log(error);
      }
      );
  }

}
