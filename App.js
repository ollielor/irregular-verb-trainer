import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { 
   StyleProvider, 
   Container, 
   Button, 
   Text,
   Body,
   Left,
   Right, 
   Spinner, 
   Header,
   Title, 
   Content,
   Footer,
   FooterTab,
   Icon
} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import ButtonComponent from './components/ButtonComponent';
import FooterButtonComponent from './components/FooterButtonComponent';

import commonColor from './native-base-theme/variables/commonColor';
import variables from './native-base-theme/variables/variables';
import getTheme from './native-base-theme/components';

import { connectStyle } from 'native-base'; 

const App = () => {

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
       <StyleProvider style={getTheme(variables)}>
            <Container style={styles.container}>
               {!isReady && 
                  <Spinner color='#7E00C5' />
               }
               {isReady &&
                  <Container>
                        <Header style={{backgroundColor: '#4E00C5'}}>
                           <Left style={{flex: 1}}>
                              <Button transparent>
                                 <Icon name='arrow-back' />
                              </Button>
                           </Left>
                           <Body style={{flex: 2, alignItems: 'center'}}>
                              <Title>
                                 Verbivalmentaja
                              </Title>
                           </Body>
                           <Right style={{flex: 1}} />
                        </Header>
                        <Content style={styles.contentContainer}>
                           <ButtonComponent color='#7E00C5' title='Ruotsi' function={() => console.log('Ruotsi')} />
                           <ButtonComponent color='#7E00C5' title='Saksa' function={() => console.log('Saksa')} />
                           <ButtonComponent color='#4E00C5' title='Omat tulokseni' function={() => console.log('Omat tulokseni')} />
                           <ButtonComponent color='#4E00C5' title='Asetukset' function={() => console.log('Asetukset')} />
                        </Content>
                        <Footer>
                           <FooterTab>
                              <FooterButtonComponent title='Koti' function={() => console.log('Koti')} />
                           </FooterTab>
                           <FooterTab>
                              <FooterButtonComponent title='Tulokset' function={() => console.log('Tulokset')} />
                           </FooterTab>
                           <FooterTab>
                              <FooterButtonComponent title='Asetukset' function={() => console.log('Asetukset')} />
                           </FooterTab>
                        </Footer>
                  </Container>
               }
            </Container>
      </StyleProvider>
    );
}

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#404040',
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  contentContainer: {
     padding: 10
  },
  centered: {
     color: '#fff',
     alignContent: 'center',
     alignItems: 'center'
  }
  });
