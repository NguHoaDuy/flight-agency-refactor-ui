import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { PassengerTypeComponent } from './layout/passenger-type/passenger-type.component';
import {FormsModule} from "@angular/forms";
import {PassengerTypeDirective} from "./directive/passenger-type.directive";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    PassengerTypeComponent,
    PassengerTypeDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    PassengerTypeComponent,
    PassengerTypeDirective
  ]
})
export class SharedModule { }
