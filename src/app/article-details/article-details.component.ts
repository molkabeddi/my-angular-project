import { Component, Input, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../models/article.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentArticle: Article = {
    title: '',
    content: '',
    published: false,
    category: '',
    price: 0
  };

  message = '';
  file: File | null = null;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      const id = Number(this.route.snapshot.params['id']);
      this.getArticle(id);
    }
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  getArticle(id: number): void {
    this.articleService.get(id).subscribe({
      next: (data: Article) => {
        this.currentArticle = data;
        console.log(data);
      },
      error: (e: HttpErrorResponse) => console.error(e)
    });
  }

  updatePublished(status: boolean): void {
    const data: Partial<Article> = {
      title: this.currentArticle.title,
      content: this.currentArticle.content,
      published: status
    };

    this.message = '';

    this.articleService.update(this.currentArticle.id!, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentArticle.published = status;
        this.message = res.message
          ? res.message
          : 'The status was updated successfully!';
      },
      error: (e: HttpErrorResponse) => console.error(e)
    });
  }

  updateArticle(): void {
    const formData = new FormData();
    formData.append('title', this.currentArticle.title);
    formData.append('content', this.currentArticle.content);
    formData.append('published', String(this.currentArticle.published));
    formData.append('category', this.currentArticle.category);
    formData.append('price', String(this.currentArticle.price));
    if (this.file) {
      formData.append('image', this.file);
    }

    this.articleService.update(this.currentArticle.id!, formData).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This article was updated successfully!';
      },
      error: (e: HttpErrorResponse) => console.error(e)
    });
  }

  deleteArticle(): void {
    this.articleService.delete(this.currentArticle.id!).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/articles']);
      },
      error: (e: HttpErrorResponse) => console.error(e)
    });
  }
}
