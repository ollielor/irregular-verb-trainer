import React from 'react';

import {
   Box,
   HStack,
   Stack,
   Text,
   ArrowBackIcon,
   StatusBar,
} from 'native-base';

import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/styles';

const HeaderComponent = (props) => {
   const navigation = useNavigation();

   const navigateTo = (dest) => {
      props.setDestination(dest);
      props.setAlertOpen(true);
   }

   return (
      <>
         <Box safeAreaTop bg="#0047c5">
            <StatusBar color='#fff' backgroundColor='#0047c5' barStyle='light-content' />
            <Stack bg="#0047c5" alignItems='flex-end' justifyContent='space-between' direction='row' w='100%'>
               <HStack p='2'>
                  {!props.noArrow ? (
                     <ArrowBackIcon
                        onPress={props.settingsChanged ? () => navigateTo('Aloitus') : () => props.goBack()}
                        style={styles(props).buttonTextStyle}
                        size='6'
                     />
                  ) : null}
                  {props.noArrow ?
                     <Text style={styles(props).headerTitleStyle}>
                        {props.title}
                     </Text>
                     :
                     <Text style={styles(props).headerTitleStyle} pl='8'>
                        {props.title}
                     </Text>
                  }
               </HStack>
               <HStack p='2'>
                  <Text
                     style={styles(props).buttonTextStyle}
                     onPress={props.settingsChanged ? () => navigateTo(routeName.screenName) : () => navigation.navigate(routeName.screenName)}
                  >
                     {props.language === 1 && 'SV, '}
                     {props.language === 2 && 'DE, '}
                     {props.level !== 4 ? ` taso ${props.level}` : 'omat verbit'} 
                  </Text>
               </HStack>
            </Stack>
         </Box>
      </>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   level: state.settings.level,
});

export default connect(mapStateToProps)(HeaderComponent);
