import React from 'react';
import { HStack, Center } from 'native-base';

import FooterButtonComponent from './FooterButtonComponent';

import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/styles';

const FooterComponent = (props) => {
   const navigation = useNavigation();

   return (
      <Center>
         <HStack style={styles(props).footerStyle}>
               <FooterButtonComponent
                  title="Asetukset"
                  function={() => navigation.navigate('Omat asetukseni')}
               />
               <FooterButtonComponent
                  title="Tulokset"
                  function={() => navigation.navigate('Omat tulokseni')}
               />
               <FooterButtonComponent
                  title="Ohjeet"
                  function={() => navigation.navigate('Ohjeet')}
               />
         </HStack>
      </Center>
   );
};

export default FooterComponent;
