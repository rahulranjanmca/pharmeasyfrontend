

import { WeekDays } from './../model/week.days';
import { BatchTimingSet } from './../model/batch.timing.set';

import { LogService } from 'cani-angular2-common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
    Component,
    OnChanges,
    ViewEncapsulation, PlatformRef, ViewContainerRef, Inject
} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { AuthService } from 'ng2-ui-auth';
import { AppState } from './app.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { GlobalService } from './../common/global.service';
import { AbstractEntity } from './../common/abstract.entity';
import { User } from './../common/user';
import { AbstractCommonSearchComponent } from './../common/abstract.common.search.component';
import { Route, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { PatientPrescription } from './../patient-prescription/patient.prescription';
import { PatientPrescriptionEditComponent } from './../patient-prescription/patient.prescription.edit.component';

@Component({
    selector: 'invoice-header-edit-url',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './patient.search.html'
})

export class PatientSearchComponent extends AbstractCommonSearchComponent<User>  {

    public activatedRoute: ActivatedRoute;
    public patientPrescription: PatientPrescription;

    constructor(public ActivatedRoute: ActivatedRoute, public router: Router,
        public globalService: GlobalService, public toastsManager: ToastsManager,
        vcr: ViewContainerRef, @Inject("urls") public urls: Map<String, any>,public dialog: MdDialog) {
        super();
        this.activatedRoute = ActivatedRoute;
        this.globalService = globalService;
        this.router = router;
        this.toastsManager = toastsManager;
        this.toastsManager.setRootViewContainerRef(vcr);
        this.criteria = new User();
        this.criteria.role = "patient";
        this.activatedRoute.queryParams.subscribe((params) => {
            this.id = params['id'];
        });
        this.patientPrescription= new PatientPrescription();


    }

    openDialog(id:number) {
        let dialogRef = this.dialog.open(PatientPrescriptionEditComponent, {
            height: '400px',
            width: '600px',
          });
        dialogRef.componentInstance.prescriptionId = id;
        dialogRef.afterClosed().subscribe(result => {
          //this.selectedOption = result;
        });
      }

    public prescribe() {
        this.globalService.postData<PatientPrescription>
            (true, this.urls.get('cani-login') + "/patient-prescriptions", this.patientPrescription)
            .subscribe(
            (value) => {
                this.patientPrescription=new PatientPrescription();
            },
            (error) => {
                console.log(error);
            }
            );


    }


    public getSearchUrl() { return this.urls.get('cani-login') + "/users/search/-1/0/"; };
    public getCountUrl() { return this.urls.get('cani-login') + "/users"; };
    public getEditUrl() { return this.urls.get('cani-login') + "/users"; };
}
