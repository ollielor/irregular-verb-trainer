import { FETCH_VERBS_GERMAN } from '../actions/verbs';
import { FETCH_VERBS_SWEDISH } from '../actions/verbs';

const initialState = {
   verbsGerman: [],
   verbsSwedish: [],
};

const verbsReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_VERBS_GERMAN:
         return {
            ...state,
            verbsGerman: action.payload,
         };
      case FETCH_VERBS_SWEDISH:
         return {
            ...state,
            verbsSwedish: action.payload,
         };
      default:
         return state;
   }
};

export default verbsReducer;
