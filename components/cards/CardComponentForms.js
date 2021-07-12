import React, { useEffect, useState, useRef, createRef } from 'react';
import { StyleSheet } from 'react-native';
import { Body, Card, CardItem, Spinner, Text } from 'native-base';
import CorrectAnswerComponent from '../styling/CorrectAnswerComponent';
import { connect } from 'react-redux';
import InputComponentForms from '../inputs/InputComponentForms';
import InputComponentFormsImproved from '../inputs/InputComponentFormsImproved';

import {
   getSynonymousForms
} from '../../helpers/formsHandling';

import {
   calcPoints
} from '../../helpers/points';

const CardComponentForms = (props) => {

   console.log('props from CardComponentForms: ', props)

   const [correctInfinitive, setCorrectInfinitive] = useState(false);
   const [correctPresent, setCorrectPresent] = useState(false);
   const [correctPast, setCorrectPast] = useState(false);
   const [correctPresPerf, setCorrectPresPerf] = useState(false);
   const [unansweredInfinitive, setUnansweredInfinitive] = useState(true);
   const [unansweredPresent, setUnansweredPresent] = useState(true);
   const [unansweredPast, setUnansweredPast] = useState(true);
   const [unansweredPresPerf, setUnansweredPresPerf] = useState(true);
   const [answerInfinitive, setAnswerInfinitive] = useState('');
   const [answerPresent, setAnswerPresent] = useState('');
   const [answerPast, setAnswerPast] = useState('');
   const [answerPresPerf, setAnswerPresPerf] = useState('');
   const [synonymousForms, setSynonymousForms] = useState({
      infinitive: [],
      present: [],
      past: [],
      presPerf: [],
   });
   const [correctAnsInfinitive, setCorrectAnsInfinitive] = useState('');
   const [correctAnsPresent, setCorrectAnsPresent] = useState('');
   const [correctAnsPast, setCorrectAnsPast] = useState('');
   const [correctAnsPresPerf, setCorrectAnsPresPerf] = useState('');

/*    const tenseNamesWithRefs = props.tenseNames.map((tense, index) => ({
      id: index,
      tense: tense,
      ref: ''
   })) */



   // useEffect cleanup
   useEffect(() => {
      return () => {};
   }, []);

   useEffect(() => {
      if (inputRef1.current) {
         inputRef1.current.focus();
      } else if (inputRef2.current) {
         inputRef2.current.focus();
      } else if (inputRef3.current) {
         inputRef3.current.focus()
      } else {
         inputRef4.current.focus();
      }
   }, [])

/*    for (let i=0; i <= 4; i++) {
      for (let y=1; y <= 4; y++) {
         refArray.push({
            ref: 'inputRef' + String(i) + String(y),
            tense: y === 1 ? 'infinitive' : y === 2 ? 'present' : y === 3 ? 'past' : 'presperf'
         })
      }
   } */
/*    for (let i=0; i <= 4; i++) {
      refsArray = [];
      for (let i=1; i <= 4; i++) {
         refsArray.push({
            ref: useRef(React.createRef()),
            //ref: 'inputRef' + props.componentIndex + i,
            tense: i === 1 ? 'infinitive' : i === 2 ? 'present' : i === 3 ? 'past' : 'presperf',
         })
      }
      wrapperArray.push(refsArray);
   }

   console.log('wrapperArray: ', wrapperArray) */


/*    for (let i=0; i <= 4; i++) {
      refsArray = [];
      singleRefArray = [];
      for (let y=1; y <= 4; y++) {
          singleRefArray.push({
            ref: 'inputRef' + String(i) + String(y),
            tense: y === 1 ? 'infinitive' : y === 2 ? 'present' : y === 3 ? 'past' : 'presperf',
            index: parseInt(String(i) + String(y))
         })
         refsArray.push(singleRefArray);
      }
      wrapperArray.push(refsArray);
   } */


   //console.log('refArray: ', refArray)

   //const refs = useRef(refsArray.map(() => React.createRef()));
   //const refs = useRef(refArray.map((inputRef) => inputRef));
   //const refs = useRef(refArray.map(() => React.createRef()));
   //const refs = useRef(refArray.map((name) => name));

   //console.log('RefsArray: ', refsArray)

   useEffect(() => {
      // Create arrays of synonymous forms for each tense
      setSynonymousForms(getSynonymousForms(props.synonyms, props.verbForm));
   }, []);

   useEffect(() => {
      // Focus on the first input of each card element
      if (props.answeredIndex === props.index) {
         inputRef1.current && props.tenseNames[0] === 'infinitive'
            ? inputRef1.current.focus()
            : inputRef2.current && props.tenseNames[0] === 'present'
            ? inputRef2.current.focus()
            : inputRef3.current && props.tenseNames[0] === 'past'
            ? inputRef3.current.focus()
            : inputRef4.current &&
              props.tenseNames[0] === 'presperf' &&
              inputRef4.current.focus();
      }
   }, [props.answeredIndex, props.index, props.tenseNames]);

  
   const focusOnNextInput = (next) => {
      /* console.log('tenseNamesWithRefs[1]: ', tenseNamesWithRefs[1]);
      console.log('tenseNamesWithRefs from focusOnNextInput: ', tenseNamesWithRefs)
      console.log('Refs from focusOnNextInput: ', refs)
      refs[1].focus(); */
      switch (next) {
         case 2:
            if (inputRef2.current) {
               inputRef2.current.focus();
            } else if (inputRef3.current) {
               inputRef3.current.focus()
            } else if (inputRef4.current) {
               inputRef4.current.focus()
            }
            break;
         case 3:
            if (inputRef3.current) {
               inputRef3.current.focus();
            } else if (inputRef4.current) {
               inputRef4.current.focus()
            }
            break;
         case 4:
            inputRef4.current.focus();
            break;
      }
   }

            // Focus on the first input of each card element
/*             if (prevIndex === 1 && inputRef2.current) {
               inputRef2.current.focus();
            } else if (prevIndex && props.tenseNames[2] === 'past' && inputRef3.current) {
               inputRef3.current.focus();
            }
            if (prevIndex === 2 && inputRef3.current) {
               inputRef3.current.focus();
            }
            if (prevIndex === 3 && inputRef4.current) {
               inputRef4.current.focus();
            }
            if (prevIndex === 4 && inputRef1.current) {
               inputRef1.current.focus();
            } */
/*                if (prevIndex === 1 && inputRef2.current) {
                  inputRef2.current.focus();
               }
               if (prevIndex === 2 && inputRef3.current) {
                  inputRef3.current.focus();
               }
               if (props.tenseNames[prevIndex] && inputRef1.current) {
                  inputRef1.current.focus();
               } */
      //refs.current[refFromInput + 1].current.focus(); 
      //refs.current[id].current.focus();
      //console.log('prevRef: ', prevRef)
/*       if (prevIndex === 1 && inputRef2) {
         inputRef2.current.focus();
      } else if (prevIndex === 1 && inputRef3) {
         inputRef3.current.focus();
      } else if (prevIndex === 1 && inputRef4) {
         inputRef4.current.focus()
      }
      if (prevIndex === 2 && inputRef2) {
         inputRef2.current.focus();
      } else if (prevIndex === 1 && inputRef3) {
         inputRef3.current.focus();
      } else if (prevIndex === 1 && inputRef4) {
         inputRef4.current.focus()
      } */
   //}

/*       switch (nextInput, index) {
         case 'input1':
            ['inputRef' + String(index) + '1'] && ['inputRef' + String(index) + '1'].current.focus();
            break;
         case 'input2':
            ['inputRef' + String(index) + '2'] && ['inputRef' + String(index) + '2'].current.focus();
           break;
         case 'input3':
            ['inputRef' + String(index) + '3'] && ['inputRef' + String(index) + '3'].current.focus();
            break;
         case 'input4':
            ['inputRef' + String(index) + '4'] && ['inputRef' + String(index) + '4'].current.focus();
            break;
       } */   

/*       switch (originalInput) {
         case 'input1':
            inputRef2 && inputRef2.current.focus();
            break;
         case 'input2':
            inputRef3 && inputRef3.current.focus();
           break;
         case 'input3':
            inputRef4 && inputRef4.current.focus();
            break;
         case 'input4':
            inputRef1.current.focus();
            break;
       }       
   }*/

   // This useEffect is responsible for clearing the inputs and resetting unanswered and correct states
  /*  useEffect(() => {
      if (props.started) {
         props.infinitive && inputRef1.current.clear();
         props.present && inputRef2.current.clear();
         props.past && inputRef3.current.clear();
         props.presperf && inputRef4.current.clear();
         setUnansweredInfinitive(true);
         setUnansweredPresent(true);
         setUnansweredPast(true);
         setUnansweredPresPerf(true);
         setCorrectInfinitive(false);
         setCorrectPresent(false);
         setCorrectPast(false);
         setCorrectPresPerf(false);
      }
   }, [props.started]); */

   // The following useEffects are for checking the answer with evaluate function which is located FormsScreen
   // If the evaluate function returns true, the state of each form is set to true
   // Inputs are styled according to these states

   const getParameters = (tense) => {
      switch (tense) {
         case 'infinitive': 
            return {
               answerState: answerInfinitive,
               synonyms: props.synonyms && synonymousForms
                     ? synonymousForms.infinitive
                     : props.verbForm.infinitive,
               // This is null because the infinitive can't have alternative forms
               alternativeForm: null,
               tense: 'infinitive',
               index: props.index
            }
         case 'present': 
            return {
               answerState: answerPresent,
               synonyms: props.synonyms && synonymousForms
                     ? synonymousForms.present
                     : props.verbForm.present,
               alternativeForm: props.verbForm.present_alt,
               tense: 'present',
               index: props.index
            }
         case 'past': 
            return {
               answerState: answerPast,
               synonyms: props.synonyms && synonymousForms
                     ? synonymousForms.past
                     : props.verbForm.past,
               alternativeForm: props.verbForm.past_alt,
               tense: 'past',
               index: props.index
            }
         case 'presperf': 
            return {
               answerState: answerPresPerf,
               synonyms: props.synonyms && synonymousForms
                     ? synonymousForms.presperf
                     : props.verbForm.presperf,
               alternativeForm: props.verbForm.presperf_alt,
               tense: 'presperf',
               index: props.index
            }
      }
   }
   

   const checkAnswer = (tense) => {
      if (tense === 'infinitive' && answerInfinitive.length > 0) {
         setUnansweredInfinitive(false);
      }
      if (tense === 'present' && answerPresent.length > 0) {
         setUnansweredInfinitive(false);
      }
      if (tense === 'past' && answerPast.length > 0) {
         setUnansweredInfinitive(false);
      }
      if (tense === 'presperf' && answerPresPerf.length > 0) {
         setUnansweredInfinitive(false);
      }
      if (
         props.evaluate(
            getParameters(tense).answerState,
            getParameters(tense).synonyms,
            getParameters(tense).alternativeForm,
            getParameters(tense).tense,
            getParameters(tense).index
         ) 
/*             props.evaluate(
               answerInfinitive,
               props.synonyms && synonymousForms
                  ? synonymousForms.infinitive
                  : props.verbForm.infinitive,
               // This is null because the infinitive can't have alternative forms
               null,
               'infinitive',
               props.index
            )  */
         ) {
            correctAnswerStates(tense);
            props.setPoints(calcPoints(props.points, 10));
         } else {
            checkIncorrect(tense);
         }

   }

   const correctAnswerStates = (tense) => {
      switch (tense) {
         case 'infinitive':
            setCorrectInfinitive(true);
            setCorrectAnsInfinitive(answerInfinitive);
            break;
         case 'present':
            setCorrectPresent(true);
            setCorrectAnsPresent(answerPresent);
            break;
         case 'past':
            setCorrectPast(true);
            setCorrectAnsPast(answerPresent);
            break;
         case 'presperf':
            setCorrectPresPerf(true);
            setCorrectAnsPresPerf(answerPresent);
            break;
      }
   }

   const checkIncorrect = (tense) => {
      switch (tense) {
         case 'infinitive':
            if (correctInfinitive && answerInfinitive !== correctAnsInfinitive) {
               setCorrectInfinitive(false);
               props.setPoints(calcPoints(props.points, -10));
            }    
            break;
         case 'present':
            if (correctPresent && answerPresent !== correctAnsPresent) {
               setCorrectPresent(false);
               props.setPoints(calcPoints(props.points, -10));
            } 
            break;
         case 'present':
            if (correctPast && answerPast !== correctAnsPast) {
               setCorrectPast(false);
               props.setPoints(calcPoints(props.points, -10));
            }      
            break; 
         case 'presperf':
            if (correctPresPerf && answerPresPerf !== correctAnsPresPerf) {
               setCorrectPresPerf(false);
               props.setPoints(calcPoints(props.points, -10));
            } 
            break;     
      }

   }

   useEffect(() => {
      checkAnswer('infinitive');
   }, [props.synonyms, synonymousForms, answerInfinitive]);


   useEffect(() => {
      checkAnswer('present')
   }, [props.synonyms, synonymousForms, answerPresent]);

   useEffect(() => {
      checkAnswer('past')
   }, [props.synonyms, synonymousForms, answerPast]);

   useEffect(() => {
      checkAnswer('presperf')
   }, [props.synonyms, synonymousForms, answerPresPerf]);



/*    const inputRef1 = useRef();
   const inputRef2 = useRef();
   const inputRef3 = useRef();
   const inputRef4 = useRef(); */

/* 

   for (let i=0; i < inputRefs.length; i++) {
      console.log('inputRefs: ', inputRefs[i])
      inputRefs[i] = useRef();
   }
 */

   const inputRef1 = useRef();
   const inputRef2 = useRef();
   const inputRef3 = useRef();
   const inputRef4 = useRef();

   console.log('inputRef2: ', inputRef2)

   return (
      <>
         {props.verbForm ? (
            <Card>
               <CardItem style={{ backgroundColor: '#e8e8e8' }}>
                  <Body>
                     <Text
                        style={{
                           color: '#7E00C5',
                           fontWeight: 'bold',
                           fontSize: 16,
                           marginTop: 22,
                        }}
                     >
                        {props.synonyms
                           ? props.verbForm[0].meaning
                           : props.verbForm.meaning}
                     </Text>
{/*                      {wrapperArray.map((wrapperArrayItem, index) => 
                        console.log('wrapperArrayItem: ', wrapperArrayItem))} */}
                     {/* {props.tenseNames.map((tense, index) => */}
                     {/* {tenseNamesWithRefs.map((tenseObject) => {console.log('tenseObject: ', tenseObject)})}
                     {tenseNamesWithRefs.map((tenseObject, index) => */}
                        <InputComponentFormsImproved 
                           tense='infinitive'
                           setAnswerInfinitive={setAnswerInfinitive}
                           correct={correctInfinitive ? true : false}
                           unanswered={unansweredInfinitive ? true : false}
                           forwardedRef={inputRef1}
                           focusOnNextInput={focusOnNextInput}
                        />
                        <InputComponentFormsImproved 
                           tense='present'
                           setAnswerPresent={setAnswerPresent} 
                           correct={correctPresent ? true : false}
                           unanswered={unansweredPresent ? true : false}
                           forwardedRef={inputRef2}
                           focusOnNextInput={focusOnNextInput}
                        />
                        <InputComponentFormsImproved 
                           tense='past'
                           setAnswerPast={setAnswerPast} 
                           correct={correctPast ? true : false}
                           unanswered={unansweredPast ? true : false}
                           forwardedRef={inputRef3}
                           focusOnNextInput={focusOnNextInput}
                        />
                        <InputComponentFormsImproved 
                           tense='presperf'
                           setAnswerPresPerf={setAnswerPresPerf} 
                           correct={correctPresPerf ? true : false}
                           unanswered={unansweredPresPerf ? true : false}
                           forwardedRef={inputRef4}
                           focusOnNextInput={focusOnNextInput}
                        />
                     {/* {props.infinitive && (
                        <>
                           {
                              <InputComponentForms
                                 label="Perusmuoto"
                                 //ref={inputRef1}
                                 correct={correctInfinitive ? true : false}
                                 unanswered={
                                    unansweredInfinitive ? true : false
                                 }
                                 onBlur={() =>
                                    correctInfinitive && props.present
                                       ? inputRef2.current.focus()
                                       : correctInfinitive && props.past
                                       ? inputRef3.current.focus()
                                       : correctInfinitive &&
                                         props.presperf &&
                                         inputRef4.current.focus()
                                 }
                                 placeholder="Perusmuoto"
                                 onChangeText={(answer) =>
                                    setAnswerInfinitive(answer)
                                 }
                                 editable={
                                    correctInfinitive || props.finished
                                       ? false
                                       : true
                                 }
                                 finished={props.finished ? true : false}
                              />
                           }

                           {props.finished &&
                           props.synonyms &&
                           !correctInfinitive ? (
                              <CorrectAnswerComponent
                                 form={synonymousForms.infinitive}
                                 synonyms={true}
                              />
                           ) : (
                              props.finished &&
                              !props.synonyms &&
                              !correctInfinitive && (
                                 <CorrectAnswerComponent
                                    form={props.verbForm.infinitive}
                                    synonyms={false}
                                 />
                              )
                           )}
                        </>
                     )}
                     {props.present && (
                        <>
                           <InputComponentForms
                              label="Preesens"
                              //ref={inputRef2}
                              correct={correctPresent || false}
                              unanswered={unansweredPresent ? true : false}
                              placeholder={props.language === 1 ? "Preesens" : "Preesens (er/sie/es)"}
                              onBlur={() =>
                                 correctPresent && props.past
                                    ? inputRef3.current.focus()
                                    : correctPresent &&
                                      props.presperf &&
                                      inputRef4.current.focus()
                              }
                              onChangeText={(answer) =>
                                 setAnswerPresent(answer)
                              }
                              editable={
                                 correctPresent || props.finished ? false : true
                              }
                              finished={props.finished ? true : false}
                           />

                           {props.finished &&
                           props.synonyms &&
                           !correctPresent ? (
                              <CorrectAnswerComponent
                                 form={synonymousForms.present}
                                 synonyms={true}
                              />
                           ) : (
                              props.finished &&
                              !props.synonyms &&
                              !correctPresent && (
                                 <CorrectAnswerComponent
                                    form={props.verbForm.present}
                                    synonyms={false}
                                 />
                              )
                           )}
                        </>
                     )}
                     {props.past && (
                        <>
                           <InputComponentForms
                              label="Imperfekti"
                              placeholder={props.language === 1 ? "Imperfekti" : "Imperfekti (er/sie/es)"}
                              correct={correctPast || false}
                              unanswered={unansweredPast ? true : false}
                              //ref={inputRef3}
                              onBlur={() =>
                                 correctPast &&
                                 props.presperf &&
                                 inputRef4.current.focus()
                              }
                              onChangeText={(answer) => setAnswerPast(answer)}
                              editable={
                                 correctPast || props.finished ? false : true
                              }
                              finished={props.finished ? true : false}
                           />
                           {props.finished && props.synonyms && !correctPast ? (
                              <CorrectAnswerComponent
                                 form={synonymousForms.past}
                                 synonyms={true}
                              />
                           ) : (
                              props.finished &&
                              !props.synonyms &&
                              !correctPast && (
                                 <CorrectAnswerComponent
                                    form={props.verbForm.past}
                                    synonyms={false}
                                 />
                              )
                           )}
                        </>
                     )}
                     {props.presperf && (
                        <>
                           <InputComponentForms
                              label={props.language === 1 ? "Supiini (4. muoto)" : "Perfekti"}
                              placeholder={props.language === 1 ? "Supiini (4. muoto)" : "Perfekti (er/sie/es)"}
                              correct={correctPresPerf || false}
                              unanswered={unansweredPresPerf ? true : false}
                              ref={inputRef4}
                              onChangeText={(answer) =>
                                 setAnswerPresPerf(answer)
                              }
                              editable={
                                 correctPresPerf || props.finished
                                    ? false
                                    : true
                              }
                              finished={props.finished ? true : false}
                           />
                           {props.finished &&
                           props.synonyms &&
                           !correctPresPerf ? (
                              <CorrectAnswerComponent
                                 form={synonymousForms.presPerf}
                                 synonyms={true}
                              />
                           ) : (
                              props.finished &&
                              !props.synonyms &&
                              !correctPresPerf && (
                                 <CorrectAnswerComponent
                                    form={props.verbForm.presperf}
                                    synonyms={false}
                                 />
                              )
                           )}
                        </>
                     )} */}
                  </Body>
               </CardItem>
            </Card>
         ) : (
            <Spinner />
         )}
      </>
   );
};

const mapStateToProps = (state) => ({
   infinitive: state.settings.tenses.infinitive,
   present: state.settings.tenses.present,
   past: state.settings.tenses.past,
   presperf: state.settings.tenses.presperf,
   language: state.settings.language
});

export default connect(mapStateToProps)(CardComponentForms);



const styles = StyleSheet.create({
   formInput: {
      fontSize: 16,
      marginTop: 45,
      padding: 10,
      width: '100%',
   },
   formInputIOS: {
      fontSize: 16,
      marginTop: 45,
      padding: 10,
      borderColor: '#7E00C5',
      borderWidth: 1,
      width: '100%',
   },
   formInputCorrectIOS: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 45,
      padding: 10,
      backgroundColor: '#66dd33',
      borderColor: '#7E00C5',
      color: 'black',
      color: '#7E00C5',
      width: '100%',
   },
   formInputIncorrectIOS: {
      fontSize: 16,
      marginTop: 45,
      padding: 10,
      backgroundColor: '#ff0033',
      borderColor: '#7E00C5',
      color: 'white',
      width: '100%',
   },
});
