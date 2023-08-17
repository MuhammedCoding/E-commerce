import { Brand } from './brand';
import { Category } from './category';
export interface Product {
  title: string;
  description: string;
  ratingsAverage: number;
  imageCover: string;
  price: number;
  category: Category;
  brand: Brand;
  id: string;
  images: string[];
}
