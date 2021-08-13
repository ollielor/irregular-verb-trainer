import React from 'react';

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
import { styles } from '../../styles/styles';

const HeaderComponent = (props) => {
   const navigation = useNavigation();

   return (
      <Header
         iosBarStyle="light-content"
         androidStatusBarColor="#0047c5"
         style={styles(props).headerStyle}
      >
         <Left style={styles(props).flexOne}>
            {!props.noArrow ? (
               <Button transparent onPress={() => navigation.goBack()}>
                  <Icon
                     name="arrow-back"
                     style={styles(props).buttonTextStyle}
                  />
               </Button>
            ) : null}
         </Left>
         <Body style={styles(props).headerBodyStyle}>
            <Title style={styles(props).buttonTextStyle}>{props.title}</Title>
         </Body>
         <Right style={styles(props).flexOne}>
            <Text
               style={styles(props).buttonTextStyle}
               onPress={() => navigation.navigate('Omat asetukseni')}
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
