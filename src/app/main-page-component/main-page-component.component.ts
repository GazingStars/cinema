import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-main-page-component',
  imports: [CurrencyPipe],
  templateUrl: './main-page-component.component.html',
  styleUrl: './main-page-component.component.scss',
})
export class MainPageComponentComponent {
  isVisible = false;
  fruts = [
    {
      id: 0,
      name: 'Огурец',
      desc: 'Красивый и зеленый',
      price: 50,
    },
    {
      id: 1,
      name: 'Помидор',
      desc: 'Круглый и красный',
      price: 30,
    },
    {
      id: 2,
      name: 'Яблоко',
      desc: 'Круглое и ... тоже красное',
      price: 40,
    },
  ];

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
}
