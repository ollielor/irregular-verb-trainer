export const FETCH_VERBS_GERMAN = 'FETCH_VERBS_GERMAN';
export const FETCH_VERBS_SUCCESS = 'FETCH_VERBS_SUCCESS';
export const FETCH_VERBS_FAILURE = 'FETCH_VERBS_FAILURE';

export const fetchVerbsGerman = verbsGerman => {
   return {
      type: FETCH_VERBS_GERMAN,
      payload: verbsGerman
   }
}