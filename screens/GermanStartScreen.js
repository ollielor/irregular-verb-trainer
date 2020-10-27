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
import HeaderComponent from '../components/HeaderComponent';

const GermanStartScreen = ({ navigation: { goBack }}) => {

    return (
               <Container style={styles.container}>
                  <HeaderComponent title='Saksa' goBack={goBack} />
                  <Content style={styles.contentContainer}>
                     <ButtonComponent color='#7E00C5' title='Selaa ja opettele verbejä' function={() => console.log('Selaa ja opettele')} />
                     <ButtonComponent color='#7E00C5' title='Harjoittele verbien merkityksiä' function={() => console.log('Harjoittele merkityksiä')} />
                     <ButtonComponent color='#7E00C5' title='Harjoittele verbien muotoja' function={() => console.log('Harjoittele muotoja')} />
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
    );
}

export default GermanStartScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d2d2d2',
  },
  contentContainer: {
     padding: 10
  },
  });
