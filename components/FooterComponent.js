import React from 'react';
import { StyleSheet } from 'react-native';
import { 
   Footer,
   FooterTab
} from 'native-base';

import FooterButtonComponent from '../components/FooterButtonComponent';

const FooterComponent = props => {

    return (
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
    );
}

export default FooterComponent;