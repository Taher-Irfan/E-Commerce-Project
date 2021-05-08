import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  
  @ViewChild('search',{static: false}) searchTerm: ElementRef

  constructor(private shopService: ShopService) { }
  products: IProduct[];
  brands: IBrand[];
  types:IProductType[];
  shopParams: ShopParams = new ShopParams();
  sortOptions = [
  {name: 'Alphabetical', value: 'name'},
  {name: 'Price Low to High', value: 'priceAsc'},
  {name: 'Price High to Low', value: 'priceDesc'},
  ];
  totalCount: number;

  
  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes(); 
  }
  getProducts()
  {
    this.shopService.getProducts(this.shopParams).subscribe(
      (response) =>{
        this.products = response.data;
        this.totalCount = response.count;
        this.shopParams.pageSize = response.pageSize;
        this.shopParams.pageNumber = response.pageIndex;
      },
      (error) =>{
        console.log(error);
      }
    )
  }
  getBrands()
  {
    this.shopService.getProductBrands().subscribe(
      (response) =>{
        this.brands = [{id: 0, name: 'All'},...response];
      },
      (error) =>{
        console.log(error);
      }
    )
  }
  getTypes()
  {
    this.shopService.getProductTypes().subscribe(
      (response) =>{
        this.types = [{id: 0, name: 'All'},...response];
      },
      (error) =>{
        console.log(error);
      }
    )
  }
  onBrandSelected(brandId: number)
  {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onTypeSelected(typeId: number)
  {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onSortSelected(sort: string)
  {
    console.log(sort);
    this.shopParams.sort = sort;
    this.shopParams.pageNumber = 1;
     this.getProducts();
  }

  onPageChanged(event: any)
  {
    if(this.shopParams.pageNumber !== event)
    {
      this.shopParams.pageNumber=event; 
      this.getProducts();
    }
   
  }
  onSearch()
  {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }
  onReset()
  {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
  

}
