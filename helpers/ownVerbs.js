import DatabaseOwnVerbs from '../modules/DatabaseOwnVerbs';

export const getResults = () => {
   return new Promise((resolve, reject) => {
      DatabaseOwnVerbs.transaction(
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
      );
   });
};

export const createOwnVerbs = () => {
   return new Promise((resolve, reject) => {
      DatabaseOwnVerbs.transaction(
         (tx) => {
            tx.executeSql(
               'create table if not exists own_verbs_swedish (id integer primary key not null, meaning_id integer, active integer);'
            );
            tx.executeSql(
                'create table if not exists own_verbs_german (id integer primary key not null, meaning_id integer, active integer);'
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

export const saveOwnVerbs = (
    language,
    meaning_id,
    active
) => {
   return new Promise((resolve, reject) => {
    let query;
    if (language === 1) {
        query = 'insert into own_verbs_swedish (meaning_id, active) values (?, ?);';
    } else {
        query = 'insert into own_verbs_german (meaning_id, active) values (?, ?);'
    }
    DatabaseOwnVerbs.transaction(
         (tx) => {
            tx.executeSql(
               query,
               [
                  meaning_id,
                  active
               ]
            );
            resolve(true);
         },
         (error) => {
            reject(new Error('Transaction error: ', error));
         },
         null,
         null
      );
   });
};
