import React from 'react';
import { Box, HStack, Center, Stack } from 'native-base';

import FooterButtonComponent from './FooterButtonComponent';

import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/styles';

const FooterComponent = (props) => {
   const navigation = useNavigation();

   return (
      // <Box safeAreaTop bg='#0047c5' style={styles(props).footerBox}>
         <Stack safeAreaBottom bg='#0047c5' justifyContent='space-evenly' direction='row' p='2'>
         <HStack>
               <FooterButtonComponent
                  title="Asetukset"
                  function={() => navigation.navigate('Omat asetukseni')}
               />
         </HStack>
         <HStack>
               <FooterButtonComponent
                  title="Tulokset"
                  function={() => navigation.navigate('Omat tulokseni')}
               />
         </HStack>
         <HStack>
               <FooterButtonComponent
                  title="Ohjeet"
                  function={() => navigation.navigate('Ohjeet')}
               />
         </HStack>
         </Stack>
      // </Box>
   );
};

export default FooterComponent;
