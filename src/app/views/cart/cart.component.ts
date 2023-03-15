import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  jumlah: FormControl<number | null> = new FormControl<number>(1);
  subs!: Subscription;
  
  constructor() {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  keyListener($event: KeyboardEvent) {
    const currentValue = this.jumlah.value;
    if ((!currentValue || currentValue < 10) && $event.key === 'Backspace' ) {
      $event.preventDefault();
      this.jumlah.patchValue(0);
    } else if (!currentValue && $event.code.includes('Digit')) {
      $event.preventDefault();
      const number = Number($event.key);
      this.jumlah.patchValue(number);
    } else {
      return;
    }
  }

  removeItem() {
    let currentValue = this.jumlah.value;
    currentValue!--;
    this.jumlah.patchValue(currentValue, {emitEvent: true});
  }

  addItem() {
    let currentValue = this.jumlah.value;
    currentValue!++;
    this.jumlah.patchValue(currentValue, {emitEvent: true});
  }
}
