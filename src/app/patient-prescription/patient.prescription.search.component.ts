import { DefaultClientsFieldsToLoad } from 'cani-angular2-common';

import { WeekDays } from './../model/week.days';
import { BatchTimingSet } from './../model/batch.timing.set';

import { LogService } from 'cani-angular2-common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DefaultCaniSchoolEavEditComponent } from './default.cani.school.eav.edit.component';
import {
    Component,
    OnChanges,
    ViewEncapsulation, PlatformRef, ViewContainerRef, Inject
} from '@angular/core';
import { AuthService } from 'ng2-ui-auth';
import { AppState } from './app.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { GlobalService } from './../common/global.service';
import { AbstractEntity } from './../common/abstract.entity';
import { PatientPrescription } from './patient.prescription';
import { AbstractCommonSearchComponent } from './../common/abstract.common.search.component';
import { Route, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'invoice-header-edit-url',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './prescription.search.html'
})

export class PatientPrescriptionSearchComponent extends AbstractCommonSearchComponent<PatientPrescription>  {

    public activatedRoute: ActivatedRoute;
    public type:string;

    constructor(public ActivatedRoute: ActivatedRoute, public router: Router,
        public globalService: GlobalService, public toastsManager: ToastsManager,
        vcr: ViewContainerRef, @Inject("urls") public urls: Map<String, any>) {
        super();
        this.activatedRoute = ActivatedRoute;
        this.globalService = globalService;
        this.router=router;
        this.toastsManager = toastsManager;
        this.toastsManager.setRootViewContainerRef(vcr);
        this.criteria= new PatientPrescription();

        this.activatedRoute.params.subscribe((params) => {
            this.type = params['type'];
            this.criteria.type=this.type;
            this.results=[];
           
           
        });
        this.activatedRoute.queryParams.subscribe((params) => {
            this.id = params['id'];
           
           
        });

       


    }

    public sendRequest(id:number)
    {
        this.globalService.postData<PatientPrescription>
        (true, this.urls.get('cani-login') + "/patient-prescriptions/sendRequest/"+id, {})
        .subscribe(
        (value) => {
            this.toastsManager.success('Request Sent Successfully');
            location.reload();
        },
        (error) => {
            console.log(error);
        }
        );
    }


    public getSearchUrl() { return this.urls.get('cani-login') + "/patient-prescriptions/search/-1/0/"; };
    public getCountUrl() { return this.urls.get('cani-login') + "/patient-prescriptions"; };
    public getEditUrl() { return this.urls.get('cani-login') + "/patient-prescriptions"; };
}
