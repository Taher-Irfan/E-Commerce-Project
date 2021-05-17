import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { IProductType } from 'src/app/shared/models/productType';
import { ShopService } from '../shop.service';
import { CurrencyPipe, getCurrencySymbol } from '@angular/common';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity: number = 1;
  constructor(
    private basketService: BasketService,
    private shopService: ShopService,
    private router: ActivatedRoute,
    private bs: BreadcrumbService
  ) {
    this.bs.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  addItemToBasket()
  {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }
  incrementQuantity()
  {
    this.quantity++;
  }
  decrementQuantity()
  {
    this.quantity--;
    if(this.quantity<1)
    this.quantity =1
  }

  loadProduct() {
    let id = this.router.snapshot.params['id'];
    this.shopService.getProduct(id).subscribe(
      (response) => {
        this.product = response;
        this.bs.set('@productDetails', this.product.name);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
