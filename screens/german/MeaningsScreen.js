import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Text } from 'native-base';

import DatabaseResults from '../../modules/DatabaseResults';

import { useNavigation } from '@react-navigation/native';

import {
   getRndVerbs,
   getCurrentDate,
   filterVerbsByLevel,
} from '../../helpers/helpers';

import FooterComponent from '../../components/footer/FooterComponent';
import HeaderComponent from '../../components/header/HeaderComponent';
import CardComponentMeanings from '../../components/cards/CardComponentMeanings';
import ResultView from '../../components/results/ResultView';
import LatestResults from '../../components/results/LatestResults';
import SpinnerComponent from '../../components/styling/SpinnerComponent';

import { connect } from 'react-redux';

const MeaningsScreen = (props) => {
   const [verbs, setVerbs] = useState([]);
   const [verbsFiltered, setVerbsFiltered] = useState(false);
   const [randomizedVerbs, setRandomizedVerbs] = useState([]);
   const [points, setPoints] = useState(0);
   const [maxPoints, setMaxPoints] = useState(0);
   const [answered, setAnswered] = useState([]);
   const [finished, setFinished] = useState(false);
   const [results, setResults] = useState({});
   const [counterState, setCounterState] = useState(null);
   const [started, setStarted] = useState(true);
   const [resultHistory, setResultHistory] = useState([]);
   const [resultsReady, setResultsReady] = useState(false);
   const [resultsSaved, setResultsSaved] = useState(false);
   const [dateTime, setDateTime] = useState(null);
   const [tableCreated, setTableCreated] = useState(false);

   const navigation = useNavigation();

   useEffect(() => {
      createResultsDb();
      return () => {};
   }, []);

   useEffect(() => {
      setVerbsFiltered(false);
      let verbsByLanguage;
      if (props.language === 1) {
         verbsByLanguage = props.verbsSwedish.filter(verb => verb.infinitive.length > 1);
         console.log(verbsByLanguage);
      } else {
         verbsByLanguage = props.verbsGerman;
      }
      console.log('Level: ', props.level)
      const filteredVerbs = filterVerbsByLevel(verbsByLanguage, props.level);
      setVerbs(filteredVerbs);
      setVerbsFiltered(true);
   }, [props.level, props.language]);

   const createResultsDb = () => {
      DatabaseResults.transaction(
         (tx) => {
            tx.executeSql(
               'create table if not exists results (id integer primary key not null, type integer, language integer, level integer, accuracy integer, q_total integer, points real, maxpoints integer, percentage real, datetime real);'
            );
         },
         null,
         updateList
      );
      setTableCreated(true);
   };

   const updateList = () => {
      DatabaseResults.transaction(
         (tx) => {
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
         (error) => {
            console.log('Transaction error: ', error);
         }
      );
   };

   useEffect(() => {
      let amount = 15;
      /*if (props.language === 1 && props.level === 1) {
         amount = 6;
      }*/
      if (verbsFiltered) {
         const verbObjectArray = getRndVerbs(verbs, amount); // 15
         console.log(verbObjectArray)
         setRandomizedVerbs(verbObjectArray);
      }
   }, [verbsFiltered]);

   const evaluate = (accuracy) => {
      if (accuracy) {
         setPoints(points + 20);
         setAnswered([...answered, { accuracy: 'correct' }]);
      }
      if (!accuracy) {
         setAnswered([...answered, { accuracy: 'incorrect' }]);
      }
      setMaxPoints(maxPoints + 20);
   };

   useEffect(() => {
      if (tableCreated && resultsReady && dateTime && !resultsSaved) {
         DatabaseResults.transaction(
            (tx) => {
               tx.executeSql(
                  'insert into results (type, language, level, accuracy, q_total, points, maxpoints, percentage, datetime) values (?, ?, ?, ?, ?, ?, ?, ?, ?);',
                  [
                     1,
                     props.language,
                     props.level,
                     results.amountCorrectAnswers,
                     answered.length,
                     results.totalPoints,
                     results.maxPoints,
                     results.totalPercentage,
                     dateTime,
                  ]
               );
            },
            (error) => {
               console.log('Transaction error: ', error);
            },
            null,
            updateList
         );
         setResultsSaved(true);
      }
   }, [resultsReady, dateTime, tableCreated]);

   useEffect(() => {
      updateList();
   }, [resultsSaved]);

   const startAgain = () => {
      setStarted(true);
      setFinished(false);
      setPoints(0);
      setMaxPoints(0);
      setAnswered([]);
      setResults({});
      setResultsReady(false);
      setResultsSaved(false);
   };

   useEffect(() => {
      if (answered.length === 5) {
         setFinished(true);
      }
   }, [answered]);

   useEffect(() => {
      let counter = 0;
      let intervalId = setInterval(() => {
         counter++;
         setCounterState(counter);
      }, 1000);
      if (finished) {
         clearInterval(intervalId);
      }
      return () => {
         clearInterval(intervalId);
      };
   }, [started, finished]);

   useEffect(() => {
      if (finished) {
         // Sum of correct answers
         let correctAnswers = answered.filter(
            (answer) => answer.accuracy === 'correct'
         );
         let totalPoints;
         // Accuracy percentage, i.e. points amount divided by max points
         let accuracyPercentage = (points / maxPoints) * 100.0;
         // If time elapsed is less than 10 seconds and accuracy is at least 80 %, extra points are given
         if (counterState < 10 && accuracyPercentage >= 80) {
            totalPoints = (points + counterState * 0.1) * 1.0;
            // If time elapsed is greater than 30, minus points are given
         } else if (counterState >= 30) {
            totalPoints = (points - counterState * 0.1) * 1.0;
            // If time elapsed is average (not under 10 seconds or over 30 seconds), no bonus or minus points are given
         } else {
            totalPoints = points * 1.0;
         }
         // Weighted percentage: points with bonus points or minus points or without them are divided by max points
         let totalPercentage = (totalPoints / maxPoints) * 100.0;
         setResults({
            totalPoints: totalPoints,
            maxPoints: maxPoints,
            totalPercentage: totalPercentage,
            amountCorrectAnswers: correctAnswers.length,
            totalAnswered: answered.length,
         });
         setDateTime(getCurrentDate());
         setResultsReady(true);
      }
   }, [finished]);

   return (
      <Container style={styles.container}>
         <HeaderComponent
            title="Verbien merkityksiä"
            goBack={navigation.goBack}
         />
         <Content>
            {!randomizedVerbs && <Text>Arvotaan verbejä...</Text>}
            {answered.length < 5 &&
               randomizedVerbs &&
               randomizedVerbs.map((verbGroup, index) => (
                  <CardComponentMeanings
                     key={index}
                     alternatives={verbGroup}
                     evaluate={evaluate}
                  />
               ))}
            {finished && results && resultsSaved && resultHistory && (
               <>
                  <ResultView results={results} startAgain={startAgain} />
                  <LatestResults
                     resultHistory={resultHistory}
                     type={1}
                     count={10}
                  />
               </>
            )}
            {!resultHistory && <SpinnerComponent text="Tuloksia ladataan..." />}
         </Content>
         <FooterComponent />
      </Container>
   );
};

const mapStateToProps = (state) => ({
   verbsGerman: state.verbs.verbsGerman,
   verbsSwedish: state.verbs.verbsSwedish,
   language: state.settings.language,
   level: state.settings.level,
});

export default connect(mapStateToProps)(MeaningsScreen);

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#d2d2d2',
   },
   contentContainer: {
      padding: 10,
   },
});
