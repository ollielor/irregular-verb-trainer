import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, Content } from 'native-base';

import ButtonComponent from '../buttons/ButtonComponent';

const SaveSettingsComponent = (props) => {
   return (
      <Content>
         <Body
                  style={{ flexDirection: 'row', justifyContent: 'center' }}
               >
                  <ButtonComponent
                     title="Tallenna asetukset"
                     color="#7E00C5"
                     function={props.saveSettings}
                  />
               </Body>
      </Content>
   );
};

export default SaveSettingsComponent;

const styles = StyleSheet.create({
   cardStyle: {
      borderWidth: 0,
   },
   cardItemStyle: {
      backgroundColor: '#ebebeb',
   },
});
