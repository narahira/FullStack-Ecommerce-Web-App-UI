import { Routes } from "@angular/router";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ProductItemsComponent } from "./product-items/product-items.component";
import { StoreComponent } from "./store.component";

export const store_routes: Routes = [
    {
        path:'',
        component:StoreComponent
    },
    {
        path:':id',
        component:ProductDetailsComponent, data:{ breadcrumb:{alias:'productDetails'}}
    }
]