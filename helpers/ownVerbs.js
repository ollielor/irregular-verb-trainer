import DatabaseOwnVerbs from '../modules/DatabaseOwnVerbs';

import { fetchOwnVerbsSwedish, fetchOwnVerbsGerman } from '../store/actions/verbs';

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

export const insertMeaningId = (meaningId, language) => {
   deleteMeaningId(meaningId, language);
   let query = language === 1 ? 'insert into own_verbs_sv (meaning_id) values (?);' : 'insert into own_verbs_de (meaning_id) values (?);';
   DatabaseOwnVerbs.transaction(
      (tx) => {
         tx.executeSql(query, [
            meaningId
         ]);
      },
      (error) => {
         console.log('Transaction error: ', error);
      },
      null,
      null
   );
};

export const deleteMeaningId = (meaningId, language) => {
   let query = language === 1 ? 'delete from own_verbs_sv where meaning_id = (?);' : 'delete from own_verbs_de where meaning_id = (?);'
   DatabaseOwnVerbs.transaction(
      (tx) => {
         tx.executeSql(query, [
            meaningId
         ]);
      },
      (error) => {
         console.log('Transaction error: ', error);
      },
      null,
      null
   );
}

/* export const fetchMeaningIds = (language) => {
   let query = language === 1 ? 'select * from own_verbs_sv;' : 'select * from own_verbs_de;'
   return DatabaseOwnVerbs.transaction(
      (tx) => {
         tx.executeSql(
            query,
            [],
            (tx, results) => {
               return results.rows._array;
            },
            (tx, error) => {
               console.log('Could not execute query: ', error);
            }
         );
      },
      (error) => {
         console.log('Transaction error: ', error);
      }
   ); 
} */

/* export const fetchOwnVerbs = async (verbsByLanguage, language) => {
   let meaningIds = {};
   meaningIds = {[language]: await fetchMeaningIds(language)};
   let verbsFetched = [];
   verbsFetched = meaningIds[language].map((meaningItem) => meaningItem.meaning_id)
      .map((meaningId) => verbsByLanguage.filter((verb) => verb.meaning_id === meaningId));
   //let verbsFlatten = verbsFetched.flatMap((verbArray) => verbArray);
   let verbsOrdered = [];
   verbsOrdered = verbsFetched.map((verbArray) => verbArray.length < 2 ? verbArray[0] : verbArray);
   if (language === 1) {
      return fetchOwnVerbsSwedish(verbsOrdered);
   } else if (language === 2) {
      return fetchOwnVerbsGerman(verbsOrdered);
   }
} */

/* export const fetchOwnVerbs = async (verbsByLanguage, language) => {
   let meaningIds = {};
   meaningIds = {[language]: await fetchMeaningIds(language)};
   let verbsFetched = [];
   verbsFetched = meaningIds[language].map((meaningItem) => meaningItem.meaning_id)
      .map((meaningId) => verbsByLanguage.filter((verb) => verb.meaning_id === meaningId));
   let verbsOrdered = [];
   verbsOrdered = verbsFetched.map((verbArray) => verbArray);
   if (language === 1) {
      console.log('verbsFetched Swedish: ', verbsOrdered)
      return fetchOwnVerbsSwedish(verbsOrdered);
   } else if (language === 2) {
      console.log('verbsFetched German: ', verbsOrdered)
      return fetchOwnVerbsGerman(verbsOrdered);
   }
};
 */
export const fetchOwnVerbs = async (verbsByLanguage, language) => {
   let meaningIds = {};
   meaningIds = {[language]: await fetchMeaningIds(language)};
   let verbsFetched = [];
   verbsFetched = meaningIds[language].map((meaningItem) => meaningItem.meaning_id)
      .map((meaningId) => verbsByLanguage.filter((verb) => verb.meaning_id === meaningId));
   let verbsFlatten = verbsFetched.flatMap((verbArray) => verbArray);
   //verbsOrdered = verbsFetched.map((verbArray) => verbArray.length < 2 ? verbArray[0] : verbArray);
   if (language === 1) {
      return fetchOwnVerbsSwedish(verbsFlatten);
   } else if (language === 2) {
      return fetchOwnVerbsGerman(verbsFlatten);
   }
}

/* export const fetchOwnVerbs = async (verbsByLanguage, language) => {
   let meaningIds = {};
   meaningIds = {[language]: await fetchMeaningIds(language)};
   let verbsFetched = [];
   verbsFetched = meaningIds[language].map((meaningItem) => meaningItem.meaning_id)
      .map((meaningId) => verbsByLanguage.filter((verb) => verb.meaning_id === meaningId));
   let verbsOrdered = [];
   //verbsOrdered = verbsFetched.map((verbArray) => verbArray.length < 2 ? verbArray[0] : verbArray);
   if (language === 1) {
      console.log('verbsFetched Swedish: ', verbsFetched)
      return fetchOwnVerbsSwedish(verbsFetched);
   } else if (language === 2) {
      console.log('verbsFetched German: ', verbsFetched)
      return fetchOwnVerbsGerman(verbsFetched);
   }
} */
/* 
export const fetchOwnVerbs = async (verbsByLanguage, language) => {
   let meaningIds = {};
   meaningIds = {[language]: await fetchMeaningIds(language)};
   console.log('meaningIds: ', meaningIds);
   let verbsFetched = [];
   verbsFetched = meaningIds[language].map((meaningItem) => meaningItem.meaning_id)
      .map((meaningId) => verbsByLanguage.filter((verb) => verb.meaning_id === meaningId));
   let verbsOrdered = [];
   verbsOrdered = verbsFetched.map((verbArray) => verbArray.length < 2 ? verbArray[0] : verbArray);
   if (language === 1) {
      console.log('verbsOrdered Swedish: ', verbsOrdered)
      return fetchOwnVerbsSwedish(verbsOrdered);
   } else if (language === 2) {
      console.log('verbsOrdered German: ', verbsOrdered)
      return fetchOwnVerbsGerman(verbsOrdered);
   }
}
 */
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