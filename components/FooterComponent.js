import React from 'react';
import { 
   Footer,
   FooterTab
} from 'native-base';

import FooterButtonComponent from '../components/FooterButtonComponent';

import { useNavigation } from '@react-navigation/native';

const FooterComponent = props => {

   const navigation = useNavigation();

    return (
                  <Footer style={{backgroundColor: '#4E00C5'}}>
                     <FooterTab>
                        <FooterButtonComponent title='Koti' function={() => console.log('Koti')} />
                     </FooterTab>
                     <FooterTab>
                        <FooterButtonComponent title='Tulokset' function={() => navigation.navigate('Omat tulokseni (saksa)')} />
                     </FooterTab>
                     <FooterTab>
                        <FooterButtonComponent title='Asetukset' function={() => console.log('Asetukset')} />
                     </FooterTab>
                  </Footer>
    );
}

export default FooterComponent;