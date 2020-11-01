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
import CardComponent from '../../components/CardComponent';
import HeadingVerbList from '../../components/HeadingVerbList';

const GermanMeaningsScreen = props => {

   const [dbOpened, setDbOpened] = useState(false);
   const [verbs, setVerbs] = useState([]);
   const [randomVerbs, setRandomVerbs] = useState([])
   const [verbsIntermediate, setVerbsIntermediate] = useState([]);
   const [verbsDifficult, setVerbsDifficult] = useState([]);
   const [verbsLoaded, setVerbsLoaded] = useState(false);
   const [level, setLevel] = useState(1);
   
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
         while (rndVerbsFinal.length <= 4) {
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
            if (rndVerbsFinal.length > 5) {
               break;
            }
         }
         console.log(rndVerbsFinal.map(verb => verb.verb_id));
         console.log(rndVerbsFinal.length);
      }
   }, [verbsLoaded])

  const randoms = (c, l, h) => {
      let count = c,
          min = l,
          max = h,
          nums = {},
          out = [],
          r = 0,
          len = 0;
  
      if (max - min < count) count = max - min;
      
      const getRand = () => {
          return Math.floor(Math.random() * (max - min) + min);
      },  check = (a) => {
          return nums[a];
      },  add = (a) => {
          nums[a] = 1;
          out.push(a);
          len++;
      };
  
      const init = () => {
          while(len < count){
              if (len == 0) r = getRand();
              else while (check(r = getRand()));
              add(r);
          }
         };
          // }();
  
      this.get = () => {
          return out;
      };
  }

 

    return (
      <Container style={styles.container}>
         <HeaderComponent title='Verbien merkityksiä' goBack={navigation.goBack} />
            <Content>
               
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
