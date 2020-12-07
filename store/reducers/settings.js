import { UPDATE_LANGUAGE, UPDATE_LEVEL } from '../actions/settings';

const initialState = {
   language: 1,
   level: 1
}

const settingsReducer = (state = initialState, action) => {
   switch (action.type) {
      case UPDATE_LANGUAGE:
         return {
            ...state,
            language: action.payload
         }
      case UPDATE_LEVEL:
            return {
               ...state,
               level: action.payload
            }
      default:
         return state;
   }
}

export default settingsReducer;