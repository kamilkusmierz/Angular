import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Order } from './order.model';


@Injectable()
export class StaticDataSource {
  private products: Product[] = [
    new Product(1, 'Product 1', 'Kategoria 1', 'Description 1', 100),
    new Product(2, 'Product 2', 'Kategoria 1', 'Description 1', 100),
    new Product(3, 'Product 3', 'Kategoria 1', 'Description 1', 100),
    new Product(4, 'Product 4', 'Kategoria 1', 'Description 1', 100),
    new Product(5, 'Product 5', 'Kategoria 2', 'Description 1', 100),
    new Product(6, 'Product 6', 'Kategoria 2', 'Description 1', 100),
    new Product(7, 'Product 7', 'Kategoria 2', 'Description 1', 100),
    new Product(8, 'Product 8', 'Kategoria 2', 'Description 1', 100),
    new Product(9, 'Product 9', 'Kategoria 3', 'Description 1', 100),
    new Product(10, 'Product 10', 'Kategoria 3', 'Description 1', 100),
    new Product(11, 'Product 11', 'Kategoria 3', 'Description 1', 100),
    new Product(12, 'Product 12', 'Kategoria 3', 'Description 1', 100),
    new Product(13, 'Product 13', 'Kategoria 4', 'Description 1', 100),
    new Product(14, 'Product 14', 'Kategoria 4', 'Description 1', 100),
    new Product(15, 'Product 15', 'Kategoria 4', 'Description 1', 100),
  ];
  private prod = new BehaviorSubject<Array<Product>>(this.products);
  getProducts(): Observable<Product[]> {
    return this.prod.asObservable();
  }

  saveOrder(order: Order): Observable<Order> {
    const orderr = new BehaviorSubject<Order>(order);
    console.log(JSON.stringify(order));
  return  orderr.asObservable();
  }
}
