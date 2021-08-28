import React, { useState } from 'react';
import { TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Container, Content, Text } from 'native-base';
import ButtonComponent from '../components/buttons/ButtonComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import FooterComponent from '../components/footer/FooterComponent';
import InfoContent from '../components/styling/InfoContent';

import * as Linking from 'expo-linking';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import { styles } from '../styles/styles';

const ShareResultsScreen = (props) => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');

   const navigation = useNavigation();

   const getResultsForSharing = (type, level, language) => {
      let history;
      if (type === 1) {
         history = props.results.filter((result) => result.type === 1);
      } else {
         history = props.results.filter((result) => result.type === 2);
      }
      const historyFiltered = history.filter(
         (historyItem) =>
            historyItem.level === level && historyItem.language === language
      );
      if (historyFiltered.length === 0) {
         return;
      } else {
         const correctAnswers = historyFiltered.map(
            (result) => result.accuracy
         );
         const totalCorrectAnswers = correctAnswers.reduce((a, b) => a + b);
         const questions = historyFiltered.map((result) => result.q_total);
         const totalQuestions = questions.reduce((a, b) => a + b);
         const percentages = historyFiltered.map((result) => result.percentage);
         const percentagesAverage =
            percentages.reduce((a, b) => a + b) / percentages.length;
         return {
            totalAttempts: historyFiltered.length,
            totalCorrectAnswers: totalCorrectAnswers,
            totalQuestions: totalQuestions,
            percentagesAverage: percentagesAverage,
         };
      }
   };

   const getResultText = (type) => {
      let resultText = '';
      for (let i = 1; i <= 3; i++) {
         if (getResultsForSharing(type, i, props.language)) {
            resultText += `|<br>Taso ${i}: |<br>- Suorituskertoja yhteensä: ${
               getResultsForSharing(type, i, props.language).totalAttempts
            }`;
            resultText += `|<br>- Oikeita vastauksia: ${
               getResultsForSharing(type, i, props.language).totalCorrectAnswers
            }`;
            resultText += ` / ${
               getResultsForSharing(type, i, props.language).totalQuestions
            }`;
            resultText += `|<br>- Keskimääräinen osaaminen ${getResultsForSharing(
               type,
               i,
               props.language
            )
               .percentagesAverage.toFixed(2)
               .replace('.', ',')} prosenttia (sisältää aikabonukset)`;
         } else {
            resultText += `|<br>|Taso ${i}:|<br>|- Ei suorituskertoja`;
         }
      }
      return resultText;
   };

   const sendMessage = (type) => {
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
      let textParsed = '';
      let textArray = text.split('|');
      let textReplaced;
      for (let i = 0; i < textArray.length; i++) {
         textReplaced = textArray[i].replace('<br>', '%0D%0A');
         textParsed += textReplaced;
      }
      if (type === 'whatsapp') {
         Linking.openURL(`whatsapp://send?text=${textParsed}`);
      }
      if (type === 'email') {
         Linking.openURL(
            `mailto:${email}?subject=Käyttäjän ${name} tulokset Verbivalmentajasta&body=${textParsed}`
         );
      }
   };

   return (
      <Container style={styles(props).containerGrey}>
         <HeaderComponent title="Jaa tulokset" goBack={navigation.goBack} />
         <KeyboardAvoidingView
            style={styles(props).flexOne}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         >
            <Content style={styles(props).flexOne}>
               <Text style={styles(props).labelForms}>
                  Nimesi (näkyy vain viestin vastaanottajalle)
               </Text>
               <TextInput
                  style={styles(props).formInputSharing}
                  onChangeText={(text) => setName(text)}
               />
               <Text style={styles(props).labelForms}>
                  Vastaanottajan sähköpostiosoite
               </Text>
               <TextInput
                  style={[{ marginBottom: 20 }, styles(props).formInputSharing]}
                  onChangeText={(text) => setEmail(text)}
                  autoCompleteType="email"
                  keyboardType="email-address"
                  autoCapitalize="none"
               />
               <ButtonComponent
                  title="Jaa tulokset sähköpostilla"
                  color="#7E00C5"
                  function={() => sendMessage('email')}
               />
               <ButtonComponent
                  title="Jaa tulokset WhatsAppilla"
                  color="#7E00C5"
                  function={() => sendMessage('whatsapp')}
               />
               {Platform.OS === 'ios' &&
                  <InfoContent>
                     iOS:n oletussähköpostiohjelmalla lähetettäessä teksti ei välttämättä näy oikeanlaisena. Voit käyttää sen sijaan WhatsAppia tai toista sähköpostiohjelmaa. 
                  </InfoContent>
               }
            </Content>
         </KeyboardAvoidingView>
         <FooterComponent />
      </Container>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   results: state.results.results,
});

export default connect(mapStateToProps)(ShareResultsScreen);
