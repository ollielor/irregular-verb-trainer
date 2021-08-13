import { StyleSheet, Platform } from 'react-native';

export const styles = (props) => StyleSheet.create({
   buttonDefaultStyle: {
      margin: 3,
      backgroundColor: props.color
   },
   buttonInstructionsStyle: {
      marginBottom: 10,
      backgroundColor: '#4E00C5'
   },
   buttonNarrowStyle: {
      marginLeft: 2,
      marginRight: 2,
   },
   buttonNarrowDisabledStyle: {
      ...styles.buttonNarrowStyle,
      backgroundColor: '#7E00C5'
   },
   buttonNarrowEnabledStyle: {
      ...styles.buttonNarrowStyle,
      backgroundColor: '#4E00C5'
   },
   buttonStyle: {
      backgroundColor: 'transparent',
      borderColor: '#eee',
      marginLeft: 2,
      marginRight: 2,
   },
   buttonTextStyle: {
      color: '#D2D2D2',
   },
   buttonWithMargin: {
      marginBottom: Platform.OS === 'android' ? 25 : 7,
   },
   buttonWithMarginBottomAndTop: {
      marginBottom: 20,
      marginTop: 20,
   },
   meaningsButtonStyle: {
      marginBottom: 5,
      backgroundColor: '#0000cc',
   },
   meaningsCorrectAnswer: {
      backgroundColor: '#006600',
   },
   meaningsIncorrectAnswer: {
      backgroundColor: '#cc0000',
   },
   promptMeanings: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
   },
})