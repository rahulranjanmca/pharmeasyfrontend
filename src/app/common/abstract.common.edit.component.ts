import {
    Component,
    OnInit,
    ViewEncapsulation, Input
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';
import { AbstractEntity } from './abstract.entity';
import { Route } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs';

export abstract class AbstractCommonEditComponent<ENTITY extends AbstractEntity> {
    public current: ENTITY;
    @Input()
    public id: number;
    public activatedRoute: ActivatedRoute;
    public popupCount = 0;
    public toastsManager: ToastsManager;
    public getDataSubscription: Subscription;
    public saveDataSubscription: Subscription;
    public globalService: GlobalService;
    

    public get(id:number) {
        this.getDataSubscription = this.globalService.getData<ENTITY>
            (true,  this.getEntityUrl() + id)
            .subscribe(
            (value) => {
                console.log('GetData:' + value);
                console.log(value);
                this.getEntityResponse(value);

            },
            (error) => {
                console.log(error);
            }
            );
    }

    public update() {
        console.log(this.current);
        if (this.current.id == null) {
            this.fillBeforeSave(this.current);
            this.saveDataSubscription = this.globalService.postData<ENTITY>
                (true, this.saveEntityUrl(), this.current)
                .subscribe(
                (value) => {
                    this.saveEntityResponse(value);
                    console.log(value);
                },
                (error) => {
                    console.log(error);
                }
                );
        } else {
            this.fillBeforeUpdate(this.current);
            this.saveDataSubscription = this.globalService.putData<ENTITY>
                (true,  this.updateEntityUrl(), this.current)
                .subscribe(
                (value) => {
                    this.updateEntityResponse(value);
                },
                (error) => {
                    console.log(error);
                }
                );
        }

    }
    public beforeUpdate(id: number) {
        this.id = id;
        this.get(id);
    }

    public beforeCreate() { }

    public fillBeforeSave(entity: ENTITY) { }

    public fillBeforeUpdate(entity: ENTITY) { }

    public updateEntityResponse(response: ENTITY) {
        this.current = response;
        this.toastsManager.success('Saved Successfully');
    };

    public getEntityResponse(response: ENTITY) {
        this.current = response;
        console.log('Current Entity Response:' + this.current);
        console.log(this.current);
    };
    public saveEntityResponse(response: ENTITY) {
        this.current = response;
        this.toastsManager.success('Saved Successfully');
    };
   

    public abstract getEntityUrl():string;
    public abstract saveEntityUrl():string;
    public abstract updateEntityUrl():string;


}
