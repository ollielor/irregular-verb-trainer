export const UPDATE_LANGUAGE = 'UPDATE_LANGUAGE';
export const UPDATE_LEVEL = 'UPDATE_LEVEL';

export const updateLanguage = language => {
   return {
      type: UPDATE_LANGUAGE,
      payload: language
   }
}

export const updateLevel = level => {
   return {
      type: UPDATE_LEVEL,
      payload: level
   }
}