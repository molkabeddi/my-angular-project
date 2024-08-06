import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Article } from '../models/article.interface';

const baseUrl = 'http://localhost:8080/api/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private articlesSubject = new BehaviorSubject<Article[]>([]);
  articles$ = this.articlesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(baseUrl);
  }

  get(id: number): Observable<Article> {
    return this.http.get<Article>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${baseUrl}?title=${title}`);
  }

  deleteByTitle(title: string): Observable<any> {
    return this.http.delete(`${baseUrl}/title/${title}`);
  }

  saveArticle(data: any): Observable<any> {
    if (data.id) {
      return this.update(data.id, data);
    } else {
      return this.create(data);
    }
  }

  loadArticles() {
    this.getAll().subscribe(articles => {
      this.articlesSubject.next(articles);
    });
  }
}
