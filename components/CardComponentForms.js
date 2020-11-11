import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import {
   Body, 
   Card,
   CardItem,
   Content,
   Text,
} from 'native-base';

const CardComponentForms = props => {

   const [correctInfinitive, setCorrectInfinitive] = useState(false);
   const [correctPresent, setCorrectPresent] = useState(false);
   const [correctPast, setCorrectPast] = useState(false);
   const [correctPresPerf, setCorrectPresPerf] = useState(false);
   const [incorrectInfinitive, setIncorrectInfinitive] = useState(false);
   const [incorrectPresent, setIncorrectPresent] = useState(false);
   const [incorrectPast, setIncorrectPast] = useState(false);
   const [incorrectPresPerf, setIncorrectPresPerf] = useState(false);

   console.log(props)

   const verbId = props.verbForm.verb_id;

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
       <>
       <Text>
         {props.correctForm.verbId}
       </Text>
         <Card>
            <CardItem>
               <Body>
                  <Text style={{color: '#7E00C5', fontWeight: 'bold', marginBottom: 22, marginTop: 22}}>
                     {props.verbForm.meaning}
                  </Text>
                  <TextInput
                     style={correctInfinitive ? styles.formInputCorrect : incorrectInfinitive ? styles.formInputIncorrect : styles.formInput}
                     placeholder='Perusmuoto'
                     onChangeText={answer => props.evaluate(answer, props.verbForm.infinitive, 'infinitive', verbId)}
                     editable={!correctInfinitive}
                     placeholderTextColor='grey'
                  />
                  <TextInput
                     style={correctPresent ? styles.formInputCorrect : incorrectPresent ? styles.formInputIncorrect : styles.formInput}
                     placeholder='Preesens (er/sie/es)'
                     onChangeText={answer => props.evaluate(answer, props.verbForm.present, 'present', verbId)}   
                     editable={!correctPresent}
                     placeholderTextColor='grey'
                  />
                  <TextInput
                     style={correctPast ? styles.formInputCorrect : incorrectPast ? styles.formInputIncorrect : styles.formInput}
                     placeholder='Imperfekti (er/sie/es)'
                     onChangeText={answer => props.evaluate(answer, props.verbForm.past, 'past', verbId)}  
                     editable={!correctPast} 
                     placeholderTextColor='grey'
                  />
                  <TextInput
                     style={correctPresPerf ? styles.formInputCorrect : incorrectPresPerf ? styles.formInputIncorrect : styles.formInput}
                     placeholder='Perfekti (er/sie/es)'
                     onChangeText={answer => props.evaluate(answer, props.verbForm.presperf, 'presperf', verbId)} 
                     editable={!correctPresPerf}
                     placeholderTextColor='grey'  
                  />
               </Body>
            </CardItem>
         </Card>
      </>
    );
}

export default CardComponentForms;

const styles = StyleSheet.create({
   formInput: {
      fontSize: 16,
      marginTop: 22,
      marginBottom: 22,
      padding: 10,
      borderColor: 'blue',
      borderWidth: 1,
      width: '100%',
   },
   formInputCorrect: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 22,
      marginBottom: 22,
      padding: 10,
      backgroundColor: '#66dd33',
      color: '#7E00C5',
      width: '100%',
   },
   formInputIncorrect: {
      fontSize: 16,
      marginTop: 22,
      marginBottom: 22,
      padding: 10,
      backgroundColor: '#ff0033',
      color: 'white',
      width: '100%',
   }
})
