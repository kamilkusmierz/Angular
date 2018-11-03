import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from './store/store.module';
import { CounterDirective } from './store/counter.directive';
import { RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { CheckoutComponent } from './store/checkout.component';
import { StoreFirstGuard } from './storeFirst.guard';
import { CartDetailComponent } from './store/cartDetail.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, StoreModule,
    RouterModule.forRoot([
      {
        path: 'store', component: StoreComponent,
        canActivate: [StoreFirstGuard]
      },
      {
        path: 'cart', component: CartDetailComponent,
        canActivate: [StoreFirstGuard]
      },
      {
        path: 'checkout', component: CheckoutComponent,
        canActivate: [StoreFirstGuard]
      },
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canActivate: [StoreFirstGuard]
      },
      { path: '**', redirectTo: '/store' }
    ])],
  providers: [{ provide: LOCALE_ID, useValue: 'pl-PL' }, StoreFirstGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
