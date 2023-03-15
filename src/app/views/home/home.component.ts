import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  products!: any[];

  subs!: Subscription;

  filter = {};

  constructor(private ps: ProductsService) {}

  
  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.subs = this.ps.getAllProducts(this.filter).subscribe((response: any) => {
      this.products = response;
    })
  }

  filterCat(event: any) {
    console.log(event);
    if (event.value) {
      this.filter = { category: event.value.toLowerCase() };
    } else {
      this.filter = {};
    }
    this.getAllProducts();
  }
  
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
