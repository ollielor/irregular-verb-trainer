import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, TextInput, Platform } from 'react-native'
import { Body, Card, CardItem, Spinner, Text } from 'native-base'
import CorrectAnswerComponent from './CorrectAnswerComponent'
import { connect } from 'react-redux'

const CardComponentForms = (props) => {
   const [correctInfinitive, setCorrectInfinitive] = useState(false)
   const [correctPresent, setCorrectPresent] = useState(false)
   const [correctPast, setCorrectPast] = useState(false)
   const [correctPresPerf, setCorrectPresPerf] = useState(false)
   const [incorrectInfinitive, setIncorrectInfinitive] = useState(false)
   const [incorrectPresent, setIncorrectPresent] = useState(false)
   const [incorrectPast, setIncorrectPast] = useState(false)
   const [incorrectPresPerf, setIncorrectPresPerf] = useState(false)
   const [answerInfinitive, setAnswerInfinitive] = useState('')
   const [answerPresent, setAnswerPresent] = useState('')
   const [answerPast, setAnswerPast] = useState('')
   const [answerPresPerf, setAnswerPresPerf] = useState('')
   const [synonymousForms, setSynonymousForms] = useState({
      infinitive: [],
      present: [],
      past: [],
      presPerf: [],
   })

   console.log('props from CardComponentForms: ', props)

   useEffect(() => {
      // Create arrays of synonymous forms for each tense
      if (props.synonyms) {
         const infinitiveSynonyms = props.verbForm.map(
            (verbForm) => verbForm.infinitive
         )
         const presentSynonyms = props.verbForm.map(
            (verbForm) => verbForm.present
         )
         const pastSynonyms = props.verbForm.map((verbForm) => verbForm.past)
         const presPerfSynonyms = props.verbForm.map(
            (verbForm) => verbForm.presperf
         )
         setSynonymousForms({
            infinitive: infinitiveSynonyms,
            present: presentSynonyms,
            past: pastSynonyms,
            presPerf: presPerfSynonyms,
         })
         console.log('SynonymousForms: ', synonymousForms)
      }
   }, [])

   useEffect(() => {
      // Focus on the first input of each card element
      if (props.answeredIndex === props.index) {
         props.infinitive ? inputRef1.current.focus() :
         props.present ? inputRef2.current.focus() :
         props.past ? inputRef3.current.focus() :
         inputRef4.current.focus()
      }
   }, [props.answeredIndex, props.index])

   useEffect(() => {
      if (props.started) {
         inputRef1.current.clear()
         inputRef2.current.clear()
         inputRef3.current.clear()
         inputRef4.current.clear()
      }
   }, [props.started])

   // The following useEffects are for checking the answer with evaluate function which is located in GermanFormsScreen
   // If the evaluate function returns true, the state of each form is set to true
   // Inputs are styled according to these states

   useEffect(() => {
      if (props.synonyms && synonymousForms) {
         if (
            props.evaluate(
               answerInfinitive,
               synonymousForms.infinitive,
               'infinitive'
            )
         ) {
            setCorrectInfinitive(true)
         }
      } else {
         if (
            props.evaluate(
               answerInfinitive,
               props.verbForm.infinitive,
               'infinitive'
            )
         ) {
            setCorrectInfinitive(true)
         }
      }
   }, [props.synonyms, synonymousForms, answerInfinitive])

   useEffect(() => {
      if (props.synonyms && synonymousForms) {
         if (
            props.evaluate(
               answerPresent,
               synonymousForms.present,
               'present',
               props.index
            )
         ) {
            setCorrectPresent(true)
         }
      } else {
         if (
            props.evaluate(
               answerPresent,
               props.verbForm.present,
               'present',
               props.index
            )
         ) {
            setCorrectPresent(true)
         }
      }
   }, [props.synonyms, synonymousForms, answerPresent])

   useEffect(() => {
      if (props.synonyms && synonymousForms) {
         if (
            props.evaluate(
               answerPast,
               synonymousForms.past,
               'past',
               props.index
            )
         ) {
            setCorrectPast(true)
         }
      } else {
         if (
            props.evaluate(
               answerPast,
               props.verbForm.past,
               'past',
               props.index
            )
         ) {
            setCorrectPast(true)
         }
      }
   }, [props.synonyms, synonymousForms, answerPast])

   useEffect(() => {
      if (props.synonyms && synonymousForms) {
         if (
            props.evaluate(
               answerPresPerf,
               synonymousForms.presPerf,
               'presperf',
               props.index
            )
         ) {
            setCorrectPresPerf(true)
         }
      } else {
         if (
            props.evaluate(
               answerPresPerf,
               props.verbForm.presperf,
               'presperf',
               props.index
            )
         ) {
            setCorrectPresPerf(true)
         }
      }
   }, [props.synonyms, synonymousForms, answerPresPerf])

   const inputRef1 = useRef()
   const inputRef2 = useRef()
   const inputRef3 = useRef()
   const inputRef4 = useRef()

   console.log(props.answeredIndex)

   return (
      <>
      {props.verbForm ?
      <Card>
         <CardItem style={{backgroundColor: '#e8e8e8'}}>
            <Body>
            <Text
                  style={{
                     color: '#7E00C5',
                     fontWeight: 'bold',
                     fontSize: 16,
                     marginTop: 22,
                  }}
               >
                  {props.synonyms
                     ? props.verbForm[0].meaning
                     : props.verbForm.meaning}
               </Text>
               {props.infinitive &&
               <>
               <TextInput
                  style={
                     answerInfinitive &&
                     correctInfinitive &&
                     Platform.OS === 'ios'
                        ? styles.formInputCorrectIOS
                        : answerInfinitive &&
                          !correctInfinitive &&
                          Platform.OS === 'ios'
                        ? styles.formInputIncorrectIOS
                        : Platform.OS === 'ios'
                        ? styles.formInputIOS
                        : styles.formInput
                  }
                  ref={inputRef1}
                  onBlur={() => correctInfinitive && inputRef2.current.focus()}
                  placeholder="Perusmuoto"
                  onChangeText={(answer) => setAnswerInfinitive(answer)}
                  editable={correctInfinitive || props.finished ? false : true}
                  placeholderTextColor={
                     Platform.OS === 'ios' && incorrectInfinitive
                        ? 'white'
                        : 'grey'
                  }
                  autoCompleteType="off"
                  autoCorrect={false}
                  autoCapitalize="none"
                  underlineColorAndroid={
                     correctInfinitive
                        ? '#66dd33'
                        : props.finished && !correctInfinitive
                        ? '#ff0033'
                        : '#7E00C5'
                  }
               />

               {props.finished && props.synonyms && !correctInfinitive ? (
                  <CorrectAnswerComponent
                     form={synonymousForms.infinitive}
                     synonyms={true}
                  />
               ) : (
                  props.finished &&
                  !props.synonyms &&
                  !correctInfinitive && (
                     <CorrectAnswerComponent
                        form={props.verbForm.infinitive}
                        synonyms={false}
                     />
                  )
               )}
               </>
               }
               {props.present &&
               <>
               <TextInput
                  style={
                     correctPresent && Platform.OS === 'ios'
                        ? styles.formInputCorrectIOS
                        : incorrectPresent && Platform.OS === 'ios'
                        ? styles.formInputIncorrectIOS
                        : Platform.OS === 'ios'
                        ? styles.formInputIOS
                        : styles.formInput
                  }
                  placeholder="Preesens (er/sie/es)"
                  ref={inputRef2}
                  onBlur={() => correctPresent && inputRef3.current.focus()}
                  onChangeText={(answer) => setAnswerPresent(answer)}
                  editable={correctPresent || props.finished ? false : true}
                  placeholderTextColor={
                     Platform.OS === 'ios' && incorrectPresent
                        ? 'white'
                        : 'grey'
                  }
                  autoCompleteType="off"
                  autoCorrect={false}
                  autoCapitalize="none"
                  underlineColorAndroid={
                     correctPresent
                        ? '#66dd33'
                        : props.finished && !correctPresent
                        ? '#ff0033'
                        : '#7E00C5'
                  }
               />
               {props.finished && props.synonyms && !correctPresent ? (
                  <CorrectAnswerComponent
                     form={synonymousForms.present}
                     synonyms={true}
                  />
               ) : (
                  props.finished &&
                  !props.synonyms &&
                  !correctPresent && (
                     <CorrectAnswerComponent
                        form={props.verbForm.present}
                        synonyms={false}
                     />
                  )
               )}
               </>
               }
               {props.past &&
               <>
               <TextInput
                  style={
                     correctPast && Platform.OS === 'ios'
                        ? styles.formInputCorrectIOS
                        : incorrectPast && Platform.OS === 'ios'
                        ? styles.formInputIncorrectIOS
                        : Platform.OS === 'ios'
                        ? styles.formInputIOS
                        : styles.formInput
                  }
                  placeholder="Imperfekti (er/sie/es)"
                  ref={inputRef3}
                  onBlur={() => correctPast && inputRef4.current.focus()}
                  onChangeText={(answer) => setAnswerPast(answer)}
                  editable={correctPast || props.finished ? false : true}
                  placeholderTextColor={
                     Platform.OS === 'ios' && incorrectPast ? 'white' : 'grey'
                  }
                  autoCompleteType="off"
                  autoCorrect={false}
                  autoCapitalize="none"
                  underlineColorAndroid={
                     correctPast
                        ? '#66dd33'
                        : props.finished && !correctPast
                        ? '#ff0033'
                        : '#7E00C5'
                  }
               />
               {props.finished && props.synonyms && !correctPast ? (
                  <CorrectAnswerComponent
                     form={synonymousForms.past}
                     synonyms={true}
                  />
               ) : (
                  props.finished &&
                  !props.synonyms &&
                  !correctPast && (
                     <CorrectAnswerComponent
                        form={props.verbForm.past}
                        synonyms={false}
                     />
                  )
               )}
               </>}
               {props.presperf &&
               <>
               <TextInput
                  style={
                     correctPresPerf && Platform.OS === 'ios'
                        ? styles.formInputCorrectIOS
                        : incorrectPresPerf && Platform.OS === 'ios'
                        ? styles.formInputIncorrectIOS
                        : Platform.OS === 'ios'
                        ? styles.formInputIOS
                        : styles.formInput
                  }
                  placeholder="Perfekti (er/sie/es)"
                  ref={inputRef4}
                  onChangeText={(answer) => setAnswerPresPerf(answer)}
                  editable={correctPresPerf || props.finished ? false : true}
                  placeholderTextColor={
                     Platform.OS === 'ios' && incorrectPresPerf
                        ? 'white'
                        : 'grey'
                  }
                  autoCompleteType="off"
                  autoCorrect={false}
                  autoCapitalize="none"
                  underlineColorAndroid={
                     correctPresPerf
                        ? '#66dd33'
                        : props.finished && !correctPresPerf
                        ? '#ff0033'
                        : '#7E00C5'
                  }
               />
               {props.finished && props.synonyms && !correctPresPerf ? (
                  <CorrectAnswerComponent
                     form={synonymousForms.presPerf}
                     synonyms={true}
                  />
               ) : (
                  props.finished &&
                  !props.synonyms &&
                  !correctPresPerf && (
                     <CorrectAnswerComponent
                        form={props.verbForm.presperf}
                        synonyms={false}
                     />
                  )
               )}
               </>}
            </Body>
         </CardItem>
      </Card>
      :
      <Spinner />
      }
      </>
   )
}
const mapStateToProps = state => ({
   infinitive: state.settings.infinitive,
   present: state.settings.present,
   past: state.settings.past,
   presperf: state.settings.presperf,
 })
 
 export default connect(
   mapStateToProps,
 )(CardComponentForms);

const styles = StyleSheet.create({
   formInput: {
      fontSize: 16,
      marginTop: 45,
      padding: 10,
      width: '100%',
   },
   formInputIOS: {
      fontSize: 16,
      marginTop: 45,
      padding: 10,
      borderColor: '#7E00C5',
      borderWidth: 1,
      width: '100%',
   },
   formInputCorrectIOS: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 45,
      padding: 10,
      backgroundColor: '#66dd33',
      borderColor: '#7E00C5',
      color: 'black',
      color: '#7E00C5',
      width: '100%',
   },
   formInputIncorrectIOS: {
      fontSize: 16,
      marginTop: 45,
      padding: 10,
      backgroundColor: '#ff0033',
      borderColor: '#7E00C5',
      color: 'white',
      width: '100%',
   },
})
