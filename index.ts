import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from './store';
import { $products, myState } from './store/selectors';

import { Product } from './store/state';

const productsTable = document.querySelector('#productsTable');

const showProducts = (products: Product[]) => {
  productsTable.innerHTML = '';
  products.forEach(({ id, name, price }) => {
    const tr = document.createElement('tr');
    const firstColumn = document.createElement('td');
    const secondColumn = document.createElement('td');
    const thirdColumn = document.createElement('td');
    const fourthColumn = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.append('Delete');
    deleteButton.classList.add('btn-delete');
    deleteButton.setAttribute('id', `${id}`);
    firstColumn.append(id.toString());
    secondColumn.append(name);
    thirdColumn.append(price);
    fourthColumn.append(deleteButton);
    tr.append(firstColumn);
    tr.append(secondColumn);
    tr.append(thirdColumn);
    tr.append(fourthColumn);
    productsTable.append(tr);
  });
};

$products.subscribe((data: Product[]) => {
  showProducts(data);
});

fromEvent(document.querySelectorAll('.btn-delete'), 'click')
  .pipe(map((event) => event.target as HTMLButtonElement))
  .subscribe((element) => {
    myState.dispatch({
      actionName: 'deleteProduct',
      config: { id: element.id },
    });
    showProducts(Store.getStore().products);
  });

fromEvent(document.querySelector('#addProduct'), 'click').subscribe(() => {
  myState.dispatch({
    actionName: 'addProduct',
  });
  showProducts(Store.getStore().products);
});
