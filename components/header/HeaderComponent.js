import React from 'react';

import {
   Button,
   Box,
   HStack,
   VStack,
   Text,
   ArrowBackIcon,
} from 'native-base';

import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/styles';

const HeaderComponent = (props) => {
   const navigation = useNavigation();

   return (
      <Box safeAreaTop>
      <HStack
         //iosBarStyle="light-content"
         //androidStatusBarColor="#0047c5"
         style={styles(props).headerStyle}
      >
         <VStack style={styles(props).flexOne}>
            {!props.noArrow ? (
               <Button transparent onPress={() => navigation.goBack()}>
                  <ArrowBackIcon
                     style={styles(props).buttonTextStyle}
                  />
               </Button>
            ) : null}
         </VStack>
         <VStack>
            <Box style={styles(props).headerBodyStyle}>
               <Text style={styles(props).buttonTextStyle}>
                  {props.title}
               </Text>
            </Box>
         </VStack>
         <VStack style={styles(props).flexOne}>
            <Text
               style={styles(props).buttonTextStyle}
               onPress={() => navigation.navigate('Omat asetukseni')}
            >
               {props.language === 1 && 'SV, taso '}
               {props.language === 2 && 'DE, taso '}
               {props.level}
            </Text>
         </VStack>
      </HStack>
      </Box>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   level: state.settings.level,
});

export default connect(mapStateToProps)(HeaderComponent);
