import { createStore, combineReducers } from 'redux';
import verbsReducer from './reducers/verbs';
import settingsReducer from './reducers/settings';

const rootReducer = combineReducers({
   verbs: verbsReducer,
   settings: settingsReducer,
});

const store = createStore(rootReducer);

export default store;
