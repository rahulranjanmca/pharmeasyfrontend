import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { LoginComponent } from './login/login.component';

import { DataResolver } from './app.resolver';


import { PatientPrescriptionEditComponent } from './patient-prescription/patient.prescription.edit.component';
import { PatientPrescriptionSearchComponent } from './patient-prescription/patient.prescription.search.component';
import { PatientSearchComponent } from './patient/patient.search.component';
import {PendingPrescriptionSearchComponent} from './pending-prescription-request/pending.prescription.request.component';





export const ROUTES: Routes = [

  /*Subdomain End*/
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: AboutComponent },
  { path: 'about', component: AboutComponent },
  { path: ':type/patient-prescription-search', component: PatientPrescriptionSearchComponent },
  { path: 'patient-search', component: PatientSearchComponent },
  { path: 'patient-prescription-edit', component: PatientPrescriptionEditComponent },
  { path: 'pending-prescription-search', component: PendingPrescriptionSearchComponent },
  { path: '**', component: NoContentComponent },
];
