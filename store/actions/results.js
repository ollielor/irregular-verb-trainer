export const UPDATE_RESULTS = 'UPDATE_RESULTS';

export const updateResults = (results) => {
   return {
      type: UPDATE_RESULTS,
      payload: results,
   };
};
