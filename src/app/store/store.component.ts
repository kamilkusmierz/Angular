import { Component } from '@angular/core';
import { ProductRepository } from '../model/product.repository';
import { Product } from '../model/product.model';
import { Cart } from '../model/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html'
})
export class StoreComponent {
  public selectedCategory = null;
  public productPerPage = 4;
  public selectedPage = 1;
  constructor(private repository: ProductRepository, private cart: Cart, private router: Router) { }
  get products(): Product[] {
    // tslint:disable-next-line:prefer-const
    let pageIndex = (this.selectedPage - 1) * this.productPerPage;
    return this.repository.getProducts(this.selectedCategory).slice(pageIndex, pageIndex + this.productPerPage);
  }
  get categories(): string[] {
    return this.repository.getCategories();
  }
  changePage(newPage: number) {
    this.selectedPage = newPage;
  }
  changePageSize(newSize: number) {
    this.productPerPage = Number(newSize);
    this.changePage(1);
  }
  changeCategory(newCategory?: string) {
    this.selectedCategory = newCategory;
  }
   get pageNumbers(): number[] {
    return Array(Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productPerPage)).fill(0).map((x, i) => i + 1);
  }
  get pageCount(): number {
    return Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productPerPage);
  }
  addProductToCart(product: Product) {
    this.cart.addLine(product);
    this.router.navigateByUrl('/cart');
  }

}
