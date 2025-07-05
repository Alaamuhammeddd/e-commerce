export interface RootState {
  searchQuery: String;
}
export interface SelectedProductState {
  selectedProduct: Product | null;
}
export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
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
