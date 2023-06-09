import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart, CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products!: any[];

  subs!: Subscription;

  filter = {};

  constructor(private ps: ProductsService, private cs: CartService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.subs = this.ps
      .getAllProducts(this.filter)
      .subscribe((response: any) => {
        this.products = response;
      });
  }

  filterCat(event: any) {
    if (event.value) {
      this.filter = { category: event.value.toLowerCase() };
    } else {
      this.filter = {};
    }
    this.getAllProducts();
  }

  addItem($event: any) {
    const payload: Cart = {
      product_id: $event.id,
      name: $event.name,
      price: $event.price,
      quantity: 1,
    };
    this.cs.addItem(payload);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
