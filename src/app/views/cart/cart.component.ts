import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { concatMap, forkJoin, map, of, Subscription, take } from 'rxjs';
import { Cart, CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  productss: any[] = [];
  productsForm: FormGroup = this.fb.group({
    products: this.fb.array([]),
  });
  subs!: Subscription;
  subTotal = 0;

  constructor(
    private cs: CartService,
    private ps: ProductsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getCart() {
    this.subs = this.cs.cartItemList$
      .pipe(
        concatMap((cart) => {
          if (cart) {
            const join = cart.map((item) => {
              return this.ps.getProductById(item.product_id).pipe(
                map((val: any) => {
                  const productsCart = { ...val, quantity: item.quantity };
                  return productsCart;
                })
              );
            });
            return forkJoin(join);
          } else {
            return of([]);
          }
        }),
        take(1)
      )
      .subscribe((response) => {
        if (response?.length) {
          this.productss = response;
          this.products.clear();
          this.productss.forEach((prod: any) => {
            this.addProductsArr();
          });
          this.products.patchValue(this.productss);
          console.log('form', this.productsForm.value);
          this.subTotal = this.getTotal();
          this.listenProductsForm();
        } else {
          this.productss = [];
        }
      });
  }

  get products() {
    return this.productsForm.controls['products'] as FormArray;
  }

  initProductGroup() {
    const productForm = this.fb.group({
      id: [0],
      name: [''],
      category: [''],
      image: [''],
      description: [''],
      rating: [0],
      price: [0],
      stock: [0],
      quantity: [0],
    });
    return productForm;
  }

  addProductsArr() {
    this.products.push(this.initProductGroup(), { emitEvent: false });
  }

  keyListener($event: KeyboardEvent, index: number) {
    const currentValue = this.products.at(index).get('quantity')?.value;
    if ((!currentValue || currentValue < 10) && $event.key === 'Backspace') {
      $event.preventDefault();
      this.products.at(index).get('quantity')?.patchValue(0);
    } else if (!currentValue && $event.code.includes('Digit')) {
      $event.preventDefault();
      const number = Number($event.key);
      this.products.at(index).get('quantity')?.patchValue(number);
    } else {
      return;
    }
  }

  substractQty(index: number) {
    let currentValue = this.products.at(index).get('quantity')?.value;
    currentValue!--;
    this.products
      .at(index)
      .get('quantity')
      ?.patchValue(currentValue, { emitEvent: true });
  }

  addQty(index: number) {
    let currentValue = this.products.at(index).get('quantity')?.value;
    currentValue!++;
    this.products
      .at(index)
      .get('quantity')
      ?.patchValue(currentValue, { emitEvent: true });
  }

  removeItem(index: number) {
    this.products.removeAt(index);
  }

  listenProductsForm() {
    this.subs = this.products.valueChanges.subscribe((val: Array<any>) => {
      const productCart: Cart[] = val.map((value) => {
        return {
          product_id: value.id,
          name: value.name,
          price: value.price,
          quantity: value.quantity,
        };
      });
      this.cs.updateCart(productCart);
      const total = val.reduce((reduce, item) => {
        const price = item.price * item.quantity;
        return reduce + price;
      }, 0);
      this.subTotal = total;
    });
  }

  getTotal() {
    const prod = this.productss;
    const total = prod.reduce((reduce, item) => {
      const price = item.price * item.quantity;
      return reduce + price;
    }, 0);
    return total;
  }
}
