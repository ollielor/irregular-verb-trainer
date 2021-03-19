import {
   UPDATE_RESULTS,
} from '../actions/results';

const initialState = {
   results: [],
};

const resultsReducer = (state = initialState, action) => {
   switch (action.type) {
      case UPDATE_RESULTS:
         return {
            ...state,
            results: action.payload,
         };
      default:
         return state;
   }
};

export default resultsReducer;
