import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartItem } from '../models/CartItem.interface';
import { AddToCartResponse } from '../models/add-to-cart-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `http://localhost:8080/api/cart`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // Add any other required headers here
  });

  constructor(private http: HttpClient) {}

  addToCart(userId: string, cartItem: CartItem): Observable<AddToCartResponse> {
    const body = {
      articleId: cartItem.articleId,
      quantity: cartItem.quantity
    };
    return this.http.post<AddToCartResponse>(`${this.apiUrl}/add/${userId}`, body, { headers: this.headers }).pipe(
      catchError(error => {
        console.error('Error adding to cart:', error);
        return of({ message: 'Failed to add item to cart.' });
      })
    );
  }
  
  loadCartItems(userId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/${userId}`, { headers: this.headers }).pipe(
      catchError(error => {
        console.error('Error loading cart items:', error);
        return of([]);
      })
    );
  }

  removeFromCart(userId: string, itemId: number): Observable<AddToCartResponse> {
    return this.http.delete<AddToCartResponse>(`${this.apiUrl}/remove/${userId}/${itemId}`, { headers: this.headers }).pipe(
      catchError(error => {
        console.error('Error removing from cart:', error);
        return of({ message: 'Failed to remove item from cart.' });
      })
    );
  }

  updateCartItemQuantity(userId: string, itemId: number, quantity: number): Observable<AddToCartResponse> {
    const body = { quantity };
    return this.http.put<AddToCartResponse>(`${this.apiUrl}/update/${userId}/${itemId}`, body, { headers: this.headers }).pipe(
      catchError(error => {
        console.error('Error updating cart item quantity:', error);
        return of({ message: 'Failed to update item quantity.' });
      })
    );
  }
}