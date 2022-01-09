import React, { useState } from 'react';
import { TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, VStack, Text } from 'native-base';
import ButtonComponent from '../components/buttons/ButtonComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import FooterComponent from '../components/footer/FooterComponent';

import * as Linking from 'expo-linking';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import { styles } from '../styles/styles';

import { getResultText } from '../helpers/sharing';

const ShareResultsScreen = (props) => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');

   const navigation = useNavigation();

   const sendMessage = (type) => {
      let text = `Verbivalmentaja - käyttäjän ${name} suoritustiedot kielestä`;
      if (props.language === 1) {
         text += '| ruotsi';
      } else {
         text += '| saksa';
      }
      text += '|<br>|<br>|Verbien merkitykset';
      // Number 1 stands for Meanings mode
      text += getResultText(1, props.language, props.results);
      text += '|<br>|<br>|Verbien muodot';
      // Number 2 stands for Forms mode
      text += getResultText(2, props.language, props.results);
      let textParsed = '';
      let textArray = text.split('|');
      let textReplaced;
      for (let i = 0; i < textArray.length; i++) {
         textReplaced = textArray[i].replace('<br>', '\r\n');
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
      <>
         <HeaderComponent title="Jaa tulokset" goBack={navigation.goBack} />
         <KeyboardAvoidingView
            style={styles(props).flexOne}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         >
            <Stack style={styles(props).shareResultsStyle} p='5'>
               <VStack>
                  <Text style={styles(props).labelForms}>
                     Nimesi (näkyy vain viestin vastaanottajalle)
                  </Text>
                  <TextInput
                     style={styles(props).formInputSharing}
                     onChangeText={(text) => setName(text)}
                  />
               </VStack>
               <VStack>
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
               </VStack>
               <VStack>
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
               </VStack>
            </Stack>
         </KeyboardAvoidingView>
         <FooterComponent />
      </>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   results: state.results.results,
});

export default connect(mapStateToProps)(ShareResultsScreen);
