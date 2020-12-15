import React from 'react';
import { StatusBar, Platform } from 'react-native';
import {
   Button,
   Body,
   Left,
   Right,
   Header,
   Text,
   Title,
   Icon,
} from 'native-base';

import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const HeaderComponent = (props) => {
   const navigation = useNavigation();

   return (
      <Header
         iosBarStyle="light-content"
         androidStatusBarColor="#0047c5"
         style={{ backgroundColor: '#0047c5' }}
      >
         <Left style={{ flex: 1 }}>
            {!props.noArrow ? (
               <Button transparent onPress={props.goBack}>
                  <Icon name="arrow-back" style={{ color: '#D2D2D2' }} />
               </Button>
            ) : null}
         </Left>
         <Body style={{ flex: 2, alignItems: 'center' }}>
            <Title style={{ color: '#D2D2D2' }}>{props.title}</Title>
         </Body>
         <Right style={{ flex: 1 }}>
            <Text
               style={{ color: '#d2d2d2' }}
               onPress={() => navigation.navigate('Koti')}
            >
               {props.language === 1 && 'SV, taso '}
               {props.language === 2 && 'DE, taso '}
               {props.level}
            </Text>
         </Right>
      </Header>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   level: state.settings.level,
});

export default connect(mapStateToProps)(HeaderComponent);
