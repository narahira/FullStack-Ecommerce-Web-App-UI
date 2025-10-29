import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/models/products';
import { StoreService } from '../store.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  product?: IProduct;

  constructor(private storeService:StoreService, private activateRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct(){
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if(id){
      this.storeService.getProductsById(id).subscribe({
        next:(res)=>{
          this.product = res;
        },
        error:(err)=>{
          console.log(err);
        }
      })
    } 
  }
}
