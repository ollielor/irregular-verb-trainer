import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, Content } from 'native-base';

import ButtonComponentNarrow from '../buttons/ButtonComponentNarrow';
import Subheading from '../styling/Subheading';

import { styles } from '../../styles/styles';

const SettingsComponent = (props) => {
   return (
      <Content>
         <Body style={styles(props).settingsBodyStyle}>
            <Subheading>Kielen valinta</Subheading>
         </Body>
         <Body style={styles(props).settingsBodyStyle}>
            <ButtonComponentNarrow
               title="Ruotsi"
               function={() => props.setLanguage(1)}
               disabled={props.language === 1}
               withMargin
            />
            <ButtonComponentNarrow
               title="Saksa"
               function={() => props.setLanguage(2)}
               disabled={props.language === 2}
               withMargin
            />
         </Body>
         <Body style={styles(props).settingsBodyStyle}>
            <Subheading>Vaikeustason valinta</Subheading>
         </Body>
         <Body style={styles(props).settingsBodyStyle}>
            <ButtonComponentNarrow
               title="Taso 1"
               function={() => props.setLevel(1)}
               disabled={props.level === 1}
               withMargin
            />
            <ButtonComponentNarrow
               title="Taso 2"
               function={() => props.setLevel(2)}
               disabled={props.level === 2}
               withMargin
            />
            <ButtonComponentNarrow
               title="Taso 3"
               function={() => props.setLevel(3)}
               disabled={props.level === 3}
               withMargin
            />
         </Body>
      </Content>
   );
};

export default SettingsComponent;
