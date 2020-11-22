import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { 
   Button,
   Container,
   Content,
   Text
} from 'native-base';

import DatabaseVerbs from '../../modules/DatabaseVerbs';
import DatabaseResults from '../../modules/DatabaseResults';
//import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import { useNavigation } from '@react-navigation/native';

import FooterComponent from '../../components/FooterComponent';
import HeaderComponent from '../../components/HeaderComponent';
import MeaningCardComponent from '../../components/MeaningCardComponent';
import GermanResultView from '../../components/GermanResultView';
import LatestResultsGerman from '../../components/LatestResultsGerman';

const GermanMeaningsScreen = props => {

   const [verbs, setVerbs] = useState([]);
   const [verbsLoaded, setVerbsLoaded] = useState(false);
   const [level, setLevel] = useState(1);
   const [randomizedVerbs, setRandomizedVerbs] = useState([]);
   const [rndVerbsLoaded, setRndVerbsLoaded] = useState(false);
   const [points, setPoints] = useState(0);
   const [maxPoints, setMaxPoints] = useState(0);
   const [totalPercentageUnrounded, setTotalPercentageUnrounded] = useState(0);
   const [answered, setAnswered] = useState([]);
   const [finished, setFinished] = useState(false);
   const [results, setResults] = useState({});
   const [counterState, setCounterState] = useState(null);
   const [started, setStarted] = useState(true);
   const [resultHistory, setResultHistory] = useState([]);
   const [resultsLoaded, setResultsLoaded] = useState(false);
   const [resultsReady, setResultsReady] = useState(false);
   const [resultsSaved, setResultsSaved] = useState(false);
   const [dateTime, setDateTime] = useState(null);
   
   const navigation = useNavigation();

   /*FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/verbs_german.db`)
   .then(result => {
   if (result.exists) {
      DatabaseVerbs;
   } else {
   FileSystem.downloadAsync(
      Asset.fromModule(require('../../assets/verbs_german.db')).uri,
      `${FileSystem.documentDirectory}SQLite/verbs_german.db`
   )}
   });*/

   useEffect(() => {
      return () => {

      }
   }, [])

   useEffect(() => {
      DatabaseVerbs;
   })
   
   const loadVerbs = () => {
      //const db = SQLite.openDatabase('verbs_german.db');

      let query;

      switch (level) {
         case 1:
            query = 'select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id where level=1;';
            break;
         case 2:
            query = 'select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id where level=2;'; 
            break;
         case 3: 
            query = 'select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id where level=3;'; 
            break;
         case 4:
            query = 'select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id;'; 
            break;
      }
         DatabaseVerbs.transaction(
            tx => {
               tx.executeSql(
                  query, 
                  [],
                  (tx, results) => {
                     setVerbs(results.rows._array);
                     setVerbsLoaded(true);
                  },
                  (tx, error) => {
                     console.log('Could not execute query: ', error);
                  }
               );
            },
            error => {
               console.log('Transaction error: ', error);
            },
         );  
         createResultsDb();
   }
 
   const createResultsDb = () => {
      //const db = SQLite.openDatabase('results_meaning.db') 
         DatabaseResults.transaction(tx => {
            tx.executeSql(
               'create table if not exists results (id integer primary key not null, type integer, language integer, level integer, accuracy integer, q_total integer, points real, maxpoints integer, percentage real, datetime real);')
         }, null, updateList);
      }


      const updateList = () => {
         //const db = SQLite.openDatabase('results_meaning.db') 
         /*db.transaction(tx => {
            tx.executeSql('select * from results_meaning;', [], (_, { rows }) =>
               setResultHistory(rows._array)
            );
         });*/

         DatabaseResults.transaction(
            tx => {
               tx.executeSql(
                  'select * from results;', 
                  [],
                  (tx, results) => {
                     setResultHistory(results.rows._array);
                  },
                  (tx, error) => {
                     console.log('Could not execute query: ', error);
                  }
               );
            },
            error => {
               console.log('Transaction error: ', error);
            },
         );  
      }


   const rndIntGenerator = () => {
      return Math.floor(Math.random() * verbs.length);
   }

   const getRandomVerb = rndInt => {
      return verbs.filter(verb => verb.verb_id === rndInt)[0];
   }

   useEffect(() => {
      setLevel(1);
      loadVerbs();
      if (verbsLoaded) {
         let rndVerb; 
         let rndVerbs = [];
         let rndVerbsFinal = [];
         while (rndVerbsFinal.length <= 14) {
            const rndInt = rndIntGenerator();
            rndVerb = getRandomVerb(rndInt);
            if (rndVerb !== undefined) {
               rndVerbs.push(rndVerb);
            }
            if (rndVerb !== undefined && rndVerbs.length > 1) {
               rndVerbsFinal = rndVerbs.filter((verb, index, self) => index === self.findIndex((v) => (
                  v.verb_id === verb.verb_id
               ))
               )
            }
         }
         let rndVerbsThree = [];
         let verbObject = {};
         let verbObjectArray = [];
         for (let i=0; i <= 2; i++) {
            rndVerbsThree.push(rndVerbsFinal[i]);
         }
         verbObjectArray.push(rndVerbsThree);
         rndVerbsThree = [];
         for (let i=3; i <= 5; i++) {
            rndVerbsThree.push(rndVerbsFinal[i]);
         }
         verbObjectArray.push(rndVerbsThree);
         rndVerbsThree = [];
         for (let i=6; i <= 8; i++) {
            rndVerbsThree.push(rndVerbsFinal[i]);
         }
         verbObjectArray.push(rndVerbsThree);
         rndVerbsThree = [];
         for (let i=9; i <= 11; i++) {
            rndVerbsThree.push(rndVerbsFinal[i]);
         }
         verbObjectArray.push(rndVerbsThree);
         rndVerbsThree = [];
         for (let i=12; i < rndVerbsFinal.length; i++) {
            rndVerbsThree.push(rndVerbsFinal[i]);
         }
         verbObjectArray.push(rndVerbsThree);
         rndVerbsThree = [];
         setRandomizedVerbs(verbObjectArray);
         setRndVerbsLoaded(true);
      }
   }, [verbsLoaded]);

   const evaluate = accuracy => {
      console.log(accuracy);
      if (accuracy) {
         setPoints(points + 20);
         console.log(points);
         setAnswered([...answered, {accuracy: 'correct'}])
         console.log(answered);
      }
      if (!accuracy) {
         setAnswered([...answered, {accuracy: 'incorrect'}]);
         console.log(answered);
      }
      setMaxPoints(maxPoints + 20);

   }

   useEffect(() => {
      //const db = SQLite.openDatabase('results_meaning.db');
      if (resultsReady && dateTime && !resultsSaved) {
         DatabaseResults.transaction(tx => {
            tx.executeSql('insert into results (type, language, level, accuracy, q_total, points, maxpoints, percentage, datetime) values (?, ?, ?, ?, ?, ?, ?, ?, ?);',
               [1, 1, level, results.amountCorrectAnswers, answered.length, results.totalPoints, results.maxPoints, results.totalPercentage, dateTime])
         }, 
         error => {
            console.log('Transaction error: ', error);
         }, null, updateList
        )
        setResultsSaved(true);
      }
   }, [resultsReady, dateTime]);

   useEffect(() => {
      updateList();
   }, [resultsSaved])

   const startAgain = () => {
      setStarted(true);
      setFinished(false);
      setPoints(0);
      setMaxPoints(0);
      setAnswered([]);
      setResults({});
      setResultsReady(false);
      setResultsSaved(false);
   }

   useEffect(() => {
      if (answered.length === 5) {
         setFinished(true);
      }
   }, [answered])

   /*useEffect(() => {
      console.log('Finished: ', finished);
   }, [finished]);*/

   /*const evaluate = (meaning, index) => {
      if (meaning === correctMeaning) {
         setCorrect(true);
         setCorrectIndex(index);
         props.setPoints([...props.points, 20])
         props.setAnswered([...props.answered, {accuracy: 'correct'}]);
         //props.answered.concat({accuracy: 'correct'});
      } else {
         setIncorrect(true);
         setIncorrectIndex(index);
         props.setAnswered([...props.answered, {accuracy: 'incorrect'}]);
         //props.answered.concat({accuracy: 'incorrect'});
      }
      props.setMaxPoints([...props.maxPoints, 20])
   }*/



   useEffect(() => {
         let counter = 0; 
         let intervalId = setInterval(() => {
               counter++;
               setCounterState(counter);
         }, 1000)
         if (finished) {
            clearInterval(intervalId);
         }
         return () => {
            clearInterval(intervalId);
         }
   }, [started, finished]);

   useEffect(() => {

      if (finished) {
         // Sum of items in points array (accuracy):
         // Sum of correct answers
         let correctAnswers = answered.filter(answer => answer.accuracy === 'correct');
         // Weighted sum of accuracy and speed points
         // 15 seconds subtracted from total time points (counter)
         let totalPoints;
         let accuracyPercentage = (points / maxPoints) * 100.0;
         if (counterState < 10 && accuracyPercentage >= 80) {
            totalPoints = (points + counterState * 0.1) * 1.0;
         } else if (counterState >= 10 && counterState < 20) {
            totalPoints = points * 1.0;
         } else if (counterState >= 30) {
            totalPoints = (points - counterState * 0.1) * 1.0;
         } else {
            totalPoints = points * 1.0;
         }
         console.log(points);
         console.log(totalPoints);
         // Weighted point maximum (with 20 speed points)
         // Ratio of total points and weighted point maximum
         let totalPercentage = (totalPoints / maxPoints) * 100.0;
         //setTotalPercentageUnrounded(totalPercentage);
         setResults({
            totalPoints: totalPoints,
            maxPoints: maxPoints,
            totalPercentage: totalPercentage,
            amountCorrectAnswers: correctAnswers.length,
            totalAnswered: answered.length
         })
         setDateTime(getCurrentDate());
         setResultsReady(true);
      }
   }, [finished])

   /*useEffect(() => {
      if (resultsReady) {
         saveResults();
      }
   }, [resultsReady])*/

   const getCurrentDate = () => {
      return new Date().toISOString();
   }
   /*const getCurrentDate = separator => {    
      let newDate = new Date()
      let date = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();
      let 
      
      return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
   }*/

   return (
      <Container style={styles.container}>
         <HeaderComponent title='Verbien merkityksiä' goBack={navigation.goBack} />
            <Content>
               {/*<Text>
                  answered: {answered.length} finished: {String(finished)} counter: {counterState}
               </Text>
               */}
               {!randomizedVerbs && 
                  <Text>
                     Arvotaan verbejä...
                  </Text>
               }
               {answered.length < 5 && randomizedVerbs &&
                  randomizedVerbs.map((verbGroup, index) => 
                     <MeaningCardComponent 
                        key={index} 
                        alternatives={verbGroup} 
                        evaluate={evaluate}
                     />

                  )
               }
               {finished && results && resultsSaved && resultHistory &&
                  <>
                     <GermanResultView
                        results={results}
                        startAgain={startAgain}
                     />
                     <LatestResultsGerman
                        resultHistory={resultHistory}
                     />
                  </>
               }
            </Content>
         <FooterComponent />
      </Container>
    );
   }

export default GermanMeaningsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d2d2d2',
  },
  contentContainer: {
     padding: 10
  },
});
