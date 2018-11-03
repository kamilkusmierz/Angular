import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class ProductRepository {
  private product: Product[] = [];
  private categories: string[] = [];

  constructor(private dataSource: RestDataSource) {
    dataSource.getProducts().subscribe(data => {
      this.product = data;
      this.categories = data.map(p => p.category).filter((c, index, array) => array.indexOf(c) === index).sort();
    });
  }

  getProducts(category: string = null): Product[] {

    return this.product.filter(p => category == null || category === p.category);
  }

  getProduct(id: number): Product {
    return this.product.find(p => p.id === id);
  }

  getCategories(): string[] {
    return this.categories;
  }
  saveProduct(product: Product) {
    if (product.id == null || product.id === 0) {
      this.dataSource.saveProduct(product).subscribe(p => this.product.push(p));
    } else {
      this.dataSource.updateProduct(product).subscribe(p => {
        this.product.splice(this.product.findIndex(pr => pr.id === product.id), 1, product);
      });
    }
  }
  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).subscribe(p => {
      this.product.splice(this.product.findIndex(pr => pr.id === id), 1);
    });
  }
}
