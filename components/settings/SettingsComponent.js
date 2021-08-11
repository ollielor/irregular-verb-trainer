import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, Card, CardItem, Content } from 'native-base';

import ButtonComponent from '../buttons/ButtonComponent';
import ButtonComponentNarrow from '../buttons/ButtonComponentNarrow';
import Heading from '../styling/Heading';
import Subheading from '../styling/Subheading';

const SettingsComponent = (props) => {
   return (
      <Content>
         <Body style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Subheading>Kielen valinta</Subheading>
         </Body>
         <Body style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <ButtonComponentNarrow
               title="Ruotsi"
               function={() => props.setLanguage(1)}
               disabled={props.language === 1}
            />
            <ButtonComponentNarrow
               title="Saksa"
               function={() => props.setLanguage(2)}
               disabled={props.language === 2}
            />
         </Body>
         <Body style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Subheading>Vaikeustason valinta</Subheading>
         </Body>
         <Body style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <ButtonComponentNarrow
               title="Taso 1"
               function={() => props.setLevel(1)}
               disabled={props.level === 1}
            />
            <ButtonComponentNarrow
               title="Taso 2"
               function={() => props.setLevel(2)}
               disabled={props.level === 2}
            />
            <ButtonComponentNarrow
               title="Taso 3"
               function={() => props.setLevel(3)}
               disabled={props.level === 3}
            />
         </Body>
      </Content>
   );
};

export default SettingsComponent;

const styles = StyleSheet.create({
   cardStyle: {
      borderColor: '#7E00C5',
   },
   cardItemStyle: {
      backgroundColor: '#ebebeb',
   },
});
