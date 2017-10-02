import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { ActivatedRoute } from '@angular/router';


declare var $:any;
@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html'
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
   

     constructor(private activatedRoute:ActivatedRoute) {
       
    }
    ngOnInit() {
       this.menuItems = ROUTES.filter(menuItem => menuItem);
       
    }

    public hasAuthority(authority:string)
    {
        return localStorage.getItem('permissions').split(',').indexOf(authority)>=0;
    }


    
}
