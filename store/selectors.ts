import { Store } from '../store';
import { state } from './state';

export const myState = new Store(state);
export const $products = myState.selectState('products');
