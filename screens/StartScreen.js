import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { 
   Container, 
   Button, 
   Body,
   Left,
   Right, 
   Spinner, 
   Header,
   Title, 
   Content,
   Icon
} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import ButtonComponent from '../components/ButtonComponent';
import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';

const StartScreen = ({navigation: {navigate}}) => {

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
      const loadFonts = async () => {
         try {
            await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
            })
            setIsReady(true);
         } catch (error) {
            console.log(error);
         }
      }
      loadFonts();
  }, [])

    return (
         <Container style={styles.container}>
            {!isReady && 
               <Spinner color='#7E00C5' />
            }
            {isReady &&
               <Container>
                  <HeaderComponent title='Verbivalmentaja' noArrow />
                  <Content style={styles.contentContainer}>
                     <ButtonComponent color='#7E00C5' title='Ruotsi' function={() => console.log('Ruotsi')} />
                     <ButtonComponent color='#7E00C5' title='Saksa' function={() => navigate('Saksa')} />
                     <ButtonComponent color='#4E00C5' title='Omat tulokseni' function={() => console.log('Omat tulokseni')} />
                     <ButtonComponent color='#4E00C5' title='Asetukset' function={() => console.log('Asetukset')} />
                  </Content>
                  <FooterComponent />
               </Container>
            }
         </Container>
    );
}

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d2d2d2',
  },
  contentContainer: {
     padding: 10
  },
  });
