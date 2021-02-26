import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Content, Text } from 'native-base';
import ButtonComponent from '../buttons/ButtonComponent';

import * as Linking from 'expo-linking';

import { connect } from 'react-redux';


const ShareResults = (props) => {

   const getResults = (type, level, language) => {
      console.log(level);
      console.log(language);
      console.log('props.historyMeanings: ', props.historyMeanings);
      let history;
      if (type === 1) {
         history = props.historyMeanings;
         console.log(history)
      } else {
         history = props.historyForms;
         console.log(history)
      }
      console.log('History: ', history)
      const historyFiltered = history.filter((historyItem) => historyItem.level === level && historyItem.language === language);
      console.log('historyFiltered: ', historyFiltered)
      if (historyFiltered.length === 0) {
         return;
      } else {
         const correctAnswers = historyFiltered.map((result) => result.accuracy);
         console.log(correctAnswers);
         const totalCorrectAnswers = correctAnswers.reduce((a, b) => a + b);
         const questions = historyFiltered.map((result) => result.q_total);
         const totalQuestions = questions.reduce((a, b) => a + b);
         const percentages = historyFiltered.map((result) => result.percentage);
         const percentagesAverage = percentages.reduce((a, b) => a + b) / percentages.length;
         return {
            totalCorrectAnswers: totalCorrectAnswers, 
            totalQuestions: totalQuestions,
            percentagesAverage: percentagesAverage
         }
      }
   }

   const sendWhatsAppMessage = () => {
      let text = 'Verbivalmentaja - käyttäjän X suoritustiedot kielestä';
      if (props.language === 1) {
         text += ' ruotsi';
      } else {
         text += ' saksa';
      }
      text += '%0a%0aVerbien merkitykset';
      for (let i=1; i <= 3; i++) {
         // Number 1 stands for Meanings mode
         if (getResults(1, i, props.language)) {
            text += `%0aTaso ${i}: %0a- Oikeita vastauksia: ${getResults(1, i, props.language).totalCorrectAnswers}`;
            text += ` / ${getResults(1, i, props.language).totalQuestions}`;
            text += `%0a- Keskimääräinen osaaminen ${getResults(1, i, props.language).percentagesAverage.toFixed(2).replace('.', ',')} prosenttia`            
         }
      }
      text += '%0a%0aVerbien muodot';
      for (let i=1; i <= 3; i++) {
         // Number 2 stands for Forms mode
         if (getResults(2, i, props.language)) {
            text += `%0aTaso ${i}: %0a- Oikeita vastauksia: ${getResults(2, i, props.language).totalCorrectAnswers}`;
            text += ` / ${getResults(2, i, props.language).totalQuestions}`;
            text += `%0a- Keskimääräinen osaaminen ${getResults(2, i, props.language).percentagesAverage.toFixed(2).replace('.', ',')} prosenttia`            
         }
      }
      /*if (getResultsMeanings(1, props.language)) {
         text += `%0aTaso 1 %0a- Oikeita vastauksia: ${getResultsMeanings(1, props.language).totalCorrectAnswers}`
      }
      if (getResultsMeanings(2, props.language)) {
         text += `%0aTaso 2 %0a- Oikeita vastauksia: ${getResultsMeanings(2, props.language).totalCorrectAnswers}`
      }
      if (getResultsMeanings(3, props.language)) {
         text += `%0aTaso 3 %0a- Oikeita vastauksia: ${getResultsMeanings(3, props.language).totalCorrectAnswers}`
      }
      */
      Linking.openURL(`whatsapp://send?text=${text}&phone=+358407437870`);
   }

   return (
      <Content>
            <ButtonComponent
               color="#7E00C5"
               title="Lähetä tulokset WhatsAppilla"
               function={sendWhatsAppMessage}
            />
      </Content>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
});

export default connect(mapStateToProps)(ShareResults);

const styles = StyleSheet.create({
   feedback: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24,
      color: '#4E00C5',
      marginTop: 20,
   },
   feedbackPoints: {
      textAlign: 'center',
      paddingTop: 10,
   },
   startAgainButton: {
      backgroundColor: '#4E00C5',
      alignSelf: 'center',
      marginTop: 20,
      marginBottom: 20,
   },
});
