import React from 'react';
import { HStack, QuestionOutlineIcon, Center, Stack, Text, Button } from 'native-base';

import FooterButtonComponent from './FooterButtonComponent';

import { useNavigation, useRoute } from '@react-navigation/native';

import { styles } from '../../styles/styles'; 

const FooterComponent = (props) => {

   const navigation = useNavigation();

   const route = useRoute();

   const routeNames = [
      {
         name: 'Aloitus',
         screenName: 'Aloitus'
      },
      {
         name: 'Asetukset',
         screenName: 'Omat asetukseni'
      },
      {
         name: 'Tulokset',
         screenName: 'Omat tulokseni'
      },
      {
         name: 'Ohjeet',
         screenName: 'Ohjeet'
      }
   ];

   const navigateTo = (dest) => {
      props.setDestination(dest);
      props.setAlertOpen(true);
   }

   return (
      <>
         <Stack safeAreaBottom bg='#0047c5' justifyContent='space-evenly' direction='row' pl='2' pr='2' h='6%'>
            {console.log(props)}
            {routeNames.map((routeName, index) => routeName.screenName === 'Ohjeet' ? (
                        <HStack key={index}>
                        <Button 
                           colorScheme=''
                           onPress={props.settingsChanged ? () =>  navigateTo(routeName.screenName) : () => navigation.navigate(routeName.screenName)}
                           bg={routeName.screenName === route.name ? '#7E00C5' : 'transparent'}
                        >
                        <Center>
                           <QuestionOutlineIcon 
                              size='6'
                              color='#d2d2d2'
                           />
                        </Center>
                        </Button>
                     </HStack>
                     ) : (
               <HStack key={index}>
               <FooterButtonComponent
                  title={routeName.name}
                  function={props.settingsChanged ? () =>  navigateTo(routeName.screenName) : () => navigation.navigate(routeName.screenName)}
                  disabled={routeName.screenName === route.name ? true : false}
               />
               <Text>{props.destination}</Text>
               </HStack>
            ))}         
         </Stack>
      </>
   );
};

export default FooterComponent;
