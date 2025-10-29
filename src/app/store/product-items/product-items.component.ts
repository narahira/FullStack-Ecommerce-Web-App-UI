import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/models/products';
import { StoreComponent } from '../store.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-items',
  standalone: true,
  imports: [StoreComponent,CommonModule,RouterModule],
  templateUrl: './product-items.component.html',
  styleUrl: './product-items.component.scss'
})
export class ProductItemsComponent {
@Input() product?:IProduct;

}
