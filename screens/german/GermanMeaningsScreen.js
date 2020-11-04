import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { 
   Container,
   Content,
   Text
} from 'native-base';

import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import { useNavigation } from '@react-navigation/native';

import FooterComponent from '../../components/FooterComponent';
import HeaderComponent from '../../components/HeaderComponent';
import MeaningCardComponent from '../../components/MeaningCardComponent';

const GermanMeaningsScreen = props => {

   const [dbOpened, setDbOpened] = useState(false);
   const [verbs, setVerbs] = useState([]);
   const [randomVerbs, setRandomVerbs] = useState([])
   const [verbsIntermediate, setVerbsIntermediate] = useState([]);
   const [verbsDifficult, setVerbsDifficult] = useState([]);
   const [verbsLoaded, setVerbsLoaded] = useState(false);
   const [level, setLevel] = useState(1);
   const [randomizedVerbs, setRandomizedVerbs] = useState([]);
   const [rndVerbsLoaded, setRndVerbsLoaded] = useState(false);
   const [points, setPoints] = useState(0);
   const [timePoints, setTimePoints] = useState(60);
   
   const navigation = useNavigation();

   FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/verbs_german.db`)
   .then(result => {
   if (result.exists) {
      const db = SQLite.openDatabase('verbs_german.db');
   } else {
   FileSystem.downloadAsync(
      Asset.fromModule(require('../../assets/verbs_german.db')).uri,
      `${FileSystem.documentDirectory}SQLite/verbs_german.db`
   )}
   });

   const loadVerbs = () => {
      const db = SQLite.openDatabase('verbs_german.db');

      let query;

      switch (level) {
         case 1:
            query = 'select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id where level=1;';
            break;
         case 2:
            query = 'select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id where level=2;'; 
            break;
         case 3: 
            query = 'select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id where level=3;'; 
            break;
         case 4:
            query = 'select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id;'; 
            break;
      }

      db.transaction(
         tx => {
            tx.executeSql(
               query, 
               [],
               (tx, results) => {
                  setVerbs(results.rows._array);
                  setVerbsLoaded(true);
               },
               (tx, error) => {
                  console.log('Could not execute query: ', error);
               }
            );
         },
         error => {
            console.log('Transaction error: ', error);
         },
      );
   }

   const rndIntGenerator = () => {
      return Math.floor(Math.random() * verbs.length);
   }

   const getRandomVerb = rndInt => {
      return verbs.filter(verb => verb.verb_id === rndInt)[0];
   }

   useEffect(() => {
      setLevel(1);
      loadVerbs();
      if (verbsLoaded) {
         let rndVerb; 
         let rndVerbs = [];
         let rndVerbsFinal = [];
         while (rndVerbsFinal.length <= 14) {
            const rndInt = rndIntGenerator();
            rndVerb = getRandomVerb(rndInt);
            if (rndVerb !== undefined) {
               rndVerbs.push(rndVerb);
            }
            if (rndVerb !== undefined && rndVerbs.length > 1) {
               rndVerbsFinal = rndVerbs.filter((verb, index, self) => index === self.findIndex((v) => (
                  v.verb_id === verb.verb_id
               ))
               )
            }
         }
         console.log(rndVerbsFinal);
         let rndVerbsThree = [];
         let verbObject = {};
         let verbObjectArray = [];
         for (let i=0; i <= 2; i++) {
            rndVerbsThree.push(rndVerbsFinal[i]);
         }
         verbObjectArray.push(rndVerbsThree);
         rndVerbsThree = [];
         for (let i=3; i <= 5; i++) {
            rndVerbsThree.push(rndVerbsFinal[i]);
         }
         verbObjectArray.push(rndVerbsThree);
         rndVerbsThree = [];
         for (let i=6; i <= 8; i++) {
            rndVerbsThree.push(rndVerbsFinal[i]);
         }
         verbObjectArray.push(rndVerbsThree);
         rndVerbsThree = [];
         for (let i=9; i <= 11; i++) {
            rndVerbsThree.push(rndVerbsFinal[i]);
         }
         verbObjectArray.push(rndVerbsThree);
         rndVerbsThree = [];
         for (let i=12; i < rndVerbsFinal.length; i++) {
            rndVerbsThree.push(rndVerbsFinal[i]);
         }
         verbObjectArray.push(rndVerbsThree);
         rndVerbsThree = [];
         console.log(verbObjectArray)
         console.log(verbObjectArray.length)
         console.log(Object.keys(verbObjectArray));
         setRandomizedVerbs(verbObjectArray);
         setRndVerbsLoaded(true);
      }
   }, [verbsLoaded]);

   useEffect(() => {
      let counter = 60;
      let countdown = setInterval(() => {
         if (counter > 0) {
            counter--;
            console.log(counter);
            setTimePoints(counter);
         } else {
            clearInterval(countdown);
         }
      }, 1000);
   }, [rndVerbsLoaded]);

    return (
      <Container style={styles.container}>
         <HeaderComponent title='Verbien merkityksiä' goBack={navigation.goBack} />
            <Content>
               {!randomizedVerbs && 
                  <Text>
                     Arvotaan verbejä
                  </Text>
               }
               {randomizedVerbs &&
                  randomizedVerbs.map((verbGroup, index) => 
                  <MeaningCardComponent key={index} alternatives={verbGroup} points={points} setPoints={setPoints} />
                  )
               }
               <Text>
                  Pistemääräsi: {points} Aikapisteet: {timePoints}
               </Text>
            </Content>
         <FooterComponent />
      </Container>
    );
}

export default GermanMeaningsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d2d2d2',
  },
  contentContainer: {
     padding: 10
  },
  });
