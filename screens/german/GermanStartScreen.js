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
import { useNavigation } from '@react-navigation/native';

import ButtonComponent from '../../components/ButtonComponent';
import FooterComponent from '../../components/FooterComponent';
import HeaderComponent from '../../components/HeaderComponent';

const GermanStartScreen = props => {

   const navigation = useNavigation();

    return (
            
               <Container style={styles.container}>
                  <HeaderComponent title='Saksa' goBack={navigation.goBack} />
                  <Content style={styles.contentContainer}>
                     <ButtonComponent color='#7E00C5' title='Selaa ja opettele verbejä' function={() => navigation.navigate('Selaa ja opettele (saksa)')} />
                     <ButtonComponent color='#7E00C5' title='Harjoittele verbien merkityksiä' function={() => navigation.navigate('Harjoittele merkityksiä (saksa)')} />
                     <ButtonComponent color='#7E00C5' title='Harjoittele verbien muotoja' function={() => console.log('Harjoittele muotoja')} />
                  </Content>
                  <FooterComponent />
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
