import { Component, OnInit } from '@angular/core';
import { Cart, CartService } from './services/cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  cartItem: Cart[] = [];

  constructor(private cs: CartService) {}

  ngOnInit(): void {
    this.getCurrentCart();
  }

  getCurrentCart() {
    this.cs.cartItemList$.subscribe((val) => {
      if (val?.length) {
        this.cartItem = val;
        console.log('Cart Item', this.cartItem);
      } else {
        this.cartItem = [];
      }
    });
  }
}
