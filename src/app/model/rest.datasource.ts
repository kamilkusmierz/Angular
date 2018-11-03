import { Injectable } from '@angular/core';
import { Http, RequestMethod, Request } from '@angular/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { Order } from './order.model';
import { map } from 'rxjs/operators';
const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token: string;

  constructor(private http: Http) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }
  authenticate(user: string, pass: string): Observable<boolean> {
    return this.http.request(new Request({
      method: RequestMethod.Post,
      url: this.baseUrl + 'login',
      body: { name: user, password: pass }
    })).pipe(map(response => {
      const r = response.json();
      this.auth_token = r.success ? r.token : null;
      console.log(this.auth_token);
      return r.success;
    }));
  }

  getProducts(): Observable<Product[]> {
    return this.sendRequest(RequestMethod.Get, 'products') as Observable<Product[]>;
  }
  saveOrder(order: Order): Observable<Order> {
    return this.sendRequest(RequestMethod.Post, 'orders', order) as Observable<Order>;
  }
  private sendRequest(verb: RequestMethod, url: string, body?: Product | Order, auth: boolean = false):
    Observable<Product | Product[] | Order | Order[]> {
    // tslint:disable-next-line:prefer-const
    let request = new Request({
      method: verb,
      url: this.baseUrl + url,
      body: body
    });
    if (auth && this.auth_token != null) {
      request.headers.set('Authorization', `Bearer<${this.auth_token}>`);
    }
    console.log(request);
    return this.http.request(request).pipe(map(response => response.json()));
  }
  saveProduct(product: Product): Observable<Product> {
    return this.sendRequest(RequestMethod.Post, 'products', product, true) as Observable<Product>;
  }

  updateProduct(product): Observable<Product> {
    return this.sendRequest(RequestMethod.Put, `products/${product.id}`, product, true) as Observable<Product>;
  }

  deleteProduct(id: number): Observable<Product> {
    return this.sendRequest(RequestMethod.Delete, `products/${id}`, null, true) as Observable<Product>;
  }

  getOrders(): Observable<Order[]> {
    return this.sendRequest(RequestMethod.Get, 'orders', null, true) as Observable<Order[]>;
  }
  deleteOrder(id: number): Observable<Order> {
    return this.sendRequest(RequestMethod.Delete, `orders/${id}`, null, true) as Observable<Order>;
  }
  updateOrder(order: Order): Observable<Order> {
    return this.sendRequest(RequestMethod.Put, `orders/${order.id}`, order, true) as Observable<Order>;
  }
}

