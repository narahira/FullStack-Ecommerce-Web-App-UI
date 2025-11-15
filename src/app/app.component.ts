import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IProduct } from './shared/models/products';
import { IPagination } from './shared/models/pagination';
import { StoreComponent } from './store/store.component';
import { HeaderComponent } from './core/header/header.component';
import { NgxSpinnerModule } from "ngx-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,
    CommonModule,StoreComponent,
    HeaderComponent, 
    NgxSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
    title = 'EShopping';
    products : IProduct[] = [];
   private http = inject(HttpClient);

  ngOnInit(): void {
    console.log('Catalog is Working...')
    this.getProductsByBrandName();
  }

getProductsByBrandName(){
  this.http.get<IPagination<IProduct[]>>('http://localhost:8000/api/v1/Catalog/GetAllProducts').subscribe({
      next: response => {
        this.products = response.data,
        console.log(response);
      },
      error: err => console.log(err),
      complete:()=>{
        console.log('Catalog API call completed');
      }
    })
}
}
