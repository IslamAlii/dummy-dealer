import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductData } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: ProductData;
  constructor() {}

  ngOnInit() {
    console.log(this.product);
  }

  addToFavoriteList(id: string) {
    const favoriteList = JSON.parse(localStorage.getItem('favoriteList')!);
    if (favoriteList) {
      const index = favoriteList.indexOf(id);
      if (index !== -1) {
        favoriteList.splice(index, 1);
        localStorage.setItem('favoriteList', JSON.stringify([...favoriteList]));
      } else {
        localStorage.setItem(
          'favoriteList',
          JSON.stringify([...favoriteList, id])
        );
      }
    } else {
      localStorage.setItem('favoriteList', JSON.stringify([id]));
    }
  }
}
