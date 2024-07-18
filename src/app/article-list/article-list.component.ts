import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article.interface';
import { ArticleService } from '../services/article.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-articles-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  articles?: Article[];
  currentArticle: Article = {};
  currentIndex = -1;
  title = '';

  constructor(private articleService: ArticleService) { }

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
    this.currentArticle = {};
    this.currentIndex = -1;
  }

  setActiveArticle(article: Article, index: number): void {
    this.currentArticle = article;
    this.currentIndex = index;
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

  searchTitle(): void {
    this.currentArticle = {};
    this.currentIndex = -1;

    this.articleService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.articles = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}