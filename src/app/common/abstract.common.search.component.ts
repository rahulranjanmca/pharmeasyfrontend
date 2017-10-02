
import {
    Component,
    OnInit,
    Input, OnChanges, SimpleChanges, Inject
} from '@angular/core';

import { Observable, Subscription } from 'rxjs/Rx';
import { Router } from "@angular/router";
import { GlobalService } from "./global.service";
import { AbstractEntity } from "./abstract.entity";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


export abstract class AbstractCommonSearchComponent<ENTITY extends AbstractEntity> {


    @Input()
    public paramsJson: string;

    public count: number;
    public id: number;
    public results: ENTITY[];

    public criteria: ENTITY;

    public toastsManager: ToastsManager;

    //public params: { [key: string]: any; } = {};

    @Input()
    public moduleName: string;
    @Input()
    public entityName: string;
    public searchSettingObservable: Subscription;
    public router: Router;
    public globalService: GlobalService;
    constructor(
    ) {

    }




    search() {
        this.searchRecord();
    }



    create(id: number) {
        this.router.navigate(['create']);
    };


    clear() {
       // this.params = {};
    };

    public searchRecord() {

        this.globalService.postData<any>(true,
            this.getSearchUrl(), this.criteria)
            .subscribe(
            (value) => {
                this.results = value;
                if(this.results.length==0)
                {
                    this.toastsManager.info("There is no record");
                }
                console.log(value);
            },
            (error) => {
                console.log(error);
            }
            );
    }

    public goToPage(pageNumber: number) {
    }
    public countRecord(id: number) {
        this.globalService.getData<number>(true, this.getCountUrl() + id)
            .subscribe(
            (value) => {
                this.count = value;
                console.log(value);
            },
            (error) => {
                console.log(error);
            }
            );
    }

    public edit(id: number) {
        this.id = id;
        if (id == null) {
            this.router.navigate(['create']);
        } else {
            this.router.navigate([this.getEditUrl()]);

        }

    };





    public abstract getSearchUrl();
    public abstract getCountUrl();
    public abstract getEditUrl();

    
}
