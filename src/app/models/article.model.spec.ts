import { Article } from '../models/article.interface';

describe('Article', () => {
  it('should create an instance', () => {
    const article: Article = {
      title: '',
      description: '',
      published: false
    };
    expect(article).toBeTruthy();
  });
});