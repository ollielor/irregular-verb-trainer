import React from 'react';
import { Footer, FooterTab } from 'native-base';

import FooterButtonComponent from './FooterButtonComponent';

import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/styles';

const FooterComponent = (props) => {
   const navigation = useNavigation();

   return (
      <Footer style={styles(props).footerStyle}>
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
               function={() => navigation.navigate('Ohjeet')}
            />
         </FooterTab>
      </Footer>
   );
};

export default FooterComponent;
