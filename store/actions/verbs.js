export const FETCH_VERBS = 'FETCH_VERBS';
export const FETCH_VERBS_SUCCESS = 'FETCH_VERBS_SUCCESS';
export const FETCH_VERBS_FAILURE = 'FETCH_VERBS_FAILURE';

export const fetchVerbs = verbs => {
   return {
      type: FETCH_VERBS,
      payload: verbs
   }
}