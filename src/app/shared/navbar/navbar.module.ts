import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import {
  MaterialModule,
  MdToolbarModule,
  MdToolbarRow
} from '@angular/material';


@NgModule({
    imports: [ RouterModule, CommonModule ,MaterialModule],
    declarations: [ NavbarComponent ],
    exports: [ NavbarComponent ]
})

export class NavbarModule{

}
