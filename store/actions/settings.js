export const GET_SETTINGS = 'GET_SETTINGS';

export const getSettings = settings => {
   return {
      type: FETCH_VERBS_GERMAN,
      payload: {
         language: settings.language,
         level: settings.level
      }
   }
}