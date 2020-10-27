import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { 
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

import ButtonComponent from '../components/ButtonComponent';
import FooterButtonComponent from '../components/FooterButtonComponent';

const GermanStartScreen = props => {

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
                     <ButtonComponent color='#7E00C5' title='Selaa ja opettele verbejä' function={() => console.log('Selaa ja opettele')} />
                     <ButtonComponent color='#7E00C5' title='Harjoittele verbien merkityksiä' function={() => console.log('Harjoittele merkityksiä')} />
                     <ButtonComponent color='#4E00C5' title='Harjoittele verbien muotoja' function={() => console.log('Harjoittele muotoja')} />
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
    );
}

export default GermanStartScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#404040',
  },
  contentContainer: {
     padding: 10
  },
  });
