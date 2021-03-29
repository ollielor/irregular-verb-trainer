import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Container, Content, Text } from 'native-base';

import DatabaseResults from '../modules/DatabaseResults';

import { useNavigation } from '@react-navigation/native';

import {
   getRndVerbs,
   getCurrentDate,
   filterVerbsByLevel,
} from '../helpers/helpers';

import { updateResults } from '../store/actions/results';

import FooterComponent from '../components/footer/FooterComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import CardComponentMeanings from '../components/cards/CardComponentMeanings';
import ResultView from '../components/results/ResultView';
import LatestResults from '../components/results/LatestResults';
import SpinnerComponent from '../components/styling/SpinnerComponent';

import { connect } from 'react-redux';
import CardComponentMastery from '../components/cards/CardComponentMastery';
import { createResultsDb, getResults } from '../helpers/results';

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
   const [mastered, setMastered] = useState([]);
   const [notMastered, setNotMastered] = useState([]);

   const navigation = useNavigation();

   const scrollViewRef = useRef();

   console.log(props.results);

   useEffect(() => {
      if (finished) {
         scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
      }
   }, [finished]);

   useEffect(() => {
      return () => {};
   }, []);

   useEffect(() => {
      createResultsDb();
      setTableCreated(true);
   }, [])

   useEffect(() => {
      setVerbsFiltered(false);
      let verbsByLanguage;
      if (props.language === 1) {
         // Exclude verbs without infinitive forms
         verbsByLanguage = props.verbsSwedish.filter(
            (verb) => verb.infinitive.length > 1
         );
         console.log(verbsByLanguage);
      } else {
         verbsByLanguage = props.verbsGerman;
      }
      const filteredVerbs = filterVerbsByLevel(verbsByLanguage, props.level);
      setVerbs(filteredVerbs);
      setVerbsFiltered(true);
   }, [props.level, props.language]);

      const updateResultsAsync = async () => {
         props.dispatch(updateResults(await getResults()));
      }
    
      useEffect(() => {
         updateResultsAsync();
      }, [resultsSaved]);

   useEffect(() => {
      // Amount of verbs shown in Meanings Screen (5 times 3)
      if (started) {
         let amount = 15;
         if (verbsFiltered) {
            const verbObjectArray = getRndVerbs(verbs, amount);
            setRandomizedVerbs(verbObjectArray);
         }
      }
   }, [verbsFiltered]);

   // This function is responsible for evaluating the answers and setting the amount of points
   const evaluate = (accuracy, meaning, correctInfinitive, answeredInfinitive) => {
      if (accuracy) {
         setPoints(points + 20);
         setAnswered([...answered, { accuracy: 'correct' }]);
         setMastered([...mastered, { infinitive: correctInfinitive, meaning: meaning }])
      }
      if (!accuracy) {
         setAnswered([...answered, { accuracy: 'incorrect' }]);
         setNotMastered([...notMastered, { infinitive: correctInfinitive, meaning: meaning, wrongAnswer: answeredInfinitive }])
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
               setResultsSaved(true);
            },
            (error) => {
               console.log('Transaction error: ', error);
            },
            null,
            null
         );
      }
   }, [resultsReady, dateTime, tableCreated]);

   useEffect(() => {
      updateResultsAsync();
   }, [resultsSaved]);

   // This function clears all values when the exercise is started again
   const startAgain = () => {
      setStarted(true);
      setFinished(false);
      setPoints(0);
      setMaxPoints(0);
      setAnswered([]);
      setResults({});
      setResultsReady(false);
      setResultsSaved(false);
      setMastered([]);
      setNotMastered([]);
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
         // Points with bonus points or without them are divided by max points
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
         <ScrollView
            keyboardShouldPersistTaps="always"
            style={styles.flexOne}
            ref={scrollViewRef}
         >
            <Content>
               {!randomizedVerbs && <Text>Arvotaan verbejä...</Text>}
               {finished && resultsSaved && results ? (
                  <>
                     <ResultView resultsData={results} startAgain={startAgain} />
                     {mastered.length > 0 && 
                        <CardComponentMastery mastered={mastered} />
                     }
                     {notMastered.length > 0 &&
                        <CardComponentMastery notMastered={notMastered} />
                     }
                     <LatestResults
                        count={3}
                     />
                  </>
               ) : (
                  <Text>Ei ladattu</Text>
               )}
               {!props.results && (
                  <SpinnerComponent text="Tuloksia ladataan..." />
               )}
               {randomizedVerbs && !finished &&
                  randomizedVerbs.map((verbGroup, index) => (
                     <CardComponentMeanings
                        key={index}
                        alternatives={verbGroup}
                        evaluate={evaluate}
                     />
                  ))}
            </Content>
         </ScrollView>
         <FooterComponent />
      </Container>
   );
};

const mapStateToProps = (state) => ({
   verbsGerman: state.verbs.verbsGerman,
   verbsSwedish: state.verbs.verbsSwedish,
   language: state.settings.language,
   level: state.settings.level,
   results: state.results.results,
});

export default connect(mapStateToProps)(MeaningsScreen);

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#d2d2d2',
   },
   contentContainer: {
      padding: 10,
   },
   flexOne: {
      flex: 1,
   },
});
