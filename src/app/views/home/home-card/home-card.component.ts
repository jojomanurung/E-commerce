import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent {
  @Input() product: any;
  @Output() addItem = new EventEmitter();
}
