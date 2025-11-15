import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbComponent, BreadcrumbItemDirective, BreadcrumbService } from 'xng-breadcrumb';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BreadcrumbComponent, BreadcrumbItemDirective,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
constructor(public bcService:BreadcrumbService){}
}
