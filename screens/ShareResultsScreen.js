import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { Container, Content, Text } from 'native-base';
import ButtonComponent from '../components/buttons/ButtonComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import FooterComponent from '../components/footer/FooterComponent';

import * as Linking from 'expo-linking';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';


const ShareResultsScreen = (props) => {

   const [name, setName] = useState('');

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
            resultText += `%0aTaso ${i}: %0a- Suorituskertoja yhteensä: ${getResults(type, i, props.language).totalAttempts}`;
            resultText += `%0a- Oikeita vastauksia: ${getResults(type, i, props.language).totalCorrectAnswers}`;
            resultText += ` / ${getResults(type, i, props.language).totalQuestions}`;
            resultText += `%0a- Keskimääräinen osaaminen ${getResults(type, i, props.language).percentagesAverage.toFixed(2).replace('.', ',')} prosenttia`            
         } else {
            resultText += `%0aTaso ${i}: %0a- Ei suorituskertoja`;
         }
      }
      console.log('resultText: ', resultText)
      return resultText;
   }

   const sendWhatsAppMessage = () => {
      let text = `Verbivalmentaja - käyttäjän ${name} suoritustiedot kielestä`;
      if (props.language === 1) {
         text += ' ruotsi';
      } else {
         text += ' saksa';
      }
      text += '%0a%0aVerbien merkitykset';
      // Number 1 stands for Meanings mode
      text += getResultText(1);
      text += '%0a%0aVerbien muodot';
      // Number 2 stands for Forms mode
      text += getResultText(2);
      Linking.openURL(`whatsapp://send?text=${text}&phone=+358407437870`);
   }

   return (
      <Container style={styles.container}>
         <HeaderComponent title="Omat tulokseni" goBack={navigation.goBack} />
         <KeyboardAvoidingView
            style={styles.flexOne}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         >
      <Content style={styles.contentContainer}>
         <Text style={styles.label}>Nimesi (näkyy vain viestin vastaanottajalle)</Text>
         <TextInput style={styles.formInput} onChangeText={(text => setName(text))} />
         <ButtonComponent title='Jaa tulokset WhatsAppilla' color="#7E00C5" function={sendWhatsAppMessage} />
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
