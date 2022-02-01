import DatabaseOwnVerbs from '../modules/DatabaseOwnVerbs';

import { fetchOwnVerbsSwedish, fetchOwnVerbsGerman } from '../store/actions/verbs';

export const createOwnVerbsDbSwedish = () => {
   let query = 'create table if not exists own_verbs_sv (id integer primary key not null, verb_id integer);'
       DatabaseOwnVerbs.transaction(
         (tx) => {
            tx.executeSql(
               query
            );
         },
         null,
         null,
         (error) => {
            console.log('Transaction failed: ', error);
         }
      );
};

export const createOwnVerbsDbGerman = () => {
   let query = 'create table if not exists own_verbs_de (id integer primary key not null, verb_id integer);'
       DatabaseOwnVerbs.transaction(
         (tx) => {
            tx.executeSql(
               query
            );
         },
         null,
         null,
         (error) => {
            console.log('Transaction failed: ', error);
         }
      );
};

export const deleteVerbId = (verbId, language) => {
   let query = language === 1 ? 'delete from own_verbs_sv where verb_id = ?;' : 'delete from own_verbs_de where verb_id = ?;';
      DatabaseOwnVerbs.transaction(
         (tx) => {
            tx.executeSql(query, [
               verbId
            ],
         )},
         (error) => {
            console.log('Transaction error: ', error);
         },
         null,
         null
      ); 
}

export const insertVerbId = (verbId, language) => {
   let query = language === 1 ? 'insert into own_verbs_sv (verb_id) values (?);' : 'insert into own_verbs_de (verb_id) values (?);';
      DatabaseOwnVerbs.transaction(
         (tx) => {
            tx.executeSql(query, [
               verbId
            ],
         )},
         (error) => {
            console.log('Transaction error: ', error);
         },
         null,
         null
      ); 
   }

export const insertVerbIds = (verbIdArray, language) => {
   let query = language === 1 ? 'insert into own_verbs_sv (verb_id) values (?);' : 'insert into own_verbs_de (verb_id) values (?);';
      DatabaseOwnVerbs.transaction(
         (tx) => {
            for (let verbId of verbIdArray) {
               tx.executeSql(query, [
                  verbId
               ])
            }
         },
         (error) => {
            console.log('Transaction error: ', error);
         },
         null,
         null
      ); 
   }

export const deleteAllVerbIds = (language) => {
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

/* export const getMeaningIdsArray = async (language) => {
   let meaningIds = [];
   meaningIds = await fetchMeaningIds(language);
   console.log(meaningIds.length);
   console.log('meaningIds: ', meaningIds)
   return meaningIds[0].meaning_id; */
/*    if (meaningIds.length > 0) {
      return convertStringsToNumbers(meaningIds[0].meaning_id.split(','));   
   } else {
      return [];
   } */
/* } */

export const fetchVerbIds = (language) => {
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

export const verbArrayOperations = async (verbsByLanguage, language) => {
   let verbsFetched = [];
   let verbsArray = [];
   let verbsArrayWithIds = [];
   let verbsFlatten = [];
   let verbsWithoutDuplicates = [];
   verbsArray = await fetchVerbIds(language);
   verbsArrayWithIds = verbsArray.map((verbObject) => verbObject.verb_id);
   if (verbsArray) {
      //verbsWithoutDuplicateMeaningIds = verbsArrayWithIds.filter((meaningObject, index, self) =>
         //index === self.findIndex((m) => m.meaning_id === meaningObject.meaning_id));
         //console.log('withoutDuplicates: ', verbsWithoutDuplicateMeaningIds)
      verbsFetched = verbsArrayWithIds.map((verbId) => verbsByLanguage.filter((verb) => verb.verb_id === verbId));
      verbsFlatten = verbsFetched.flatMap((verbArray) => verbArray);
      verbsWithoutDuplicates = verbsFlatten.filter((verb, index, self) =>
         index === self.findIndex((v) => v.verb_id === verb.verb_id));
      //index === self.findIndex((m) => m.meaning_id === meaningObject.meaning_id));
      //console.log('withoutDuplicates: ', verbsWithoutDuplicateMeaningIds)
   }
   return verbsWithoutDuplicates;
}

export const fetchOwnVerbs = async (verbsByLanguage, language) => {
      if (language === 1) {
         return fetchOwnVerbsSwedish(await verbArrayOperations(verbsByLanguage, language));
      } else if (language === 2) {
         return fetchOwnVerbsGerman(await verbArrayOperations(verbsByLanguage, language));
      }  
}
