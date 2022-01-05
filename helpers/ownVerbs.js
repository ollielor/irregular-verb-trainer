import DatabaseOwnVerbs from '../modules/DatabaseOwnVerbs';

export const createOwnVerbsDb = (language) => {
   let query;
   if (language === 1) {
      query = 'create table if not exists own_verbs_sv (id integer primary key not null, meaning_id integer);'
   } else {
      query = 'create table if not exists own_verbs_de (id integer primary key not null, meaning_id integer);'
   }
       DatabaseOwnVerbs.transaction(
         (tx) => {
            tx.executeSql(
               query
            );
            return true;
         },
         null,
         null,
         (error) => {
            console.log('Transaction failed: ', error);
            return false;
         }
      );
};

/* export const createOwnVerbsDb = (language) => {
   let query;
   if (language === 1) {
      query = 'create table if not exists own_verbs_sv (id integer primary key not null, meaning_id integer);'
   } else {
      query = 'create table if not exists own_verbs_de (id integer primary key not null, meaning_id integer);'
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
}; */