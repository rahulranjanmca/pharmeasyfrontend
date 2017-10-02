import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../.././sidebar/sidebar-routes.config';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MdToolbar } from '../../components/toolbar/toolbar';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";

@Component({
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    public name:string;
    private listTitles: any[];
    private sideBarClosed = false;
     
   // location: Location;
    constructor(private activatedRoute:ActivatedRoute,  private router: Router,) {
       
    }
    ngOnInit() {
        this.name=localStorage.getItem("name");
    
        this.listTitles = ROUTES.filter(listTitle => listTitle);
    }
    logout(){
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        //TODO remove  the   token from server  too.
        location.href=("/login");
    }
    getTitle() {
        var titlee = null;//this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(2);
        }
        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    closeSideMenu() {
        if (this.sideBarClosed == false) {
            document.body.classList.add('closed-sidebar');
            this.sideBarClosed = true;
        }
        else {
            document.body.classList.remove('closed-sidebar');
            this.sideBarClosed = false;
        }
    }
}
