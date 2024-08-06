import { Component } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent {
  article = {
    title: '',
    content: '',
    published: false,
    category: '',
    price: 0,
    image: ''
  };
  message = '';
  image: File | null = null;

  constructor(private articleService: ArticleService, private router: Router) { }

  onFileChange(event: any): void {
    this.image = event.target.files[0];
  }

  saveArticle(): void {
    const formData = new FormData();
    formData.append('title', this.article.title);
    formData.append('content', this.article.content);
    formData.append('published', String(this.article.published));
    formData.append('category', this.article.category);
    formData.append('price', String(this.article.price));
    if (this.image) {
      formData.append('image', this.image);
    }

    this.articleService.create(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.message = 'Article added successfully!';
        this.router.navigate(['/shop']);
      },
      error: (e: HttpErrorResponse) => {
        console.error(e);
        this.message = 'Failed to add article.';
      }
    });
  }
}
