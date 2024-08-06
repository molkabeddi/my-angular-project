export interface Article {
  id?: number; // Add this line to include id

  title: string;
  content: string;
  published: boolean;
  image?: string;
  category: string;
  price: number;
  // Add this line for image
}
