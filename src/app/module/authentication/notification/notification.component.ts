import {Component, OnDestroy, OnInit} from '@angular/core';
import {ifStmt} from "@angular/compiler/src/output/output_ast";
import {Router} from "@angular/router";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  sec: number = 3;
  constructor(
    private router: Router
  ) { }
  timerId: any

  ngOnInit(): void {
    this.timerId = setInterval(
      () => {
        if(this.sec <= 0) {
          this.router.navigate(["/"]);
          clearInterval(this.timerId);
        }
        this.sec--;

      }
      , 1000);
  }

  ngOnDestroy(): void {
    if(this.timerId)
      clearInterval(this.timerId)
  }
}
