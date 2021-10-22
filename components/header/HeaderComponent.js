import React from 'react';

import {
   Center,
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

      />
      <Box safeAreaTop bg="#0047c5" />
      <Stack bg="#0047c5" justifyContent='space-between' alignItems='center' direction='row'>
      <HStack alignItems='center'>
         <Text>
            Vasen
         </Text>
      </HStack>
      <HStack>
         <Text>
            Oikea
         </Text>
      </HStack>
      </Stack>
     {/*  <VStack justifyContent='space-between' alignItems='center'> */}
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
               <Text style={styles(props).buttonTextStyle}>
                  {props.title}
               </Text>
            </Box>
         </HStack>
         <HStack alignItems='center'>
            <Text
               style={styles(props).buttonTextStyle}
               onPress={() => navigation.navigate('Omat asetukseni')}
            >
               {props.language === 1 && 'SV, taso '}
               {props.language === 2 && 'DE, taso '}
               {props.level}
            </Text>
         </HStack> */}

{/*       </VStack> */}
      </>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   level: state.settings.level,
});

export default connect(mapStateToProps)(HeaderComponent);
