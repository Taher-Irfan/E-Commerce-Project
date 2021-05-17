import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketTotal } from '../../models/basket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.css']
})
export class OrderTotalsComponent implements OnInit {
 baseketTotals$ : Observable<IBasketTotal>;
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.baseketTotals$ = this.basketService.basketTotal$; 
  }


}
