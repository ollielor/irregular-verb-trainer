import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Container, Content, Text } from 'native-base';
import ButtonComponent from '../components/buttons/ButtonComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import FooterComponent from '../components/footer/FooterComponent';

import * as Linking from 'expo-linking';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';


const ShareResultsScreen = (props) => {

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');

   console.log('Props from ShareResultsScreen: ', props)

   const navigation = useNavigation();

   const getResults = (type, level, language) => {
      let history;
      if (type === 1) {
         history = props.route.params.historyMeanings;
      } else {
         history = props.route.params.historyForms;
      }
      const historyFiltered = history.filter((historyItem) => historyItem.level === level && historyItem.language === language);
      if (historyFiltered.length === 0) {
         return;
      } else {
         const correctAnswers = historyFiltered.map((result) => result.accuracy);
         const totalCorrectAnswers = correctAnswers.reduce((a, b) => a + b);
         const questions = historyFiltered.map((result) => result.q_total);
         const totalQuestions = questions.reduce((a, b) => a + b);
         const percentages = historyFiltered.map((result) => result.percentage);
         const percentagesAverage = percentages.reduce((a, b) => a + b) / percentages.length;
         return {
            totalAttempts: historyFiltered.length,
            totalCorrectAnswers: totalCorrectAnswers, 
            totalQuestions: totalQuestions,
            percentagesAverage: percentagesAverage
         }
      }
   }

   const getResultText = (type) => {
      let resultText = ''; 
      for (let i=1; i <= 3; i++) {
         if (getResults(type, i, props.language)) {
            resultText += `|<br>Taso ${i}: |<br>- Suorituskertoja yhteensä: ${getResults(type, i, props.language).totalAttempts}`;
            resultText += `|<br>- Oikeita vastauksia: ${getResults(type, i, props.language).totalCorrectAnswers}`;
            resultText += ` / ${getResults(type, i, props.language).totalQuestions}`;
            resultText += `|<br>- Keskimääräinen osaaminen ${getResults(type, i, props.language).percentagesAverage.toFixed(2).replace('.', ',')} prosenttia`            
         } else {
            resultText += `|<br>|Taso ${i}:|<br>|- Ei suorituskertoja`;
         }
      }
      console.log('resultText: ', resultText)
      return resultText;
   }

   const sendMesssage = (type) => {
      let text = `Verbivalmentaja - käyttäjän ${name} suoritustiedot kielestä`;
      if (props.language === 1) {
         text += '| ruotsi';
      } else {
         text += '| saksa';
      }
      text += '|<br>|<br>|Verbien merkitykset';
      // Number 1 stands for Meanings mode
      text += getResultText(1);
      text += '|<br>|<br>|Verbien muodot';
      // Number 2 stands for Forms mode
      text += getResultText(2);
      let textFinal;
      let textArray;
      if (Platform.OS === 'android') {
         textArray = text.split("|");
         let textReplaced;
         let textParsed = '';
         for (let i=0; i < textArray.length; i++) {
            textReplaced = textArray[i].replace('<br>', '%0a');
            textParsed += textReplaced;
         } 
         console.log(textParsed);
         textFinal = textParsed;
      } else {
         textArray = text.split("|");
         let textParsed = '';
         for (let i=0; i < textArray.length; i++) {
            textParsed += textArray[i];
         } 
         console.log(textParsed);
         textFinal = textParsed;
      }
      if (type === 'whatsapp') {
          Linking.openURL(`whatsapp://send?text=${textFinal}`);
      }
      if (type === 'email') {
         Linking.openURL(`mailto:${email}?subject=Käyttäjän ${name} tulokset Verbivalmentajasta&body=${textFinal}`);
      }
   }

   return (
      <Container style={styles.container}>
         <HeaderComponent title="Jaa tulokset" goBack={navigation.goBack} />
         <KeyboardAvoidingView
            style={styles.flexOne}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         >
      <Content style={styles.contentContainer}>
         <Text style={styles.label}>Nimesi (näkyy vain viestin vastaanottajalle)</Text>
         <TextInput style={styles.formInput} onChangeText={(text => setName(text))} />
         <Text style={styles.label}>Vastaanottajan sähköpostiosoite</Text>
         <TextInput style={styles.formInput} onChangeText={(text => setEmail(text))} autoCompleteType='email' keyboardType='email-address' autoCapitalize='none' />
         <ButtonComponent title='Jaa tulokset sähköpostilla' color="#7E00C5" function={() => sendMesssage('email')} />
         <ButtonComponent title='Jaa tulokset WhatsAppilla' color="#7E00C5" function={() => sendMesssage('whatsapp')} />
      </Content>
      </KeyboardAvoidingView>
      <FooterComponent />
      </Container>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
});

export default connect(mapStateToProps)(ShareResultsScreen);

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#d2d2d2',
   },
   contentContainer: {
      padding: 10,
   },
   label: {
      marginTop: 15,
   },
   formInput: {
      fontSize: 16,
      padding: 10,
      borderColor: '#7E00C5',
      borderWidth: 1,
      width: '100%',
      marginTop: 10,
      marginBottom: 10
   },
   flexOne: {
      flex: 1,
   },
});
