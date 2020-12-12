import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Container, Spinner, Text } from 'native-base'

import DatabaseVerbs from '../../modules/DatabaseVerbs'
import DatabaseResults from '../../modules/DatabaseResults'
import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-asset'

import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native'

import {
   rndIntGenerator,
   getRandomVerbArray,
   getCurrentDate,
   filterVerbsByLevel,
   checkTenses
} from '../../helpers/helpers'

import FooterComponent from '../../components/FooterComponent'
import HeaderComponent from '../../components/HeaderComponent'
import GermanResultView from '../../components/GermanResultView'
import CardComponentForms from '../../components/CardComponentForms'
import ButtonComponent from '../../components/ButtonComponent'

const GermanFormsScreen = (props) => {
   const [verbs, setVerbs] = useState([])
   const [verbsFiltered, setVerbsFiltered] = useState(false)
   const [randomizedVerbs, setRandomizedVerbs] = useState([])
   const [rndVerbsLoaded, setRndVerbsLoaded] = useState(false)
   const [points, setPoints] = useState(0)
   const [maxPoints, setMaxPoints] = useState(0)
   const [maxQuestions, setMaxQuestions] = useState(0);
   const [finished, setFinished] = useState(false)
   const [results, setResults] = useState({})
   const [counterState, setCounterState] = useState(null)
   const [started, setStarted] = useState(true)
   const [tenses, setTenses] = useState([]);
   const [tenseNames, setTenseNames] = useState([]);
   const [resultHistory, setResultHistory] = useState([])
   const [resultsLoaded, setResultsLoaded] = useState(false)
   const [resultsAdded, setResultsAdded] = useState(false)
   const [dateTime, setDateTime] = useState(null)
   const [correctForm, setCorrectForm] = useState({})
   const [incorrectForm, setIncorrectForm] = useState({})
   const [answeredIndex, setAnsweredIndex] = useState(0)
   const [resultsReady, setResultsReady] = useState(false)

   const navigation = useNavigation();

   const { navigation: {navigate} } = props;

   FileSystem.getInfoAsync(
      `${FileSystem.documentDirectory}SQLite/verbs_german.db`
   ).then((result) => {
      if (result.exists) {
         DatabaseVerbs
      } else {
         FileSystem.downloadAsync(
            Asset.fromModule(require('../../assets/verbs_german.db')).uri,
            `${FileSystem.documentDirectory}SQLite/verbs_german.db`
         )
      }
   })

   /*useEffect(() => {
      let query

      switch (level) {
         case 1:
            query =
               'select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id where level=1;'
            break
         case 2:
            query =
               'select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id where level=2;'
            break
         case 3:
            query =
               'select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id where level=3;'
            break
         case 4:
            query =
               'select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id;'
            break
      }
      DatabaseVerbs.transaction(
         (tx) => {
            tx.executeSql(
               query,
               [],
               (tx, results) => {
                  setVerbs(results.rows._array)
                  setVerbsLoaded(true)
               },
               (tx, error) => {
                  console.log('Could not execute query: ', error)
               }
            )
         },
         (error) => {
            console.log('Transaction error: ', error)
         }
      )
   }, [started])*/

   useEffect(() => {
      let tensesArray = [];
      if (props.infinitive) {
         setMaxPoints(maxPoints + 10);
         setMaxQuestions(maxQuestions + 4);
         tensesArray = [...tensesArray, 1];
         console.log('infinitive')
      }
      if (props.present) {
         setMaxPoints(maxPoints + 10);
         setMaxQuestions(maxQuestions + 4);
         tensesArray = [...tensesArray, 2];
         console.log('present')
      }
      if (props.past) {
         setMaxPoints(maxPoints + 10);
         setMaxQuestions(maxQuestions + 4);
         tensesArray = [...tensesArray, 3];
         console.log('past')
      }
      if (props.presperf) {
         setMaxPoints(maxPoints + 10);
         setMaxQuestions(maxQuestions + 4);
         tensesArray = [...tensesArray, 4];
         console.log('presperf')
      }
      setTenseNames(tensesArray.sort((a,b) => a > b, 1).map(tense => {return tense === 1 ? 'infinitive' : tense === 2 ? 'present' : tense === 3 ? 'past' : tense === 4 && 'presperf'}));
   }, [props.infinitive, props.present, props.past, props.presperf])

   useEffect(() => {
      setVerbsFiltered(false);
      const filteredVerbs = filterVerbsByLevel(props.verbsGerman, props.level);
      setVerbs(filteredVerbs);
      setVerbsFiltered(true);
    }, [props.level, props.verbsGerman])

   useEffect(() => {
      DatabaseResults.transaction(
         (tx) => {
            tx.executeSql(
               'create table if not exists results (id integer primary key not null, type integer, level integer, accuracy integer, q_total integer, points real, maxpoints integer, ratio real, datetime real);'
            )
         },
         null,
         updateList
      )
   }, [])

   const updateList = () => {
      DatabaseResults.transaction(
         (tx) => {
            tx.executeSql(
               'select * from results;',
               [],
               (tx, results) => {
                  setResultHistory(results.rows._array)
                  setResultsLoaded(true)
               },
               (tx, error) => {
                  console.log('Could not execute query: ', error)
               }
            )
         },
         (error) => {
            console.log('Transaction error: ', error)
         }
      )
   }

   useEffect(() => {
      if (points === 200) {
         setFinished(true)
      }
   }, [points])

   useEffect(() => {
      if (verbsFiltered && started) {
         let rndVerbArray = []
         let rndVerbs = []
         let rndVerbsFinal = []
         while (rndVerbsFinal.length <= 4) {
            const rndInt = rndIntGenerator(verbs.length)
            rndVerbArray = getRandomVerbArray(rndInt, verbs)
            if (rndVerbArray.length > 0) {
               rndVerbs.push(rndVerbArray)
            }
            if (rndVerbs.length > 1) {
               // Check for duplicates
               rndVerbsFinal = rndVerbs.filter(
                  (verbArray, index, self) =>
                     index ===
                     self.findIndex(
                        (v) => v[0].verb_id === verbArray[0].verb_id
                     )
               )
            }
         }
         setRandomizedVerbs(rndVerbsFinal)
         //setRndVerbsLoaded(true)
      }
   }, [verbsFiltered, verbs, started])

   const startAgain = () => {
      setStarted(true)
      setFinished(false)
      setPoints(0)
      setResults({})
      setResultsReady(false)
   }

   useEffect(() => {
      if (started) {
         let counter = 0
         let intervalId = setInterval(() => {
            if (finished) {
               clearInterval(intervalId)
               setStarted(false)
            } else {
               setCounterState(counter++)
            }
         }, 1000)
         return () => {
            clearInterval(intervalId)
         }
      }
   }, [started, finished])

   useEffect(() => {
      if (finished) {
         const estimatedAccomplishTime = 15 * maxPoints;
         let totalPoints
         if (counterState <= estimatedAccomplishTime && points === maxPoints) {
            totalPoints = points + counterState * 0.1 * 1.0
         } else if (points === 0) {
            totalPoints = points * 1.0
         } else {
            totalPoints = (points - counterState * 0.1) * 1.0
         }
         const totalPercentage = (totalPoints / maxPoints) * 100.0
         const amountCorrectAnswers = points / 10
         setResults({
            totalPoints: totalPoints,
            maxPoints: maxPoints,
            totalAnswered: maxQuestions,
            totalPercentage: totalPercentage,
            amountCorrectAnswers: amountCorrectAnswers,
         })
         setDateTime(getCurrentDate())
         setResultsReady(true)
      }
   }, [finished])

   useEffect(() => {
      if (resultsAdded) {
         saveResults()
      }
   }, [resultsAdded])

   const prepareAnswer = (answer) => {
      // The function prepares the given answers for accuracy check using different string operations
      let preparedAnswer = ''
      // Replace German sharp S with the string '1'
      let stringArray = answer
         .trim()
         .replace('/', '')
         .replace(/\u00df/g, '1')
         .toUpperCase()
         .toLowerCase()
         .split(' ')
      // Filter out pronouns if they precede verb form
      let withoutPronounsArray = stringArray.filter(
         (word) =>
            word !== 'er' &&
            word !== 'sie' &&
            word !== 'es' &&
            word !== 'er/sie' &&
            word !== 'er/sie/es'
      )
      // Replace string '1' with German sharp S
      for (let i = 0; i < withoutPronounsArray.length; i++) {
         preparedAnswer += ' ' + withoutPronounsArray[i].replace('1', '\u00df')
      }
      return preparedAnswer.trim()
   }

   const checkAnswerStrings = (preparedAnswer, correct) => {
      // The function checks if the prepared answer matches with the correct answer and returns true if they match
      // Check if the correct answer is an array (i.e. if it has synonymous forms)
      if (Array.isArray(correct)) {
         for (let i = 0; i < correct.length; i++) {
            if (preparedAnswer === correct[i].replace('/', '')) {
               return true
            }
         }
      } else if (!Array.isArray(correct) && preparedAnswer === correct) {
         return true
      }
   }

   const evaluate = (answer, correct, tense, index) => {
      console.log('Index: ', index);
      // This function is responsible for setting the points state and setting the state for focusing in CardComponentForms.js
      const preparedAnswer = prepareAnswer(answer, tense)
      let correctModified
      if (!Array.isArray(correct)) {
         correctModified = correct.replace('/', '')
      } else {
         correctModified = correct
      }
      // CheckAnswerStrings function is called and points are given if it returns true
      if (checkAnswerStrings(preparedAnswer, correctModified)) {
         setPoints(points + 10)
         // Focus to next component if the user has given a correct answer to the last field of the component
         console.log('tenseNames: ', tenseNames)
         const lastForm = tenseNames[tenseNames.length - 1];
         console.log('lastForm: ', lastForm);
         if (lastForm === tense && index <= 4) {
            setAnsweredIndex(index + 1)
         }
         return true
      } else {
         setTimeout(() => {
            return false
         }, 2000)
      }
   }

   useEffect(() => {
      if (finished && results) {
         scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
      }
   }, [finished, results])

   const finish = () => {
      setStarted(false)
      setFinished(true)
   }

   const scrollViewRef = useRef()

   return (
      <Container style={styles.container}>
         <HeaderComponent title="Verbien muotoja" goBack={navigation.goBack} />
         <KeyboardAvoidingView
            style={styles.flexOne}
            behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
         >
            <ScrollView
               keyboardShouldPersistTaps="always"
               style={styles.flexOne}
               ref={scrollViewRef}
            >
               {finished && resultsReady && results && (
                  <GermanResultView results={results} startAgain={startAgain} />
               )}
               {finished && !resultsReady && !results && (
                  <>
                     <Spinner />
                     <Text>Ladataan tuloksia...</Text>
                  </>
               )}
               {console.log('randomizedVerbs: ', randomizedVerbs)}
               {!props.infinitive && !props.present && !props.past && !props.presperf ? 
               <>
                  <Text
                  style={{
                     color: '#7E00C5',
                     fontWeight: 'bold',
                     fontSize: 16,
                     marginTop: 22,
                     marginBottom: 22,
                     textAlign: 'center'
                  }}
               >
                     Valitse vähintään yksi harjoiteltava verbimuoto!
                  </Text>
                  <ButtonComponent color='#7E00C5' title='Muuta asetuksia' function={() => navigation.navigate('Koti')} />
                  </>
               :               
               randomizedVerbs.length > 0 ?
                  randomizedVerbs.map((verbFormArray, index) =>
                     verbFormArray.length === 1 ? (
                        verbFormArray.map((v, i) => (
                           <CardComponentForms
                              key={v.verb_id}
                              verbForm={v}
                              synonyms={false}
                              evaluate={evaluate}
                              correctForm={correctForm}
                              incorrectForm={incorrectForm}
                              finished={finished}
                              index={index}
                              tenseNames={tenseNames}
                              answeredIndex={answeredIndex}
                           />
                        ))
                     ) : (
                        <CardComponentForms
                           key={verbFormArray[0].verb_id}
                           verbForm={verbFormArray}
                           synonyms={true}
                           evaluate={evaluate}
                           correctForm={correctForm}
                           incorrectForm={incorrectForm}
                           finished={finished}
                           index={index}
                           tenseNames={tenseNames}
                           answeredIndex={answeredIndex}
                        />
                     )
                  )
               :
               null}
               {props.infinitive || props.present || props.past || props.presPerf &&
               <ButtonComponent
                  color="#7E00C5"
                  title="Valmis"
                  function={finish}
               />
               }
            </ScrollView>
         </KeyboardAvoidingView>
         <FooterComponent />
      </Container>
   )
}

const mapStateToProps = state => ({
   verbsGerman: state.verbs.verbsGerman,
   level: state.settings.level,
   infinitive: state.settings.infinitive,
   present: state.settings.present,
   past: state.settings.past,
   presperf: state.settings.presperf
})

export default connect(
   mapStateToProps,
)(GermanFormsScreen);

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#d2d2d2',
   },
   contentContainer: {
      padding: 10,
   },
   formStyle: {
      paddingRight: 20,
   },
   flexOne: {
      flex: 1,
   },
})
