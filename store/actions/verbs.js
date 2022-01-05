export const FETCH_VERBS_GERMAN = 'FETCH_VERBS_GERMAN';
export const FETCH_VERBS_SWEDISH = 'FETCH_VERBS_SWEDISH';
export const FETCH_OWN_VERBS_GERMAN = 'FETCH_OWN_VERBS_GERMAN';
export const FETCH_OWN_VERBS_SWEDISH = 'FETCH_OWN_VERBS_SWEDISH';
export const FETCH_VERBS_SUCCESS = 'FETCH_VERBS_SUCCESS';
export const FETCH_VERBS_FAILURE = 'FETCH_VERBS_FAILURE';

export const fetchVerbsGerman = (verbsGerman) => {
   return {
      type: FETCH_VERBS_GERMAN,
      payload: verbsGerman,
   };
};

export const fetchVerbsSwedish = (verbsSwedish) => {
   return {
      type: FETCH_VERBS_SWEDISH,
      payload: verbsSwedish,
   };
};

export const fetchOwnVerbsGerman = (verbsGermanOwn) => {
   return {
      type: FETCH_OWN_VERBS_GERMAN,
      payload: verbsGermanOwn,
   };
};

export const fetchOwnVerbsSwedish = (verbsSwedishOwn) => {
   return {
      type: FETCH_OWN_VERBS_SWEDISH,
      payload: verbsSwedishOwn,
   };
};

