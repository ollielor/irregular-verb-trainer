import React, { forwardRef } from 'react';
import { Text, TextInput, StyleSheet, Platform } from 'react-native';

import { connect } from 'react-redux';

const InputComponentForms = forwardRef((props, ref) => {

   console.log('Props from InputComponentForms: ', props)

/*    const focusOnNextInput = (index) => {
      ref.current.focus();
   }
 */
   return (
      <>
         <Text style={styles.label}>
            {props.componentIndex}
            {
               props.tense === 'infinitive' ? 'Perusmuoto' :
               props.tense === 'present' ? 'Preesens' :
               props.tense === 'past' ? 'Imperfekti' :
               props.tense === 'presperf' && props.language === 1 ? 'Supiini (4. muoto)' :
               props.tense === 'presperf' && props.language === 2 && 'Perfekti'
            }
         </Text>
         <TextInput
            //autoFocus={props.currentComponentIndex === props.componentIndex ? true : false}
            ref={props.forwardedRef}
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
/*             onBlur={
               props.correct && props.tense === 'infinitive' ? props.focusOnNextInput(2) :
               props.correct && props.tense === 'present' ? props.focusOnNextInput(3) :
               props.correct && props.tense === 'past' ? props.focusOnNextInput(4) :
               props.correct && props.tense === 'presperf' && props.focusOnNextInput(1)
            } */
            //onBlur={}
/*             onBlur={
               props.correct && props.tense === 'infinitive' ?
               ref.current.focus() :
               props.correct && props.tense === 'present' ? 
               ref.current.focus() :
               props.correct && props.tense === 'past' &&
               ref.current.focus()
            } */
            placeholder={props.placeholder}
/*             onChangeText={
               props.tense === 'infinitive' ? (answer) => props.setAnswerInfinitive(answer) :
               props.tense === 'present' ? (answer) => props.setAnswerPresent(answer) :
               props.tense === 'past' ? (answer) => props.setAnswerPast(answer) :
               props.tense === 'presperf' ? (answer) => props.setAnswerPresPerf(answer) :
               ''
            } */
            onChangeText={props.onChangeText}
            editable={props.correct ? false : true}
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
            //value={props.value}
            onBlur={props.onBlur}
            blurOnSubmit={props.blurOnSubmit}
         />
      </>
   );
});

const mapStateToProps = (state) => ({
   language: state.settings.language
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(InputComponentForms);

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
