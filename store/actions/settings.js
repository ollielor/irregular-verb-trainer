export const UPDATE_LANGUAGE = 'UPDATE_LANGUAGE';
export const UPDATE_LEVEL = 'UPDATE_LEVEL';
export const UPDATE_INFINITIVE = 'UPDATE_INFINITIVE';
export const UPDATE_PRESENT = 'UPDATE_PRESENT';
export const UPDATE_PAST = 'UPDATE_PAST';
export const UPDATE_PRESPERF = 'UPDATE_PRESPERF';

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

export const updateInfinitive = infinitive => {
   return {
      type: UPDATE_INFINITIVE,
      payload: infinitive
   }   
}

export const updatePresent = present => {
   return {
      type: UPDATE_PRESENT,
      payload: present
   }   
}

export const updatePast = past => {
   return {
      type: UPDATE_PAST,
      payload: past
   }   
}

export const updatePresperf = presperf => {
   return {
      type: UPDATE_PRESPERF,
      payload: presperf
   }   
}