import React, { forwardRef } from 'react';
import { Text, TextInput, StyleSheet, Platform } from 'react-native';

import { connect } from 'react-redux';
import { styles } from '../../styles/styles';

import CorrectAnswerComponent from '../styling/CorrectAnswerComponent';

const InputComponentForms = forwardRef((props, ref) => {

   return (
      <>
         <Text style={styles(props).labelForms}>{props.label}</Text>
         <TextInput
            ref={props.forwardedRef}
            style={
               props.correct && Platform.OS === 'ios'
                  ? styles(props).formInputCorrectIOS
                  : !props.correct && !props.unanswered && Platform.OS === 'ios'
                  ? styles(props).formInputIncorrectIOS
                  : Platform.OS === 'ios' && props.finished && !props.correct
                  ? styles(props).formInputIncorrectIOS
                  : Platform.OS === 'ios' && props.unanswered
                  ? styles(props).formInputIOS
                  : styles(props).formInput
            }
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            editable={props.correct || props.finished ? false : true}
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
            onBlur={props.onBlur}
            blurOnSubmit={props.blurOnSubmit}
         />
         {props.finished && props.synonymousForms && !props.correct ? (
            <CorrectAnswerComponent
               form={props.synonymousForms[props.tense]}
               synonyms={true}
            />
         ) : (
            props.finished &&
            !props.synonymousForms &&
            !props.correct && (
               <CorrectAnswerComponent
                  form={props.verbForm[props.tense]}
                  synonyms={false}
               />
            )
         )}
      </>
   );
});

const mapStateToProps = (state) => ({
   language: state.settings.language,
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(
   InputComponentForms
);
