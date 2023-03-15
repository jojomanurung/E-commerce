import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-home-filter',
  templateUrl: './home-filter.component.html',
  styleUrls: ['./home-filter.component.scss']
})
export class HomeFilterComponent implements OnInit, OnDestroy {
  @Output() filterCat: EventEmitter<any> = new EventEmitter<any>();
  categories!: any[];

  ratings = [
    {name: '5'},
    {name: '4'},
    {name: '3'},
    {name: '2'},
    {name: '1'},
  ]

  subs!: Subscription;

  constructor(private ps: ProductsService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getCategories() {
    this.subs = this.ps.getCategories().subscribe((response: any) => {
      this.categories = response;
    })
  }

}
