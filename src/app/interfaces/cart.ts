import { Product } from './product';

export interface Cart {
  _id: string;
  cartOwner: string;
  products: Products[];
  createdAt: string;
  updatedAt: string;
  totalCartPrice: number;
}

interface Products {
  count: number;
  _id: string;
  product: Product;
  price: number;
}
