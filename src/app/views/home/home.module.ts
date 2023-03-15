import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

// Material Module
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { HomeFilterComponent } from './home-filter/home-filter.component';
import { HomeCardComponent } from './home-card/home-card.component';

@NgModule({
  declarations: [HomeComponent, HomeFilterComponent, HomeCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule,
  ],
})
export class HomeModule {}
