import React, {
   useEffect,
   useState,
   useRef,
   createRef,
   forwardRef,
} from 'react';
import { Stack, Spinner, Text } from 'native-base';
import { connect } from 'react-redux';
import InputComponentForms from '../inputs/InputComponentForms';

import { getSynonymousForms } from '../../helpers/formsHandling';

import { evaluate } from '../../helpers/answerHandling';

import { calcPoints } from '../../helpers/points';

import { styles } from '../../styles/styles';

const CardComponentForms = forwardRef((props, ref) => {

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

   const refs = useRef([]);
   refs.current = props.tenseNames.map(
      (el, index) => refs.current[index] ?? createRef()
   );

   // useEffect cleanup
   useEffect(() => {
      return () => { };
   }, []);

   useEffect(() => {
      if (props.currentComponentIndex === props.componentIndex) {
         refs.current[0].focus();
      }
   }, [props.currentComponentIndex]);

   const focusOnNextInput = (index) => {
      if (index < refs.current.length - 1) {
         refs.current[index + 1].focus();
      } else if (index === refs.current.length - 1) {
         props.setCurrentComponentIndex(props.currentComponentIndex + 1);
      }
   };

   const labels = {
      // Labels for Swedish
      1: {
         infinitive: 'Perusmuoto',
         present: 'Preesens',
         past: 'Imperfekti',
         presperf: 'Supiini (verbin 4. muoto)',
      },
      // Placeholder for German
      2: {
         infinitive: 'Perusmuoto',
         present: 'Preesens (er/es/sie)',
         past: 'Imperfekti (er/es/sie)',
         presperf: 'Perfekti (er/es/sie)',
      },
   };

   useEffect(() => {
      // Create arrays of synonymous forms for each tense
      setSynonymousForms(getSynonymousForms(props.synonyms, props.verbForm));
   }, [props.synonyms, props.verbForm]);

   const parameters = {
      infinitive: {
         synonyms:
            props.synonyms && synonymousForms
               ? synonymousForms.infinitive
               : props.verbForm.infinitive,
         // This is null because there are no alternative forms for the infinitive in this app
         alternativeForm: null,
      },
      present: {
         synonyms:
            props.synonyms && synonymousForms
               ? synonymousForms.present
               : props.verbForm.present,
         alternativeForm: props.verbForm.present_alt,
      },
      past: {
         synonyms:
            props.synonyms && synonymousForms
               ? synonymousForms.past
               : props.verbForm.past,
         alternativeForm: props.verbForm.past_alt,
      },
      presperf: {
         synonyms:
            props.synonyms && synonymousForms
               ? synonymousForms.presPerf
               : props.verbForm.presperf,
         alternativeForm: props.verbForm.presperf_alt,
      },
   };

   const checkAnswer = (answer, tense) => {
      if (tense === 'infinitive' && answer.length > 0) {
         setUnansweredInfinitive(false);
      }
      if (tense === 'present' && answer.length > 0) {
         setUnansweredPresent(false);
      }
      if (tense === 'past' && answer.length > 0) {
         setUnansweredPast(false);
      }
      if (tense === 'presperf' && answer.length > 0) {
         setUnansweredPresPerf(false);
      }
      if (
         evaluate(
            answer,
            parameters[tense].synonyms,
            parameters[tense].alternativeForm,
            props.language
         )
      ) {
         answerStates(answer, tense);
         correctAnswerStates(tense);
         props.setPoints(calcPoints(props.points, 10));
      } else {
         checkIncorrect(answer, tense);
      }
   };

   const answerStates = (answer, tense) => {
      switch (tense) {
         case 'infinitive':
            setAnswerInfinitive(answer);
            break;
         case 'present':
            setAnswerPresent(answer);
            break;
         case 'past':
            setAnswerPast(answer);
            break;
         case 'presperf':
            setAnswerPresPerf(answer);
            break;
      }
   };

   const correctAnswerStates = (tense) => {
      switch (tense) {
         case 'infinitive':
            setCorrectInfinitive(true);
            break;
         case 'present':
            setCorrectPresent(true);
            break;
         case 'past':
            setCorrectPast(true);
            break;
         case 'presperf':
            setCorrectPresPerf(true);
            break;
      }
   };

   // This function checks if the actual answer is longer than the already accepted answer
   // In that case the points are taken away
   const checkIncorrect = (answer, tense) => {
      switch (tense) {
         case 'infinitive':
            if (correctInfinitive && answerInfinitive !== answer) {
               setCorrectInfinitive(false);
               props.setPoints(calcPoints(props.points, -10));
            }
            break;
         case 'present':
            if (correctPresent && answerPresent !== answer) {
               setCorrectPresent(false);
               props.setPoints(calcPoints(props.points, -10));
            }
            break;
         case 'past':
            if (correctPast && answerPast !== answer) {
               setCorrectPast(false);
               props.setPoints(calcPoints(props.points, -10));
            }
            break;
         case 'presperf':
            if (correctPresPerf && answerPresPerf !== answer) {
               setCorrectPresPerf(false);
               props.setPoints(calcPoints(props.points, -10));
            }
            break;
      }
   };

   return (
      <Stack pb='30'>
         {props.verbForm ? (
            <>
               <Text style={styles(props).promptForms}>
                  {props.synonyms
                     ? props.verbForm[0].meaning
                     : props.verbForm.meaning}
               </Text>
               {props.tenseNames.map((tense, index) => (
                  <InputComponentForms
                     value={props.started && ''}
                     tense={tense}
                     key={index}
                     label={labels[props.language][tense]}
                     onChangeText={(answer) => checkAnswer(answer, tense)}
                     correct={
                        tense === 'infinitive'
                           ? correctInfinitive
                           : tense === 'present'
                              ? correctPresent
                              : tense === 'past'
                                 ? correctPast
                                 : tense === 'presperf' && correctPresPerf
                     }
                     unanswered={
                        tense === 'infinitive'
                           ? unansweredInfinitive
                           : tense === 'present'
                              ? unansweredPresent
                              : tense === 'past'
                                 ? unansweredPast
                                 : tense === 'presperf' && unansweredPresPerf
                     }
                     forwardedRef={(r) => (refs.current[index] = r)}
                     componentIndex={props.componentIndex}
                     onBlur={() =>
                        tense === 'infinitive' && !unansweredInfinitive
                           ? focusOnNextInput(index)
                           : tense === 'present' && !unansweredPresent
                              ? focusOnNextInput(index)
                              : tense === 'past' && !unansweredPast
                                 ? focusOnNextInput(index)
                                 : tense === 'presperf' &&
                                 !unansweredPresPerf &&
                                 focusOnNextInput(index)
                     }
                     blurOnSubmit={false}
                     finished={props.finished}
                     synonymousForms={synonymousForms}
                     verbForm={props.verbForm}
                  />
               ))}
            </>
         ) : (
            <Spinner />
         )}
      </Stack>
   );
});

const mapStateToProps = (state) => ({
   infinitive: state.settings.tenses.infinitive,
   present: state.settings.tenses.present,
   past: state.settings.tenses.past,
   presperf: state.settings.tenses.presperf,
   language: state.settings.language,
});

export default connect(mapStateToProps)(CardComponentForms);
