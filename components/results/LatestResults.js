import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Content, Text } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { connect } from 'react-redux';

import Heading from '../styling/Heading';
import CardComponentResults from '../cards/CardComponentResults';

const LatestResults = (props) => {
   const navigation = useNavigation();

   console.log(props.results)

   return (
      <Content>
         <Heading>{props.count} viimeisintä tulosta {props.language === 1 ? '(ruotsi)' : '(saksa)'}</Heading>
         {props.results.length === 0 &&
            <Text style={styles.text}>Sinulla ei ole vielä suorituksia.</Text>
         }         
         {props.results &&
            props.results
               .filter((historyItem) => historyItem.language === props.language)
               .sort((a, b) =>
                  a.datetime < b.datetime ? 1 : a.datetime > b.datetime ? -1 : 0
               )
               .slice(0, props.count)
               .map((historyItem, index) => (
                  <CardComponentResults historyItem={historyItem} key={index} showTypes={props.showTypes} />
               ))
         }
         {!props.hideButton && (
            <Button
               onPress={() => navigation.navigate('Omat tulokseni')}
               style={styles.historyButton}
            >
               {props.results.length > 0 && <Text uppercase={false}>Näytä koko historia</Text>}
            </Button>
         )}
      </Content>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   results: state.results.results
});

export default connect(mapStateToProps)(LatestResults);

const styles = StyleSheet.create({
   header: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24,
      color: '#4E00C5',
      marginTop: 20,
   },
   historyButton: {
      backgroundColor: '#4E00C5',
      alignSelf: 'center',
      marginTop: 20,
      marginBottom: 20,
   },
   text: {
      textAlign: 'center'
   }
});
