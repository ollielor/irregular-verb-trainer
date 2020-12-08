import { UPDATE_LANGUAGE, UPDATE_LEVEL, UPDATE_INFINITIVE, UPDATE_PRESENT, UPDATE_PAST, UPDATE_PRESPERF } from '../actions/settings';

const initialState = {
   language: 1,
   level: 1,
   infinitive: true,
   present: true,
   past: true,
   presperf: true
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
      case UPDATE_INFINITIVE:
            return {
               ...state,
               infinitive: action.payload
            }
      case UPDATE_PRESENT:
            return {
               ...state,
               present: action.payload
            }
      case UPDATE_PAST:
            return {
               ...state,
               past: action.payload
            }
      case UPDATE_PRESPERF:
               return {
                  ...state,
                  presperf: action.payload
               }
      default:
         return state;
   }
}

export default settingsReducer;