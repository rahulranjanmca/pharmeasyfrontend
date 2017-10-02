import { Input, Directive, ElementRef, OnInit,Renderer } from '@angular/core';
import { GlobalService } from "./global.service";

@Directive({
  selector: '[caniNgBusy]'
})
export class BusyDirective {

  constructor(globalService: GlobalService, private elementRef: ElementRef, renderer: Renderer) {
    globalService.getNoOfPendingRequest().subscribe(number => {
      if (number <= 0) {
        renderer.setElementClass(elementRef.nativeElement, 'cani-loading', false);
      }
      else {
        renderer.setElementClass(elementRef.nativeElement, 'cani-loading', true);
      }
    });
  }


}


