/*
 * Angular 2 decorators and services
 */
import {
    Component,
    OnInit,
    ViewEncapsulation, OnChanges, Input, Inject
} from '@angular/core';
import { AuthService } from 'ng2-ui-auth';
import { AppState } from '../app.service';
import { Observable } from 'rxjs/Rx';
import { Router } from "@angular/router";
import { GlobalService } from "./../common/global.service";
import { AbstractEntity } from "./../common/abstract.entity";
import { User } from "./../common/user"
import { ActivatedRoute } from '@angular/router';
import { ConfigService, CustomConfig } from 'ng2-ui-auth';



/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'oauth-login-button',
    encapsulation: ViewEncapsulation.None
    , template: `<button type="button" class="btn btn-info float-right" (click)="authenticate()"> Login </button>`
})
export class AuthLoginComponent {

    current: AbstractEntity;
    @Input()
    authClientId: string;

    constructor(
        public authService: AuthService,
        private router: Router,
        public globalService: GlobalService,
        private activatedRoute: ActivatedRoute,
        private configService: ConfigService,
        @Inject("urls") private urls: Map<String, any>

    ) {
    }


    authTokenResponse: any;

    authenticate() {
        var object = { clientId: this.authClientId, redirectUri: window.location.origin + '/', url: process.env.cani_login + '/oauth/oauth_confirm', authorizationEndpoint: process.env.cani_login + '/oauth/login', loginUrl: '/oauth/login', baseUrl: '/' };
        this.configService.providers['oauth2'] = object;
        this.authService.authenticate('oauth2')
            .subscribe(value => {
                console.log('access_token:' + value.json().access_token)
                localStorage.setItem('access_token', value.json().access_token);
                localStorage.setItem('refresh_token', value.json().refresh_token);
             //   this.router.navigateByUrl('/dashboard')
                this.globalService.postData<User[]>(true, this.urls.get('cani-login') + '/users/search/0/1',{}).subscribe(users => {
                    let user:User=users[0];
                    localStorage.setItem('name', user.firstName + " " + (user.lastName == null ? '' : user.lastName));
                    localStorage.setItem('userId', user.id.toString());
                })
                this.globalService.getData<string[]>(true, this.urls.get('cani-login') + '/users/permissions').subscribe(permissions => {
                    localStorage.setItem('permissions', permissions.join());
                    location.href='/dashboard';
                })

            }
            );
    }

    register() {
        this.globalService.putData<User>(false, this.urls.get('login') + "/users", this.current)
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

