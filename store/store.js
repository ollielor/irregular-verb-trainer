import { createStore, combineReducers } from 'redux';
import verbsReducer from './reducers/verbs';
import settingsReducer from './reducers/settings';
import resultsReducer from './reducers/results';

const rootReducer = combineReducers({
   verbs: verbsReducer,
   settings: settingsReducer,
   results: resultsReducer,
});

const store = createStore(rootReducer);

export default store;
