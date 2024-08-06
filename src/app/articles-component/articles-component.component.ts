import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service'; // Importez votre service pour les articles
import { Article } from '../models/article.interface'; // Importez l'interface Article

@Component({
  selector: 'app-articles',
  templateUrl: './articles-component.component.html', // Assurez-vous que le nom du fichier est correct
  styleUrls: ['./articles-component.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  filteredArticles: Article[] = [];
  categoryName: string = '';

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('categoryName') || '';
      this.loadArticles();
    });
  }

  loadArticles(): void {
    this.articleService.getAll().subscribe((data: Article[]) => {
      this.articles = data;
      this.filterByCategory();
    });
  }

  filterByCategory(): void {
    if (this.categoryName) {
      this.filteredArticles = this.articles.filter(article => article.category === this.categoryName);
    } else {
      this.filteredArticles = this.articles;
    }
  }
}
