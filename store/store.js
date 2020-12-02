import { createStore, combineReducers } from 'redux';
import verbsReducer from './reducers/verbs';

const rootReducer = combineReducers({
   verbs: verbsReducer
});

const store = createStore(rootReducer);

export default store;
