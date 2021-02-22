import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Content, Text } from 'native-base';
import ButtonComponent from '../buttons/ButtonComponent';

import * as Linking from 'expo-linking';


const ShareResults = (props) => {

   const sendWhatsAppMessage = () => {
      let text = 'Testi';
      text += '%0aUusi rivi';
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

export default ShareResults;

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
