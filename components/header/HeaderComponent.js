import React from 'react';

import {
   StatusBar,
   Box,
   HStack,
   Stack,
   Text,
   ArrowBackIcon,
} from 'native-base';

import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/styles';

const HeaderComponent = (props) => {
   const navigation = useNavigation();

   return (
      <>
      <StatusBar
         //iosBarStyle="light-content"
         //androidStatusBarColor="#0047c5"
         barStyle='light-content'
         backgroundColor='#0047c5'
      />
      <Box safeAreaTop bg="#0047c5" style={styles(props).headerBoxStyle}>
      <Stack bg="#0047c5" justifyContent='space-between' direction='row'>
      <HStack>
         {!props.noArrow ? (
                  <ArrowBackIcon
                     onPress={navigation.goBack}
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
      <HStack>
      <Text
               style={styles(props).buttonTextStyle}
               onPress={() => navigation.navigate('Omat asetukseni')}
            >
               {props.language === 1 && 'SV, taso '}
               {props.language === 2 && 'DE, taso '}
               {props.level}
            </Text>
      </HStack>
      </Stack>
      </Box>
     {/*  <HStack justifyContent='space-between' alignItems='center'> */}
{/*          <HStack alignItems='center'>
            {!props.noArrow ? (
               <Button transparent onPress={() => navigation.goBack()}>
                  <ArrowBackIcon
                     style={styles(props).buttonTextStyle}
                  />
               </Button>
            ) : null}
         </HStack>
         <HStack alignItems='center'>
            <Box style={styles(props).headerBodyStyle}>

            </Box>
         </HStack>
         <HStack alignItems='center'>

         </HStack> */}

{/*       </HStack> */}
      </>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   level: state.settings.level,
});

export default connect(mapStateToProps)(HeaderComponent);
