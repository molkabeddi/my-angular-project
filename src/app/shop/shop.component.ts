import { Component } from '@angular/core';
import { Article } from '../models/article.interface'; 
import { CartItem } from '../models/CartItem.interface'; // Import CartItem interface
import { ArticleService } from '../services/article.service';
import { CartService } from '../services/cart.service'; // Import CartService
// Assurez-vous d'importer le modèle Article

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
    articles?: Article[];
    currentArticle: Article = {
      title: '',
      content: '',
      published: false,
      image: '',
      category: '',
      price: 0
    };
    currentIndex = -1;
    title = '';
    titleToRemove = '';
  
    constructor(private articleService: ArticleService, private cartService: CartService) { }
  
    ngOnInit(): void {
      this.retrieveArticles();
    }
  
    retrieveArticles(): void {
      this.articleService.getAll().subscribe({
        next: (data) => {
          this.articles = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    }
  
    refreshList(): void {
      this.retrieveArticles();
      this.currentArticle = {
        title: '',
        content: '',
        published: false,
        image: '',
        category: '',
        price: 0
      };
      this.currentIndex = -1;
    }
  
    setActiveArticle(article: Article, index: number): void {
      this.currentArticle = article;
      this.currentIndex = index;
    }
  
    deleteArticle(id: number | undefined, event: MouseEvent): void {
      event.stopPropagation(); // Prevent click event from triggering `setActiveArticle`
  
      if (id === undefined) {
        console.error('Article ID is undefined.');
        return;
      }
  
      if (confirm('Are you sure you want to delete this article?')) {
        this.articleService.delete(id).subscribe({
          next: (res) => {
            console.log(res);
            this.refreshList();
          },
          error: (e) => console.error(e)
        });
      }
    }
  
    removeAllArticles(): void {
      this.articleService.deleteAll().subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
    }
  
    removeArticleByTitle(): void {
      if (this.titleToRemove) {
        this.articleService.deleteByTitle(this.titleToRemove).subscribe({
          next: (res) => {
            console.log(res);
            this.refreshList();
          },
          error: (e) => console.error(e)
        });
      } else {
        console.error('Title to remove is required.');
      }
    }
  
    searchTitle(): void {
      this.currentArticle = {
        title: '',
        content: '',
        published: false,
        image: '',
        category: '',
        price: 0
      };
      this.currentIndex = -1;
  
      if (this.title) {
        this.articleService.findByTitle(this.title).subscribe({
          next: (data) => {
            this.articles = data;
            console.log(data);
          },
          error: (e) => console.error(e)
        });
      } else {
        console.error('Search title is required.');
      }
    }
  
    addToCart(article: Article): void {
      const cartItem: CartItem = {
        id: article.id ?? 0, // Ensure id is defined
        name: article.title, // Assuming `name` is the title of the article
        price: article.price,
        quantity: 1 // Default quantity is 1
      };
    
      console.log('Attempting to add to cart:', cartItem);
    
      
    }
    
  }
  
  
