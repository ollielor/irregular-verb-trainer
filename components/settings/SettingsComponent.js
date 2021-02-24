import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, Card, CardItem, Content } from 'native-base';

import ButtonComponent from '../buttons/ButtonComponent';
import ButtonComponentNarrow from '../buttons/ButtonComponentNarrow';
import Heading from '../styling/Heading';
import Subheading from '../styling/Subheading';

import { connect } from 'react-redux';

import { updateLanguage, updateLevel } from '../../store/actions/settings';

const SettingsComponent = (props) => {
   return (
      <Content>
         <Body style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Subheading>Oletuskieli</Subheading>
         </Body>
         <Body style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <ButtonComponentNarrow
               title="Ruotsi"
               function={() => props.dispatch(updateLanguage(1))}
               disabled={props.language === 1}
            />
            <ButtonComponentNarrow
               title="Saksa"
               function={() => props.dispatch(updateLanguage(2))}
               disabled={props.language === 2}
            />
         </Body>
         <Body style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Subheading>Oletustaso</Subheading>
         </Body>
         <Body style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <ButtonComponentNarrow
               title="Taso 1"
               function={() => props.dispatch(updateLevel(1))}
               disabled={props.level === 1}
            />
            <ButtonComponentNarrow
               title="Taso 2"
               function={() => props.dispatch(updateLevel(2))}
               disabled={props.level === 2}
            />
            <ButtonComponentNarrow
               title="Taso 3"
               function={() => props.dispatch(updateLevel(3))}
               disabled={props.level === 3}
            />
         </Body>
      </Content>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   level: state.settings.level,
});

export default connect(mapStateToProps)(SettingsComponent);

const styles = StyleSheet.create({
   cardStyle: {
      borderColor: '#7E00C5',
   },
   cardItemStyle: {
      backgroundColor: '#ebebeb',
   },
});
