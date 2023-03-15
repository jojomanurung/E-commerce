import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Cart, CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  dataSource: Cart[] = [];
  displayedColumns: string[] = ['no', 'name', 'quantity', 'total'];
  subs!: Subscription;
  cart: Cart[] = [];

  form: FormGroup = this.fb.group({
    id: [0],
    name: [''],
    email: [''],
    phone: [''],
    address: [''],
    product: this.fb.array([])
  });

  constructor(private cs: CartService, private fb: FormBuilder, private ps: ProductsService) {}
  
  ngOnInit(): void {
    this.getAllCart();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  get product() {
    return this.form.controls['product'] as FormArray;
  }

  initProductGroup() {
    const productForm = this.fb.group({
      product_id: [0],
      name: [''],
      price: [0],
      quantity: [0]
    })
    return productForm;
  }

  addProductsArr() {
    this.product.push(this.initProductGroup(), { emitEvent: false });
  }

  getAllCart() {
    this.subs = this.cs.cartItemList$.subscribe((val) => {
      if (val?.length) {
        this.dataSource = val;
        this.cart = val;
        this.product.clear();
        this.cart.forEach((val) => {
          this.addProductsArr();
        })
        this.product.patchValue(this.cart);
      }
    })
  }

  getTotal() {
    const total = this.cart.reduce((reduce, item) => {
      const price = item.price * item.quantity;
      return reduce + price;
    }, 0);
    return total;
  }

  checkout() {
    const payload = this.form.value;
    this.subs = this.ps.checkout(payload).subscribe();
  }
}
