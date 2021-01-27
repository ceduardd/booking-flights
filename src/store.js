import { createStore, combineReducers } from 'redux';
import { uiReducer } from './reducers/uiReducer';

const reducer = combineReducers({
  ui: uiReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
