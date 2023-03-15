import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  product: any;
  subs!: Subscription;
  jumlah: FormControl<number | null> = new FormControl<number>(1);
  total!: number | null;

  constructor(
    private ps: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.getDetails(id);
  }

  getDetails(id: any) {
    this.subs = this.ps.getProductById(id).subscribe({
      next: (resp: any) => {
        this.product = resp;
        console.log(this.product);
        this.subTotal();
      },
      error: (err) => {
        this.router.navigate(['']);
      },
    });
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

  subTotal() {
    this.subs = this.jumlah.valueChanges.subscribe((val) => {
      console.log('jumlah', val)
      if (val) {
        const subTotal = this.product.price * val;
        this.total = subTotal;
        console.log(this.total);
      }
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
