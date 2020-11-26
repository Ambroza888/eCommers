import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eCommerce';

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.initializedBasket();
  }

  initializedBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId !== null) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('initialized basket');
      }, error => {
        console.log(error);
      });
    }
  }
}

