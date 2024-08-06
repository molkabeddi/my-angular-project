import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.interface'; // Import the Article interface

@Component({
  selector: 'app-article',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  article: Article = { // Initialize the article object with default values
    title: '',
    content: '',
    published: false,
    image: '',
    category: '',
    price: 0
  };

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
  }

  saveArticle() {
    this.articleService.create(this.article).subscribe(article => {
      console.log('Article saved:', article);
    });
  }
}