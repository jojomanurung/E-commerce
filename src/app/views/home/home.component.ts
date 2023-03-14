import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  categories!: any[];

  ratings = [
    {name: '5'},
    {name: '4'},
    {name: '3'},
    {name: '2'},
    {name: '1'},
  ]

  products!: any[];

  subs!: Subscription;

  constructor(private ps: ProductsService) {}

  
  ngOnInit() {
    this.getCategories();
    this.getAllProducts();
  }

  getCategories() {
    this.subs = this.ps.getCategories().subscribe((response: any) => {
      this.categories = response;
    })
  }

  getAllProducts() {
    this.subs = this.ps.getAllProducts().subscribe((response: any) => {
      this.products = response;
    })
  }
  
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
