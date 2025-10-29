import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { IProduct } from '../shared/models/products';
import { StoreService } from './store.service';
import { CommonModule } from '@angular/common';
import { ProductItemsComponent } from './product-items/product-items.component';
import { IType } from '../shared/models/type';
import { IBrand } from '../shared/models/brand';
import { StoreParams } from '../shared/models/storeparams';
import { clear } from 'node:console';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule,ProductItemsComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit {
  @ViewChild('search') searchTerm? : ElementRef;
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  storeParams = new StoreParams();
  sortOptions = [
    {name:'Alphabetical',value:'name'},
    {name: 'Price: Ascending', value:'priceAsc'},
    {name: 'Price: Descending', value:'priceDesc'}
  ];
  totalCount: number = 0;

  constructor(private storeService : StoreService){}
  
  ngOnInit(): void {
  this.getBrands();
  this.getProducts();
  this.getTypes();
  }
  getProducts(){
    this.storeService.getProducts(this.storeParams).subscribe({
      next : res =>{ 
        this.products = res.data;
        this.storeParams.pageNumber = res.pageSize;
        this.storeParams.pageSize = res.pageIndex;
        this.totalCount = res.count;
      },
      error : err => console.log(err)
    })
  }
    getBrands(){
    this.storeService.getBrands().subscribe({
      next : res => {
        this.brands = [{id:'',name:'All'}, ...res]
      },
      error : err => console.log(err)
    })
  }
  getTypes(){
    this.storeService.getTypes().subscribe({
      next : res =>{ 
        this.types = [{id:'',name:'All'}, ...res]
      },
      error : err => console.log(err)
    })
  }
  onBrandSelected(brandId:string){
    this.storeParams.BrandId = brandId;
    this.getProducts();
  }
  onTypeSelected(typeId:string){
    this.storeParams.TypeId = typeId;
    this.getProducts();
  }
  onSortSelected(sort:string){
    this.storeParams.sort = sort;
    this.getProducts();
  }
  onPageChanged(page:number,event:Event){
    event.preventDefault();
    if(page>=1 && page<= this.totalPages){
      this.storeParams.pageNumber = page;
      this.getProducts();
    }
  }
  get totalPages():number{
    return Math.ceil(this.totalCount/this.storeParams.pageSize);
  }
  get pages():number[]{
    return Array.from({length: this.totalPages},(_,i)=>i +1);
  }
  onSearch(){
    this.storeParams.search = this.searchTerm?.nativeElement.value
    this.storeParams.pageNumber = 1;
    this.getProducts();
  }
  onReset(){
    if(this.searchTerm){
      this.searchTerm.nativeElement.value = '';
      this.storeParams = new StoreParams();
      this.getProducts();
    }
  }
}
