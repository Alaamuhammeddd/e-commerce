export interface RootState {
  searchQuery: String;
}
export interface SelectedProductState {
  selectedProduct: Product | null;
}
export interface CartItem {
  id: number;
  image: string;
  title: string;
  price: number;
}
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}
