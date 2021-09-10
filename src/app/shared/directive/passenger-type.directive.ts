import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[PassengerType]'
})
export class PassengerTypeDirective {

  constructor(
    public viewContainer: ViewContainerRef
  ) { }

}
