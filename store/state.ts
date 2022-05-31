export const state: State = {
  products: [
    { id: 0, name: 'Product 1', price: '$1' },
    { id: 1, name: 'Product 2', price: '$2' },
    { id: 2, name: 'Product 3', price: '$3' },
  ],
};

export interface State {
  products?: Product[];
}

export interface Product {
  id: number;
  name: string;
  price: string;
}
