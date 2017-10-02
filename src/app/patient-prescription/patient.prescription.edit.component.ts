import { DefaultClientsFieldsToLoad } from 'cani-angular2-common';


import { LogService } from 'cani-angular2-common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DefaultCaniSchoolEavEditComponent } from './default.cani.school.eav.edit.component';
import {
    Component,
    OnChanges,
    ViewEncapsulation, PlatformRef, ViewContainerRef, Inject,OnInit
} from '@angular/core';
import { AuthService } from 'ng2-ui-auth';
import { AppState } from './app.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { GlobalService } from './../common/global.service';
import { AbstractEntity } from './../common/abstract.entity';
import { AbstractCommonEditComponent } from './../common/abstract.common.edit.component';
import { Route, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { PatientPrescription } from './patient.prescription';

@Component({
    selector: 'prescription-edit-url',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './prescription.edit.html'
})

export class PatientPrescriptionEditComponent extends AbstractCommonEditComponent<PatientPrescription> implements OnInit {

    public prescriptionId:number;
    
    constructor(public ActivatedRoute: ActivatedRoute,
        public globalService: GlobalService, public toastsManager: ToastsManager,
        vcr: ViewContainerRef,  @Inject("urls") public urls: Map<String, any>) {
        super();
        this.activatedRoute = ActivatedRoute;
        this.globalService = globalService;
        this.toastsManager = toastsManager;
        this.toastsManager.setRootViewContainerRef(vcr);
        this.current= new PatientPrescription();
      

    }

    public  getEntityUrl():string{
     return  this.urls.get('cani-login')+"/patient-prescriptions";
    };
    public  saveEntityUrl():string{
        return  this.urls.get('cani-login')+"/patient-prescriptions";
    };
    public  updateEntityUrl():string{
        return  this.urls.get('cani-login')+"/patient-prescriptions";
    };

    public ngOnInit(){
     this.current.userId=this.prescriptionId;
    }


}
