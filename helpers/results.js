import DatabaseResults from '../modules/DatabaseResults';

/*    export const dbResults = () => {
      return new Promise((resolve, reject) => {
         let resultsArray;
         DatabaseResults.transaction(
            (tx) => {
               tx.executeSql(
                  'select * from results;',
                  [],
                  (tx, results) => {
                     resultsArray = results.rows._array;
                  },
                  (tx, error) => {
                     console.log('Could not execute query: ', error);
                  }
               );
               resolve(resultsArray);
            },
      (error) => {
         console.log('Transaction error: ', error);
      }
   )
   })
   } */

   export const getResults = () => {
      return new Promise((resolve, reject) => {
         DatabaseResults.transaction(
            (tx) => {
               tx.executeSql(
                  'select * from results;',
                  [],
                  (tx, results) => {
                     resolve(results.rows._array);
                  },
                  (tx, error) => {
                     reject(console.log('Could not execute query: ', error));
                  }
               );
            },
      (error) => {
         console.log('Transaction error: ', error);
      }
   )
   })
   }


/*    export const getResults = () => {
         DatabaseResults.transaction(
            (tx) => {
               tx.executeSql(
                  'select * from results;',
                  [],
                  (tx, results) => {
                     return results;
                  },
                  (tx, error) => {
                     return error;
                  }
               );
            },
      (error) => {
         console.log('Transaction error: ', error);
      }
      )
   } */

   export const createResultsDb = () => {
      return new Promise((resolve, reject) => {
         DatabaseResults.transaction(
            (tx) => {
               tx.executeSql(
                  'create table if not exists results (id integer primary key not null, type integer, language integer, level integer, accuracy integer, q_total integer, points real, maxpoints integer, percentage real, datetime real);'
               );
               resolve(true);          
            },
            null,
            null,
            (error) => { 
               console.log('Transaction failed: ', error);
               reject(false);
            }
         )
      })
   }

