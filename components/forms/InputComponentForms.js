import React from 'react';
import { Text, TextInput, StyleSheet, Platform } from 'react-native';

const InputComponentForms = React.forwardRef((props, ref) => {

   console.log('Props from InputComponentForms: ', props)

   return (
      <>
         <Text style={styles.label}>{props.label}</Text>
         <TextInput
            style={
               props.correct && Platform.OS === 'ios'
                  ? styles.formInputCorrectIOS
                  : !props.correct && !props.unanswered && Platform.OS === 'ios'
                  ? styles.formInputIncorrectIOS
                  : Platform.OS === 'ios' && props.finished && !props.correct
                  ? styles.formInputIncorrectIOS
                  : Platform.OS === 'ios' && props.unanswered
                  ? styles.formInputIOS
                  : styles.formInput
            }
            ref={ref}
            onBlur={props.onBlur}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            editable={props.editable}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={
               Platform.OS === 'android' ? 'visible-password' : 'default'
            }
            placeholderTextColor={props.placeholderTextColor}
            underlineColorAndroid={
               props.correct
                  ? '#66dd33'
                  : !props.correct && !props.unanswered
                  ? '#ff0033'
                  : !props.correct && props.unanswered && props.finished
                  ? '#ff0033'
                  : '#7E00C5'
            }
            value={props.value}
         />
      </>
   );
});

export default InputComponentForms;

const styles = StyleSheet.create({
   label: {
      marginTop: 15,
   },
   formInput: {
      fontSize: 16,
      padding: 10,
      width: '100%',
   },
   formInputIOS: {
      fontSize: 16,
      padding: 10,
      borderColor: '#7E00C5',
      borderWidth: 1,
      width: '100%',
   },
   formInputCorrectIOS: {
      fontSize: 16,
      fontWeight: 'bold',
      padding: 10,
      backgroundColor: '#66dd33',
      borderColor: '#7E00C5',
      color: 'black',
      color: '#7E00C5',
      width: '100%',
   },
   formInputIncorrectIOS: {
      fontSize: 16,
      padding: 10,
      backgroundColor: '#ff0033',
      borderColor: '#7E00C5',
      color: 'white',
      width: '100%',
   },
});
