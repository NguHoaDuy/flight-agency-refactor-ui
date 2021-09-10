import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[oneWay]'
})
export class OneWayDirective {

  constructor(
    public viewContainer: ViewContainerRef
  ) { }

}
