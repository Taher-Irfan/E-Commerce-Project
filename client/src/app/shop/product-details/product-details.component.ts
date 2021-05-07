import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { IProductType } from 'src/app/shared/models/productType';
import { ShopService } from '../shop.service';
import {CurrencyPipe, getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct
  constructor(private shopService: ShopService, private router: ActivatedRoute) { }

  ngOnInit(): void {
   this.loadProduct();
  }
  loadProduct()
  {
    let id = this.router.snapshot.params['id'];
    this.shopService.getProduct(id).subscribe(
      (response) =>
      {
        this.product=response;
      },
      (error) =>
      {
        console.log(error);
        
      }
    )
  }

}
