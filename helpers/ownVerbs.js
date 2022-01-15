import DatabaseOwnVerbs from '../modules/DatabaseOwnVerbs';

import { fetchOwnVerbsSwedish, fetchOwnVerbsGerman } from '../store/actions/verbs';

export const createOwnVerbsDbSwedish = () => {
   let query = 'create table if not exists own_verbs_sv (id integer primary key not null, meaning_id string);'
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

export const createOwnVerbsDbGerman = () => {
   let query = 'create table if not exists own_verbs_de (id integer primary key not null, meaning_id text);'
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

export const insertMeaningIds = (meaningIdArray, language) => {
   let meaningIdString = meaningIdArray.join();
   console.log('meaningIdString: ', meaningIdString)
   let query = language === 1 ? 'insert into own_verbs_sv (meaning_id) values (?);' : 'insert into own_verbs_de (meaning_id) values (?);';
      DatabaseOwnVerbs.transaction(
         (tx) => {
            tx.executeSql(query, [
               meaningIdString
            ],
         )},
         (error) => {
            console.log('Transaction error: ', error);
         },
         null,
         null
      ); 
   }

export const deleteAllMeaningIds = (language) => {
   let query = language === 1 ? 'delete from own_verbs_sv;' : 'delete from own_verbs_de;'
      DatabaseOwnVerbs.transaction(
         (tx) => {
            tx.executeSql(query);
         },
         (error) => {
            console.log('Transaction error: ', error);
         },
         null,
         null
      );
}

export const fetchOwnVerbs = async (verbsByLanguage, language) => {
   let verbsFetched = [];
   let verbsArray = [];
   let verbsFlatten = [];
   verbsArray = await getMeaningIdsArray(language);
   console.log(verbsArray)
   if (verbsArray) {
      verbsFetched = verbsArray.map((meaningId) => verbsByLanguage.filter((verb) => verb.meaning_id === meaningId));
      verbsFlatten = verbsFetched.flatMap((verbArray) => verbArray);
   }
   console.log('verbsFlatten: ', verbsFlatten)
         //verbsOrdered = verbsFetched.map((verbArray) => verbArray.length < 2 ? verbArray[0] : verbArray);
      if (language === 1) {
         return fetchOwnVerbsSwedish(verbsFlatten);
      } else if (language === 2) {
         return fetchOwnVerbsGerman(verbsFlatten);
      }  
}

export const getMeaningIdsArray = async (language) => {
   let meaningIds = [];
   meaningIds = await fetchMeaningIds(language);
   console.log(meaningIds.length);
   console.log('meaningIds: ', meaningIds)
   if (meaningIds.length > 0) {
      return convertStringsToNumbers(meaningIds[0].meaning_id.split(','));   
   } else {
      return [];
   }
}

export const fetchMeaningIds = (language) => {
   let query = language === 1 ? 'select * from own_verbs_sv;' : 'select * from own_verbs_de;'
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
}

export const convertStringsToNumbers = (meaningIdArray) => {
   const newArray = meaningIdArray.map((meaningId) => parseInt(meaningId));
   return newArray;
}
