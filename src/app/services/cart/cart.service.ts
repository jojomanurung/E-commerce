import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Cart {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemList: BehaviorSubject<Cart[]> = new BehaviorSubject<Cart[]>(
    []
  );
  cartItemList$ = this.cartItemList.asObservable();

  constructor() {}

  addItem(payload: Cart, quantity?: number) {
    const currentCart = this.cartItemList.getValue();
    const foundIndex = currentCart?.findIndex(
      (item) => item.product_id === payload.product_id
    );
    if (foundIndex > -1) {
      currentCart[foundIndex].quantity =
        quantity ?? currentCart[foundIndex].quantity + 1;
      this.cartItemList.next(currentCart);
    } else {
      currentCart!.push(payload);
      this.cartItemList.next(currentCart);
    }
  }

  removeItem(product_id: number) {
    const currentCart = this.cartItemList.getValue();
    const foundIndex = currentCart.findIndex(
      (item) => item.product_id === product_id
    );
    currentCart.splice(foundIndex, 1);
    this.cartItemList.next(currentCart);
  }

  updateCart(payload: Cart[]) {
    this.cartItemList.next(payload);
  }
}
