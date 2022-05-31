import { map, of } from 'rxjs';
import * as reducers from './store/reducers';
import { State } from './store/state';

export class Store {
  static _instance: Store;
  static _state: State;
  constructor(state: State) {
    if (Store._instance) {
      throw new Error(
        "Singleton classes can't be instantiated more than once."
      );
    }
    Store._instance = this;
    Store._state = state;
  }

  static getStore() {
    return this._state;
  }

  dispatch(action: { actionName: string; config?: unknown }) {
    if (action.config) {
      Store._state = reducers[action.actionName](action.config);
    } else {
      Store._state = reducers[action.actionName]();
    }
  }

  selectState(selector: string) {
    return of(Store._state).pipe(
      map((data) => {
        return data[selector];
      })
    );
  }
}
