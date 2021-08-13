import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, Content } from 'native-base';

import ButtonComponent from '../buttons/ButtonComponent';

import { styles } from '../../styles/styles';

const SaveSettingsComponent = (props) => {
   return (
      <Content>
         <Body style={styles(props).settingsBodyStyle}>
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
