import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { 
   Button,
   Container,
   Content,
   Form,
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
import GermanResultView from '../../components/GermanResultView';
import ResultHistoryView from '../../components/ResultHistoryView';
import CardComponentForms from '../../components/CardComponentForms';

const GermanFormsScreen = props => {

   const [verbs, setVerbs] = useState([]);
   const [verbsLoaded, setVerbsLoaded] = useState(false);
   const [level, setLevel] = useState(1);
   const [randomizedVerbs, setRandomizedVerbs] = useState([]);
   const [rndVerbsLoaded, setRndVerbsLoaded] = useState(false);
   const [points, setPoints] = useState(0);
   const [maxPoints, setMaxPoints] = useState(0);
   const [answered, setAnswered] = useState([]);
   const [finished, setFinished] = useState(false);
   const [results, setResults] = useState({});
   const [counterState, setCounterState] = useState(null);
   const [started, setStarted] = useState(true);
   const [resultHistory, setResultHistory] = useState([]);
   const [resultsLoaded, setResultsLoaded] = useState(false);
   const [resultsAdded, setResultsAdded] = useState(false);
   const [dateTime, setDateTime] = useState(null);
   const [verbsWithSynonyms, setVerbsWithSynonyms] = useState([]);
   const [verbsWithoutSynonyms, setVerbsWithoutSynonyms] = useState([]);
   const [correctForm, setCorrectForm] = useState({});
   const [incorrectForm, setIncorrectForm] = useState({});
   
   const navigation = useNavigation();

   FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/verbs_german.db`)
   .then(result => {
   if (result.exists) {
      DatabaseVerbs;
   } else {
   FileSystem.downloadAsync(
      Asset.fromModule(require('../../assets/verbs_german.db')).uri,
      `${FileSystem.documentDirectory}SQLite/verbs_german.db`
   )}
   });
   
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
               'create table if not exists results (id integer primary key not null, type integer, level integer, accuracy integer, q_total integer, points real, maxpoints integer, ratio real, datetime real);')
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
                     setResultsLoaded(true);
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

   const getRandomVerbArray = rndInt => {
      return verbs.filter(verb => verb.meaning_id === rndInt);
   }

   useEffect(() => {
      setLevel(1);
      loadVerbs();
      if (verbsLoaded) {
         let rndVerbArray = []; 
         let rndVerbs = [];
         let rndVerbsFinal = [];
         while (rndVerbsFinal.length <= 4) {
            const rndInt = rndIntGenerator();
            rndVerbArray = getRandomVerbArray(rndInt);
            if (rndVerbArray.length > 0) {
               rndVerbs.push(rndVerbArray);
            }
            console.log('rndVerbs: ', rndVerbs)
            if (rndVerbs.length > 1) {
               /*rndVerbsFinal = rndVerbs.filter((verb, index, self) => index === self.findIndex((v) => (
                  v.verb_id === verb.verb_id
               ))
               )*/
               //rndVerbs.map(rndVerb => {console.log('rndVerb: ', rndVerb)})
              rndVerbsFinal = rndVerbs.filter((verbArray, index, self) => 
                     index === self.findIndex(v => v[0].verb_id === verbArray[0].verb_id)
               )
               console.log('rndVerbsFinal: ', rndVerbsFinal);
            }
         }
         console.log('rndVerbsFinal.length: ', rndVerbsFinal.length)
         const withSynonyms = rndVerbsFinal.filter(verbArray => verbArray.length > 1).map(verbArray => verbArray);
         const withoutSynonyms = rndVerbsFinal.filter(verbArray => verbArray.length === 1).map(verbArray => verbArray);
         console.log('With synonyms: ', withSynonyms);
         console.log('Without synonyms: ', withoutSynonyms);
         setRandomizedVerbs({
            withSynonyms: withSynonyms,
            withoutSynonyms: withoutSynonyms
         });
         setRndVerbsLoaded(true);
      }
   }, [verbsLoaded]);

   /*useEffect(() => {
      setLevel(1);
      loadVerbs();
      if (verbsLoaded && !rndVerbsLoaded) {
         let rndVerbArray = []; 
         let rndVerbs = [];
         let rndVerbsFinal = [];
         while (rndVerbsFinal.length <= 4) {
            const rndInt = rndIntGenerator();
            rndVerbArray = getRandomVerbArray(rndInt);
            if (rndVerbArray.length > 0) {
               rndVerbs.push(rndVerbArray);
            }
            if (rndVerbs.length > 1) {
               /*rndVerbsFinal = rndVerbs.filter((verb, index, self) => index === self.findIndex((v) => (
                  v.verb_id === verb.verb_id
               ))
               )
               rndVerbsFinal = rndVerbs.filter((verbArray, index, self) => index === self.findIndex(v => v[0].meaning_id === verbArray[0].meaning_id))
               console.log('rndVerbsFinal: ', rndVerbsFinal)
            }
         }
         console.log('rndVerbsFinal.length: ', rndVerbsFinal.length)
         setRandomizedVerbs(rndVerbsFinal);
         setRndVerbsLoaded(true);
      }
   }, [verbsLoaded]);*/


   const saveResults = () => {
      //const db = SQLite.openDatabase('results_meaning.db');
      DatabaseResults.transaction(tx => {
         tx.executeSql('insert into results (type, level, accuracy, q_total, points, maxpoints, ratio, datetime) values (?, ?, ?, ?, ?, ?, ?, ?);',
            [1, level, results.amountCorrectAnswers, answered.length, points, results.maxPointsWeighted, results.totalRatioRounded, dateTime])
      }, null, updateList
     )
   }

   const startAgain = () => {
      setStarted(true);
      setFinished(false);
      setPoints(0);
      setMaxPoints(0);
      setAnswered([]);
      setResults({});
      setResultsAdded(false);
   }

   useEffect(() => {
      if (answered === 5) {
         calculateResults();
         setFinished(true);
      }
   }, [answered])

   useEffect(() => {
      if (started) {
         let counter = 60; 
         let intervalId = setInterval(() => {
            if (answered.length === 5 || counter === 0) {
               clearInterval(intervalId);
               setFinished(true);
               setStarted(false);
            } else {
               counter--;
               setCounterState(counter);
            }
         }, 1000)
      }
   }, [started]);

   useEffect(() => {

      if (answered.length === 5) {
         // Sum of items in points array (accuracy):
         let accuracyPoints = points;
         // Sum of correct answers
         let correctAnswers = answered.filter(answer => answer.accuracy === 'correct');
         // Weighted sum of accuracy and speed points
         // 15 seconds subtracted from total time points (counter)
         let totalPoints;
         if (correctAnswers.length >= 3) {
            totalPoints = accuracyPoints + ((counterState + 15) * 0.33333);
         } else {
            totalPoints = accuracyPoints;
         }
         // Weighted point maximum (with 20 speed points)
         let maxPointsWeighted = maxPoints + 20;
         // Ratio of total points and weighted point maximum
         let totalRatio = (totalPoints / maxPointsWeighted) * 100.0;
         let totalRatioRounded = totalRatio.toFixed(2).toString().replace(".", ",")
         setResults({
            totalPoints: totalPoints.toFixed(2).toString().replace(".", ","),
            maxPointsWeighted: maxPointsWeighted,
            totalRatio: totalRatio,
            totalRatioRounded: totalRatioRounded,
            amountCorrectAnswers: correctAnswers.length,
            totalAnswered: answered.length
         })
         setDateTime(getCurrentDate());
         setTimeout(() => {
            setResultsAdded(true);
         }, 2000)
      }
   }, [answered])

   useEffect(() => {
      if (resultsAdded) {
         saveResults();
      }
   }, [resultsAdded])

   const getCurrentDate = () => {
      return new Date().toISOString();
   }

   /*const prepareAnswer = (answer, tense) => {
      let preparedAnswer;
      let stringArray = answer.trim().replace('/', '').toUpperCase().toLowerCase().split(' ');
      let withoutSpacesArray = stringArray.filter(word => word !== '');
      console.log('withoutSpacesArray: ', withoutSpacesArray)
      if (withoutSpacesArray.length === 3) {
         preparedAnswer = withoutSpacesArray[1] + ' ' + withoutSpacesArray[2];
      } else if (withoutSpacesArray.length === 2 && tense !== 'presperf') {
         preparedAnswer = withoutSpacesArray[1];
         console.log('preparedAnswer: ', preparedAnswer);
      } else if (withoutSpacesArray.length === 2 && tense === 'presperf') {
         preparedAnswer = withoutSpacesArray[0] + ' ' + withoutSpacesArray[1];
      } else {
         preparedAnswer = withoutSpacesArray[0];
      }
      return preparedAnswer;
   }*/

   const prepareAnswer = (answer, tense) => {
      let preparedAnswer = '';
      let stringArray = answer.trim().replace('/', '').toUpperCase().toLowerCase().split(' ');
      let withoutPronounsArray = stringArray.filter(word => word !== 'er' && word !== 'sie' && word !== 'es' && word !== 'er/sie' && word !== 'er/sie/es');
      console.log('withoutPronounsArray: ', withoutPronounsArray)
      /*if (withoutSpacesArray.length === 3) {
         preparedAnswer = withoutSpacesArray[0] + ' ' + withoutSpacesArray[1] + ' ' + withoutSpacesArray[2];
      } else if (withoutSpacesArray.length === 2) {
         preparedAnswer = withoutSpacesArray[0] + ' ' + withoutSpacesArray[1] + ' ' + withoutSpacesArray[2]; 
      } else {
         preparedAnswer = withoutSpacesArray[0];
      }*/
      for (let i=0; i < withoutPronounsArray.length; i++) {
         preparedAnswer += ' ' + withoutPronounsArray[i];
         console.log('preparedAnswer from loop: ', preparedAnswer)
      }
      return preparedAnswer.trim();
   }

   const checkAnswerStrings = (preparedAnswer, correct) => {
      if (Array.isArray(correct)) {
         for (let i=0; i < correct.length; i++) {
            if (preparedAnswer === correct[i].replace('/', '')) {
               console.log('preparedAnswer: ', preparedAnswer)
               return true;
            }
         }
      } else if (!Array.isArray(correct) && preparedAnswer === correct) {
         return true;
      }
   }

   const evaluate = (answer, correct, tense, verbId) => {
      console.log('evaluate');
      console.log('Tense: ', tense);
      const preparedAnswer = prepareAnswer(answer, tense);
      let correctModified;
      if (!Array.isArray(correct)) {
         correctModified = correct.replace('/', '');
      } else {
         correctModified = correct;
      }
      if (checkAnswerStrings(preparedAnswer, correctModified)) {
         setCorrectForm({form: tense, verbId: verbId});
         /*switch (tense) {
            case 'infinitive':
               setCorrectForms([...correctForms, {form: tense, verbId: verbId}]);
               break;
            case 'present':
               setCorrectForms([...correctForms, {present: true, verbId: verbId}]);
               break;
            case 'past':
               setCorrectForms([...correctForms, {present: true, verbId: verbId}]);
               break;
            case 'presperf':
               setCorrectForms([...correctForms, {present: true, verbId: verbId}]);
               break;
         }*/
         console.log('correctForm: ', correctForm)
         setPoints(points + 20);
      } else {
         setIncorrectForm({form: tense, verbId: verbId});
      }
   }
 
   return (
      <Container style={styles.container}>
         <HeaderComponent title='Verbien muotoja' goBack={navigation.goBack} />
            <KeyboardAvoidingView behavior='padding'>
               <ScrollView>
               {randomizedVerbs.withSynonyms && randomizedVerbs.withSynonyms.map((verbForm, index) =>
                   <CardComponentForms 
                     key={index} 
                     verbForm={verbForm} 
                     synonyms={true} 
                     evaluate={evaluate}
                     correctForm={correctForm}
                     incorrectForm={incorrectForm}
                  />
               )}
               {randomizedVerbs.withoutSynonyms && randomizedVerbs.withoutSynonyms.map((verbForm, index) => verbForm.map((v, i) =>
                  <CardComponentForms 
                     key={index} 
                     verbForm={v} 
                     synonyms={false} 
                     evaluate={evaluate} 
                     correctForm={correctForm}
                     incorrectForm={incorrectForm}
                  />
               ))}
               </ScrollView>
            </KeyboardAvoidingView>
         <FooterComponent />
      </Container>
    );
   }

export default GermanFormsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d2d2d2',
  },
  contentContainer: {
     padding: 10
  },
  formStyle: {
     paddingRight: 20
  }
});
