import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import {
   Body, 
   Card,
   CardItem,
   Content,
   Text,
} from 'native-base';

const CardComponentForms = props => {

    return (
         <Card>
            <CardItem>
               <Body>
                  <Text style={{color: '#7E00C5', fontWeight: 'bold'}}>
                     {props.verbForm.meaning}
                  </Text>
                  <TextInput
                     style={styles.formInput}
                     placeholder='Perusmuoto'
                     onChangeText={answer => props.evaluate(answer, props.verbForm.infinitive)}   
                  />
                  <TextInput
                     style={styles.formInput}
                     placeholder='Preesens (er/sie/es)'
                     onChangeText={answer => props.evaluate(answer, props.verbForm.present)}   
                  />
                  <TextInput
                     style={styles.formInput}
                     placeholder='Imperfekti (er/sie/es)'
                     onChangeText={answer => props.evaluate(answer, props.verbForm.past)}   
                  />
                  <TextInput
                     style={styles.formInput}
                     placeholder='Perfekti (er/sie/es)'
                     onChangeText={answer => props.evaluate(answer, props.verbForm.presperf)}   
                  />
               </Body>
            </CardItem>
         </Card>
    );
}

export default CardComponentForms;

const styles = StyleSheet.create({
   formInput: {
      fontSize: 16,
      marginTop: 15,
      borderBottomColor: 'blue',
      borderBottomWidth: 1,
      width: '100%'
   }
})
