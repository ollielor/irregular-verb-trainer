import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, TextInput, Platform } from 'react-native';
import {
   Body, 
   Card,
   CardItem,
   Content,
   Text,
} from 'native-base';
import CorrectAnswerComponent from './CorrectAnswerComponent';

const CardComponentForms = props => {

   const [correctInfinitive, setCorrectInfinitive] = useState(false);
   const [correctPresent, setCorrectPresent] = useState(false);
   const [correctPast, setCorrectPast] = useState(false);
   const [correctPresPerf, setCorrectPresPerf] = useState(false);
   const [incorrectInfinitive, setIncorrectInfinitive] = useState(false);
   const [incorrectPresent, setIncorrectPresent] = useState(false);
   const [incorrectPast, setIncorrectPast] = useState(false);
   const [incorrectPresPerf, setIncorrectPresPerf] = useState(false);
   const [answerInfinitive, setAnswerInfinitive] = useState('');
   const [answerPresent, setAnswerPresent] = useState('');
   const [answerPast, setAnswerPast] = useState('');
   const [answerPresPerf, setAnswerPresPerf] = useState('');
   const [synonymousForms, setSynonymousForms] = useState({
      infinitive: [],
      present: [],
      past: [],
      presPerf: []
   });
   
   console.log('props from CardComponentForms: ', props)

   useEffect(() => {
      if (props.synonyms) {
         const infinitiveSynonyms = props.verbForm.map(verbForm => verbForm.infinitive);
         const presentSynonyms = props.verbForm.map(verbForm => verbForm.present);
         const pastSynonyms = props.verbForm.map(verbForm => verbForm.past);
         const presPerfSynonyms = props.verbForm.map(verbForm => verbForm.presperf);
         console.log('infinitiveSynonyms: ', infinitiveSynonyms);
         console.log('presPerfSynonyms: ', presPerfSynonyms)
         setSynonymousForms({
            infinitive: infinitiveSynonyms,
            present: presentSynonyms,
            past: pastSynonyms,
            presPerf: presPerfSynonyms
         });
         console.log('SynonymousForms: ', synonymousForms);
      }
   }, [])

   useEffect(() => {
      if (props.answeredIndex === props.index) {
         inputRef1.current.focus();
      }
   }, [props.answeredIndex, props.index])

   useEffect(() => {
      if (props.correctForm.verbId === props.verbForm.verb_id) {
         switch (props.correctForm.form) {
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
      }
      if (props.incorrectForm.verbId === props.verbForm.verb_id) {
         switch (props.incorrectForm.form) {
            case 'infinitive':
               setIncorrectInfinitive(true);
               break;
            case 'present':
               setIncorrectPresent(true);
               break;
            case 'past':
               setIncorrectPast(true);
               break;
            case 'presperf':
               setIncorrectPresPerf(true);
               break;
         }      
      }
   }, [props.correctForm, props.incorrectForm])

   useEffect(() => {
      if (props.started) {
         inputRef1.current.clear();
         inputRef2.current.clear();
         inputRef3.current.clear();
         inputRef4.current.clear();
      }
   }, [props.started])

   useEffect(() => {
      if (props.synonyms && synonymousForms) {
         if (props.evaluate(answerInfinitive, synonymousForms.infinitive, 'infinitive')) {
            setCorrectInfinitive(true);
         } 
      } else {
         if (props.evaluate(answerInfinitive, props.verbForm.infinitive, 'infinitive')) {
            setCorrectInfinitive(true);
         }
      }
   }, [props.synonyms, synonymousForms, answerInfinitive])

   useEffect(() => {
      if (props.synonyms && synonymousForms) {
         if (props.evaluate(answerPresent, synonymousForms.present, 'present', props.verbForm.verb_id, props.index)) {
            setCorrectPresent(true);
         } 
      } else {
         if (props.evaluate(answerPresent, props.verbForm.present, 'present', props.verbForm.verb_id, props.index)) {
            setCorrectPresent(true);
         }
      }
   }, [props.synonyms, synonymousForms, answerPresent])

   useEffect(() => {
      if (props.synonyms && synonymousForms) {
         if (props.evaluate(answerPast, synonymousForms.past, 'past', props.verbForm.verb_id, props.index)) {
            setCorrectPast(true);
         } 
      } else {
         if (props.evaluate(answerPast, props.verbForm.past, 'past', props.verbForm.verb_id, props.index)) {
            setCorrectPast(true);
         }
      }
   }, [props.synonyms, synonymousForms, answerPast])

   useEffect(() => {
      if (props.synonyms && synonymousForms) {
         if (props.evaluate(answerPresPerf, synonymousForms.presPerf, 'presperf', props.verbForm.verb_id, props.index)) {
            setCorrectPresPerf(true);
         } 
      } else {
         if (props.evaluate(answerPresPerf, props.verbForm.presperf, 'presperf', props.verbForm.verb_id, props.index)) {
            setCorrectPresPerf(true);
         }
      }
   }, [props.synonyms, synonymousForms, answerPresPerf])

   const inputRef1 = useRef();
   const inputRef2 = useRef();
   const inputRef3 = useRef();
   const inputRef4 = useRef();

   console.log(props.answeredIndex)

    return (
         <Card>
            <CardItem>
               <Body>
                  <Text style={{color: '#7E00C5', fontWeight: 'bold', fontSize: 16, marginTop: 22}}>
                     {props.synonyms ? props.verbForm[0].meaning : props.verbForm.meaning}
                  </Text>
                  <TextInput
                     style={
                        answerInfinitive && correctInfinitive && Platform.OS === 'ios' ? styles.formInputCorrectIOS 
                        : answerInfinitive && !correctInfinitive && Platform.OS === 'ios' ? styles.formInputIncorrectIOS
                        : Platform.OS === 'ios' ? styles.formInputIOS 
                        : styles.formInput
                     }
                     ref={inputRef1}
                     onBlur={() => correctInfinitive && inputRef2.current.focus()}
                     placeholder='Perusmuoto'
                     onChangeText={answer => setAnswerInfinitive(answer)}
                     //onChangeText={answer => props.synonyms ? props.evaluate(answer, synonymousForms.infinitive, 'infinitive', props.verbForm.verb_id, props.index) : 
                        //props.evaluate(answer, props.verbForm.infinitive, 'infinitive', props.verbForm.verb_id, props.index)}
                     editable={correctInfinitive || props.finished ? false : true}
                     placeholderTextColor={Platform.OS === 'ios' && incorrectInfinitive ? 'white' : 'grey'}
                     autoCompleteType='off'
                     autoCorrect={false}
                     autoCapitalize='none'
                     underlineColorAndroid={correctInfinitive ? '#66dd33' : incorrectInfinitive ? '#ff0033' : '#7E00C5'}
                  />
                  {props.finished && props.synonyms && !correctInfinitive ?
                        <CorrectAnswerComponent form={synonymousForms.infinitive} synonyms={true} /> : 
                     props.finished && !props.synonyms && !correctInfinitive &&
                        <CorrectAnswerComponent form={props.verbForm.infinitive} synonyms={false} />     
                  }
                  <TextInput
                     style={
                        correctPresent && Platform.OS === 'ios' ? styles.formInputCorrectIOS 
                        : incorrectPresent && Platform.OS === 'ios' ? styles.formInputIncorrectIOS
                        : Platform.OS === 'ios' ? styles.formInputIOS 
                        : styles.formInput
                     }
                     placeholder='Preesens (er/sie/es)'
                     ref={inputRef2}
                     onBlur={() => correctPresent && inputRef3.current.focus()}
                     onChangeText={answer => setAnswerPresent(answer)}
                     editable={correctPresent || props.finished ? false : true}
                     placeholderTextColor={Platform.OS === 'ios' && incorrectPresent ? 'white' : 'grey'}
                     autoCompleteType='off'
                     autoCorrect={false}
                     autoCapitalize='none'
                     underlineColorAndroid={correctPresent ? '#66dd33' : incorrectPresent ? '#ff0033' : '#7E00C5'}
                  />
                  {props.finished && props.synonyms && !correctPresent ?
                        <CorrectAnswerComponent form={synonymousForms.present} synonyms={true} /> : 
                     props.finished && !props.synonyms && !correctPresent &&
                        <CorrectAnswerComponent form={props.verbForm.present} synonyms={false} />     
                  }
                  <TextInput
                     style={
                        correctPast && Platform.OS === 'ios' ? styles.formInputCorrectIOS 
                        : incorrectPast && Platform.OS === 'ios' ? styles.formInputIncorrectIOS
                        : Platform.OS === 'ios' ? styles.formInputIOS 
                        : styles.formInput
                     }
                     placeholder='Imperfekti (er/sie/es)'
                     ref={inputRef3}
                     onBlur={() => correctPast && inputRef4.current.focus()}
                     onChangeText={answer => setAnswerPast(answer)}
                     editable={correctPast || props.finished ? false : true}
                     placeholderTextColor={Platform.OS === 'ios' && incorrectPast ? 'white' : 'grey'}
                     autoCompleteType='off'
                     autoCorrect={false}
                     autoCapitalize='none'
                     underlineColorAndroid={correctPast ? '#66dd33' : incorrectPast ? '#ff0033' : '#7E00C5'}
                  />
                  {props.finished && props.synonyms && !correctPast ?
                        <CorrectAnswerComponent form={synonymousForms.past} synonyms={true} /> : 
                     props.finished && !props.synonyms && !correctPast &&
                        <CorrectAnswerComponent form={props.verbForm.past} synonyms={false} />     
                  }
                  <TextInput
                     style={
                        correctPresPerf && Platform.OS === 'ios' ? styles.formInputCorrectIOS 
                        : incorrectPresPerf && Platform.OS === 'ios' ? styles.formInputIncorrectIOS
                        : Platform.OS === 'ios' ? styles.formInputIOS 
                        : styles.formInput
                     }
                     placeholder='Perfekti (er/sie/es)'
                     ref={inputRef4}
                     onChangeText={answer => setAnswerPresPerf(answer)}
                     editable={correctPresPerf || props.finished ? false : true}
                     placeholderTextColor={Platform.OS === 'ios' && incorrectPresPerf ? 'white' : 'grey'}
                     autoCompleteType='off'
                     autoCorrect={false}
                     autoCapitalize='none'
                     underlineColorAndroid={correctPresPerf ? '#66dd33' : incorrectPresPerf ? '#ff0033' : '#7E00C5'}
                  />
                  {props.finished && props.synonyms && !correctPresPerf ?
                        <CorrectAnswerComponent form={synonymousForms.presPerf} synonyms={true} /> : 
                     props.finished && !props.synonyms && !correctPresPerf &&
                        <CorrectAnswerComponent form={props.verbForm.presperf} synonyms={false} />     
                  }
               </Body>
            </CardItem>
         </Card>
    );
}

export default CardComponentForms;

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
   }
})

/*const styles = StyleSheet.create({
   formInput: {
      fontSize: 16,
      marginTop: 45,
      padding: 10,
      borderColor: '#7E00C5',
      borderWidth: 1,
      width: '100%',
   },
   formInputCorrect: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 45,
      padding: 10,
      backgroundColor: '#66dd33',
      borderColor: '#7E00C5',
      color: '#7E00C5',
      width: '100%',
   },
   formInputIncorrect: {
      fontSize: 16,
      marginTop: 45,
      padding: 10,
      backgroundColor: '#ff0033',
      borderColor: '#7E00C5',
      color: 'white',
      width: '100%',
   }
})*/
