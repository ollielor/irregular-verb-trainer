import DatabaseOwnVerbs from '../modules/DatabaseOwnVerbs';

export const getOwnVerbsFromDb = (language) => {
   let query;
   if (language === 1) {
      query = 'select * from own_verbs_sv;'
   } else {
      query = 'select * from own_verbs_de;'     
   }
   return new Promise((resolve, reject) => {
      DatabaseOwnVerbs.transaction(
         (tx) => {
            tx.executeSql(
               query,
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
      );
   });
};

export const createOwnVerbsDb = (language) => {
   let query;
   if (language === 1) {
      query = 'create table if not exists own_verbs_sv (id integer primary key not null, verb_id integer);'
   } else {
      query = 'create table if not exists own_verbs_de (id integer primary key not null, verb_id integer);'
   }
   return new Promise((resolve, reject) => {
      DatabaseOwnVerbs.transaction(
         (tx) => {
            tx.executeSql(
               query
            );
            resolve(true);
         },
         null,
         null,
         (error) => {
            console.log('Transaction failed: ', error);
            reject(false);
         }
      );
   });
};