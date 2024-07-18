import { Component } from '@angular/core';
import { Article } from '../models/article.interface';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent {
  Article: Article = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private ArticleService: ArticleService) {}

  saveArticle(): void {
    const data = {
      title: this.Article.title,
      description: this.Article.description
    };

    this.ArticleService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newArticle(): void {
    this.submitted = false;
    this.Article = {
      title: '',
      description: '',
      published: false
    };
  }
}