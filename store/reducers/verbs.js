import { FETCH_VERBS } from '../actions/verbs';

const initialState = {
   verbs: []
}

const verbsReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_VERBS:
         return {
            ...state,
            verbs: action.payload
         }
      default:
         return state;
   }
}

export default verbsReducer;