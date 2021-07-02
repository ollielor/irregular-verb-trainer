import React from 'react';
import { Footer, FooterTab } from 'native-base';

import FooterButtonComponent from './FooterButtonComponent';

import { useNavigation } from '@react-navigation/native';

const FooterComponent = (props) => {
   const navigation = useNavigation();

   return (
      <Footer style={{ backgroundColor: '#0047c5', display: 'absolute', bottom: 0 }}>
         <FooterTab>
            <FooterButtonComponent
               title="Asetukset"
               function={() => navigation.navigate('Omat asetukseni')}
            />
         </FooterTab>
         <FooterTab>
            <FooterButtonComponent
               title="Tulokset"
               function={() => navigation.navigate('Omat tulokseni')}
            />
         </FooterTab>
         <FooterTab>
            <FooterButtonComponent
               title="Ohjeet"
               function={() => console.log('Ohjeet')}
            />
         </FooterTab>
      </Footer>
   );
};

export default FooterComponent;
