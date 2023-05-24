import { Component, Input } from '@angular/core';
import { Pizza } from '../types/Pizza';

@Component({
  selector: 'app-pizza-block',
  templateUrl: './pizza-block.component.html',
  styleUrls: ['./pizza-block.component.scss'],
})
export class PizzaBlockComponent {
  @Input() pizza!: Pizza;
}


