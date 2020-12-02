import { FETCH_VERBS_GERMAN } from '../actions/verbs';

const initialState = {
   verbsGerman: []
}

const verbsReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_VERBS_GERMAN:
         return {
            ...state,
            verbsGerman: action.payload
         }
      default:
         return state;
   }
}

export default verbsReducer;