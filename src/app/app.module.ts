
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';





import { NgModule,  ApplicationRef } from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { XLargeDirective } from './home/x-large';

/*Modules Used by Us*/

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { Ng2UiAuthModule, CustomConfig } from 'ng2-ui-auth';
import { Md2Module } from 'md2';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { GlobalService } from './common/global.service';

import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthLoginComponent } from './login/auth.login.component';
import { LoginComponent } from './login/login.component';
import { BusyDirective } from './common/busy.directive';

import { PatientPrescriptionEditComponent } from './patient-prescription/patient.prescription.edit.component';
import { PatientPrescriptionSearchComponent } from './patient-prescription/patient.prescription.search.component';
import { PatientSearchComponent } from './patient/patient.search.component';
import {PendingPrescriptionSearchComponent} from './pending-prescription-request/pending.prescription.request.component';




import '../styles/styles.scss';
import '../styles/headings.css';
import '../styles/ng2-toastr.min.css';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];
export const urlMap: Map<string, any>=new Map().set("cani-login", process.env.cani_login);


type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

export const GOOGLE_CLIENT_ID = 'b';


export class MyAuthConfig extends CustomConfig {
 
  defaultHeaders = { 'Content-Type': 'application/json' };
  providers = { oauth2: { clientId: localStorage.getItem('loginClientCode'), redirectUri: window.location.origin + '/', url: process.env.cani_login + '/oauth/aaa/oauth_confirm', authorizationEndpoint: process.env.cani_login + '/oauth/login',  loginUrl: '/oauth/login', baseUrl: '/' } };
}



/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    NoContentComponent,
    XLargeDirective,
    LoginComponent,
    AuthLoginComponent,
    PatientPrescriptionEditComponent,
    PatientPrescriptionSearchComponent,
    PatientSearchComponent,
    PendingPrescriptionSearchComponent,
    BusyDirective
     ],
  imports: [ // import Angular's modules
    BrowserModule.withServerTransition({ appId: 'ang4-seo-pre' }),
    BrowserAnimationsModule,											
    FormsModule,
    HttpModule,
    MaterialModule,
    Ng2UiAuthModule.forRoot(MyAuthConfig),
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules }),
    Md2Module,
    FooterModule, 
    NavbarModule,
    SidebarModule,
    ToastModule.forRoot(),
    
    //, MomentModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    GlobalService,
   { provide: 'urls', useValue: urlMap},

  ],
  exports: [
  ],

})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) { 
 
  }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
