import React, { useEffect, useState } from 'react';
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
   const [synonymousForms, setSynonymousForms] = useState('');
   const [initialValue, setInitialValue] = useState('');

   console.log(props)

   const verbId = props.verbForm.verb_id;

   useEffect(() => {
      if (props.synonyms) {
         let infinitiveSynonyms = props.verbForm.map(verbForm => {return verbForm.infinitive});
         let presentSynonyms = props.verbForm.map(verbForm => {return verbForm.present});
         let pastSynonyms = props.verbForm.map(verbForm => {return verbForm.past});
         let presPerfSynonyms = props.verbForm.map(verbForm => {return verbForm.presperf});
         console.log('infinitiveSynonyms: ', infinitiveSynonyms);
         setSynonymousForms({
            infinitive: infinitiveSynonyms,
            present: presentSynonyms,
            past: pastSynonyms,
            presPerf: presPerfSynonyms
         });
      }
   }, [])

   useEffect(() => {
      if (props.correctForm.verbId === verbId) {
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
      if (props.incorrectForm.verbId === verbId) {
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

    return (
         <Card>
            <CardItem>
               <Body>
                  <Text style={{color: '#7E00C5', fontWeight: 'bold', fontSize: 16, marginTop: 22}}>
                     {props.synonyms ? props.verbForm[0].meaning : props.verbForm.meaning}
                  </Text>
                  <TextInput
                     style={
                        correctInfinitive && Platform.OS === 'ios' ? styles.formInputCorrectIOS 
                        : incorrectInfinitive && Platform.OS === 'ios' ? styles.formInputIncorrectIOS
                        : Platform.OS === 'ios' ? styles.formInputIOS 
                        : styles.formInput
                     }
                     placeholder='Perusmuoto'
                     onChangeText={answer => props.synonyms ? props.evaluate(answer, synonymousForms.infinitive, 'infinitive', verbId) : 
                        props.evaluate(answer, props.verbForm.infinitive, 'infinitive', verbId)}
                     editable={correctInfinitive || props.finished ? false : true}
                     placeholderTextColor={Platform.OS === 'ios' && incorrectInfinitive ? 'white' : 'grey'}
                     autoCompleteType='off'
                     autoCorrect={false}
                     underlineColorAndroid={correctInfinitive ? '#66dd33' : incorrectInfinitive ? '#ff0033' : '#7E00C5'}
                  />
                  {props.finished && props.synonyms && !incorrectInfinitive ?
                        <CorrectAnswerComponent form={synonymousForms.infinitive} synonyms={true} /> : 
                     props.finished && !props.synonyms && !incorrectInfinitive &&
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
                     onChangeText={answer => props.synonyms ? props.evaluate(answer, synonymousForms.present, 'present', verbId) : 
                        props.evaluate(answer, props.verbForm.present, 'present', verbId)}
                     editable={correctPresent || props.finished ? false : true}
                     placeholderTextColor={Platform.OS === 'ios' && incorrectPresent ? 'white' : 'grey'}
                     autoCompleteType='off'
                     autoCorrect={false}
                     underlineColorAndroid={correctPresent ? '#66dd33' : incorrectPresent ? '#ff0033' : '#7E00C5'}
                  />
                  {props.finished && props.synonyms && !incorrectPresent ?
                        <CorrectAnswerComponent form={synonymousForms.present} synonyms={true} /> : 
                     props.finished && !props.synonyms && !incorrectPresent &&
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
                     onChangeText={answer => props.synonyms ? props.evaluate(answer, synonymousForms.past, 'past', verbId) : 
                        props.evaluate(answer, props.verbForm.past, 'past', verbId)}
                     editable={correctPast || props.finished ? false : true}
                     placeholderTextColor={Platform.OS === 'ios' && incorrectPast ? 'white' : 'grey'}
                     autoCompleteType='off'
                     autoCorrect={false}
                     underlineColorAndroid={correctPast ? '#66dd33' : incorrectPast ? '#ff0033' : '#7E00C5'}
                  />
                  {props.finished && props.synonyms && !incorrectPast ?
                        <CorrectAnswerComponent form={synonymousForms.past} synonyms={true} /> : 
                     props.finished && !props.synonyms && !incorrectPast &&
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
                     onChangeText={answer => props.synonyms ? props.evaluate(answer, synonymousForms.presPerf, 'presperf', verbId) : 
                        props.evaluate(answer, props.verbForm.presperf, 'presperf', verbId)}
                     editable={correctPresPerf || props.finished ? false : true}
                     placeholderTextColor={Platform.OS === 'ios' && incorrectPresPerf ? 'white' : 'grey'}
                     autoCompleteType='off'
                     autoCorrect={false}
                     underlineColorAndroid={correctPresPerf ? '#66dd33' : incorrectPresPerf ? '#ff0033' : '#7E00C5'}
                  />
                  {props.finished && props.synonyms && !incorrectPresPerf ?
                        <CorrectAnswerComponent form={synonymousForms.presperf} synonyms={true} /> : 
                     props.finished && !props.synonyms && !incorrectPresPerf &&
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
