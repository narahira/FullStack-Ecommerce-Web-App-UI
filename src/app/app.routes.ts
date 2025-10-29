import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StoreComponent } from './store/store.component';
import { ProductDetailsComponent } from './store/product-details/product-details.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { UnAuthenticatedComponent } from './core/un-authenticated/un-authenticated.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'server-error',component:ServerErrorComponent},
    {path:'not-found',component:NotFoundComponent},
    {path:'un-authenticated',component:UnAuthenticatedComponent},
    {path:'store',
        // component:StoreComponent,
        loadChildren:()=>import('./store/store.routes').then(m=>m.store_routes)
    },
    // {path:'store/:id',component:ProductDetailsComponent},
    {path:'**',redirectTo:'',pathMatch:'full'}
];
