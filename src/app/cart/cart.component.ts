import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/CartItem.interface';
import { Article } from './../models/article.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { AddToCartResponse } from '../models/add-to-cart-response.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  articles: CartItem[] = [];
  message: string | undefined;
// Vérifiez l'initialisation de userId
private userId: string = '20';

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.userId = this.userId; // Or however you set the userId

    this.loadCartItems(); 
    console.log('User ID in ngOnInit:', this.userId);

  }

  loadCartItems(): void {
    if (!this.userId) {
      console.error('User ID is not defined.');
      this.message = 'User ID is not defined.';
      return;
    }
  
    this.cartService.loadCartItems(this.userId).subscribe({
      next: (data: CartItem[]) => {
        this.articles = data;
        console.log('Articles loaded:', this.articles);
      },
      error: (e: HttpErrorResponse) => {
        console.error(e);
        this.message = 'Failed to load cart items.';
      }
    });
  }
  

  addToCart(article: Article): void {
    if (!article.id || !article.title || !article.price) {
      console.error('Article information is incomplete.');
      this.message = 'Failed to add article to cart. Incomplete article information.';
      return;
    }
  
    const cartItem: CartItem = {
      id: article.id,
      articleId: article.id,
      name: article.title,
      price: article.price,
      quantity: 1
    };
  
    // Assurez-vous que this.userId est correctement défini
    if (!this.userId) {
      console.error('User ID is not defined.');
      this.message = 'Failed to add article to cart. User ID is not defined.';
      return;
    }
  
    console.log('User ID:', this.userId); // Log de l'ID utilisateur
    console.log('Cart Item:', cartItem); // Log de l'objet cartItem
  
    this.cartService.addToCart(this.userId, cartItem).subscribe({
      next: (res: AddToCartResponse) => {
        console.log(res);
        this.message = res.message;
        this.loadCartItems();
      },
      error: (e: HttpErrorResponse) => {
        console.error(e);
        this.message = 'Failed to add article to cart.';
      }
    });
  }
  
  

  getTotal(): number {
    return this.articles.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
  
  getTotalQuantity(): number {
    return this.articles.reduce((acc, item) => acc + item.quantity, 0);
  }
  
}
