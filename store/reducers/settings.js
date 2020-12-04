import { SAVE_SETTINGS } from '../actions/settings';

const initialState = {
   language: 2,
   level: 3
}

const settingsReducer = (state = initialState, action) => {
   switch (action.type) {
      case SAVE_SETTINGS:
         return {
            ...state,
            language: action.payload.language,
            level: action.payload.level
         }
      default:
         return state;
   }
}

export default settingsReducer;