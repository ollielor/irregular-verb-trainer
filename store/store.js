import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import verbsReducer from './reducers/verbs';
import settingsReducer from './reducers/settings';
import resultsReducer from './reducers/results';

const rootReducer = combineReducers({
   verbs: verbsReducer,
   settings: settingsReducer,
   results: resultsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
