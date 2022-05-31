import { Product, state } from './state';

export const deleteProduct = (config: Product) => {
  return {
    ...state,
    products: state.products?.filter((product) => product.id != config.id),
  };
};

export const addProduct = () => {
  return {
    ...state,
    products: [
      ...state.products,
      {
        ...state.products[state.products?.length - 1],
        id: state.products[state.products?.length - 1].id + 1,
        name: `Product ${state.products[state.products?.length - 1].id + 2}`,
        price: `$${
          parseInt(
            state.products[state.products?.length - 1].price.substring(1)
          ) + 1
        }`,
      },
    ],
  };
};
