import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-passenger-type',
  templateUrl: './passenger-type.component.html',
  styleUrls: ['./passenger-type.component.scss']
})
export class PassengerTypeComponent implements OnInit {

  @Input() type = 0;
  @Output() amount = new EventEmitter<number>();

  displayList = ["Người lớn", "Trẻ em", "Em bé" ]
  quantity: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.quantity = this.type == 0 ? 1 : 0;
  }

  validateQuantity() {
      if(this.quantity <= 0 || this.quantity > 50)
        this.quantity = this.type == 0 ? 1 : 0;
      this.submit();
  }

  desc() {
    if (this.type == 0) {
      this.quantity = this.quantity < 2 ? 1 : this.quantity - 1;
    } else {
      this.quantity = this.quantity < 1 ? 0 : this.quantity - 1;
    }
    this.submit();
  }

  asc() {
    this.quantity = this.quantity > 49 ? 50 : this.quantity + 1;
    this.submit();
  }

  submit() {
    this.amount.emit(this.quantity);
  }
}
