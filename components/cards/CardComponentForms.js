import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Body, Card, CardItem, Spinner, Text } from 'native-base';
import CorrectAnswerComponent from '../styling/CorrectAnswerComponent';
import { connect } from 'react-redux';
import InputComponentForms from '../forms/InputComponentForms';

const CardComponentForms = (props) => {
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

   useEffect(() => {
      return () => {};
   }, []);

   useEffect(() => {
      // Create arrays of synonymous forms for each tense
      if (props.synonyms) {
         const infinitiveSynonyms = props.verbForm.map(
            (verbForm) => verbForm.infinitive
         );
         const presentSynonyms = props.verbForm.map(
            (verbForm) => verbForm.present
         );
         const pastSynonyms = props.verbForm.map((verbForm) => verbForm.past);
         const presPerfSynonyms = props.verbForm.map(
            (verbForm) => verbForm.presperf
         );
         setSynonymousForms({
            infinitive: infinitiveSynonyms,
            present: presentSynonyms,
            past: pastSynonyms,
            presPerf: presPerfSynonyms,
         });
      }
   }, []);

   useEffect(() => {
      // Focus on the first input of each card element
      if (props.answeredIndex === props.index) {
         inputRef1 && props.tenseNames[0] === 'infinitive'
            ? inputRef1.current.focus()
            : inputRef2 && props.tenseNames[0] === 'present'
            ? inputRef2.current.focus()
            : inputRef3 && props.tenseNames[0] === 'past'
            ? inputRef3.current.focus()
            : inputRef4 &&
              props.tenseNames[0] === 'presperf' &&
              inputRef4.current.focus();
      }
   }, [props.answeredIndex, props.index, props.tenseNames]);

   useEffect(() => {
      if (props.started) {
         inputRef1.current.clear();
         inputRef2.current.clear();
         inputRef3.current.clear();
         inputRef4.current.clear();
         setUnansweredInfinitive(true);
         setUnansweredPresent(true);
         setUnansweredPast(true);
         setUnansweredPresPerf(true);
         setCorrectInfinitive(false);
         setCorrectPresent(false);
         setCorrectPast(false);
         setCorrectPresPerf(false);
      }
   }, [props.started]);

   // The following useEffects are for checking the answer with evaluate function which is located FormsScreen
   // If the evaluate function returns true, the state of each form is set to true
   // Inputs are styled according to these states

   useEffect(() => {
      if (answerInfinitive.length > 0) {
         setUnansweredInfinitive(false);
      }
      if (
         props.evaluate(
            answerInfinitive,
            props.synonyms && synonymousForms
               ? synonymousForms.infinitive
               : props.verbForm.infinitive,
            'infinitive',
            props.index
         )
      ) {
         setCorrectInfinitive(true);
      }
   }, [props.synonyms, synonymousForms, answerInfinitive]);

   useEffect(() => {
      if (answerPresent.length > 0) {
         setUnansweredPresent(false);
      }
      if (
         props.evaluate(
            answerPresent,
            props.synonyms && synonymousForms
               ? synonymousForms.present
               : props.verbForm.present,
            'present',
            props.index
         )
      ) {
         setCorrectPresent(true);
      }
   }, [props.synonyms, synonymousForms, answerPresent]);

   useEffect(() => {
      if (answerPast.length > 0) {
         setUnansweredPast(false);
      }
      if (
         props.evaluate(
            answerPast,
            props.synonyms && synonymousForms
               ? synonymousForms.past
               : props.verbForm.past,
            'past',
            props.index
         )
      ) {
         setCorrectPast(true);
      }
   }, [props.synonyms, synonymousForms, answerPast]);

   useEffect(() => {
      if (answerPresPerf.length > 0) {
         setUnansweredPresPerf(false);
      }
      if (
         props.evaluate(
            answerPresPerf,
            props.synonyms && synonymousForms
               ? synonymousForms.presPerf
               : props.verbForm.presperf,
            'presperf',
            props.index
         )
      ) {
         setCorrectPresPerf(true);
      }
   }, [props.synonyms, synonymousForms, answerPresPerf]);

   const inputRef1 = useRef();
   const inputRef2 = useRef();
   const inputRef3 = useRef();
   const inputRef4 = useRef();

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
                     {props.infinitive && (
                        <>
                           {
                              <InputComponentForms
                                 label="Perusmuoto"
                                 ref={inputRef1}
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
                              ref={inputRef2}
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
                              ref={inputRef3}
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
                     )}
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
