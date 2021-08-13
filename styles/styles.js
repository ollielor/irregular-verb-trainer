import { StyleSheet, Platform, StatusBar } from 'react-native';

export const styles = (props) => StyleSheet.create({
   // Button styles
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
      color: '#d2d2d2',
   },
   buttonWithMargin: {
      marginBottom: Platform.OS === 'android' ? 25 : 7,
   },
   buttonWithMarginBottomAndTop: {
      marginBottom: 20,
      marginTop: 20,
   },
   footerButton: { 
      backgroundColor: '#0047c5' 
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
   // Card styles
   cardComponentGrey: {
      backgroundColor: '#e8e8e8'
   },
   // Styles for Forms mode
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
   promptForms: {
      color: '#7E00C5',
      fontWeight: 'bold',
      fontSize: 16,
      marginTop: 22,
   },
   // Styles for Instructions screen
   instructionsHeaderStyle: {
      color: '#7E00C5', 
      fontWeight: 'bold',
      marginBottom: 15
   },
   instructionsPlainText: {
      marginBottom: 15
   },
   // Styles for Mastery view
   mastered: {
      backgroundColor: '#66dd33',
   },
   masteredText: {
      color: '#4E00C5'
   },
   notMastered: {
      backgroundColor: '#ff0033',
   },
   notMasteredText: {
      color: '#fff'
   },
   // Styles for Meanings mode
   cardMeaningBody: {
      flexDirection: 'row', 
      justifyContent: 'center' 
   },
   correctAnswerMeanings: {
      backgroundColor: '#006600',
      marginLeft: 2,
      marginRight: 2,
   },
   incorrectAnswerMeanings: {
      backgroundColor: '#cc0000',
      marginLeft: 2,
      marginRight: 2,
   },
   notAnsweredMeanings: {
      backgroundColor: '#0000cc',
      marginLeft: 2,
      marginRight: 2,
   },
   promptMeanings: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
   },
   // Footer styles
   footerStyle: { 
      backgroundColor: '#0047c5', 
      display: 'flex', 
      bottom: 0 
   },
   // Header styles
   headerBodyStyle: {
      flex: 2, 
      alignItems: 'center'
   },
   headerStyle: {
      backgroundColor: '#0047c5', 
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
      paddingBottom: 10
   },
   // Common styles
   overFlowVisible: {
      overflow: 'visible'
   },
   flexOne: {
      flex: 1
   }
})