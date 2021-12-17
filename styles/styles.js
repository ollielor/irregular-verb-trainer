import { StyleSheet, Platform, StatusBar } from 'react-native';
import { alignContent } from 'styled-system';

export const styles = (props) => StyleSheet.create({
   // Button styles
   buttonDefaultStyle: {
      fontFamily: 'Quicksand_SemiBold',
      margin: 3,
      backgroundColor: props.color
   },
   buttonDisabledStyle: {
      fontFamily: 'Quicksand_SemiBold',
      backgroundColor: '#e8e8e8'
   },
   buttonInstructionsStyle: {
      fontFamily: 'Quicksand_SemiBold',
      marginBottom: 10,
      backgroundColor: '#4E00C5'
   },
   buttonNarrowStyle: {
      fontFamily: 'Quicksand_SemiBold',
      marginLeft: 2,
      marginRight: 2,
   },
   buttonNarrowDisabledStyle: {
      fontFamily: 'Quicksand_SemiBold',
      backgroundColor: '#7E00C5'
   },
   buttonNarrowEnabledStyle: {
      fontFamily: 'Quicksand_SemiBold',
      backgroundColor: '#4E00C5'
   },
   buttonStyle: {
      fontFamily: 'Quicksand_SemiBold',
      backgroundColor: 'transparent',
      borderColor: '#eee',
      marginLeft: 2,
      marginRight: 2,
   },
   buttonTextStyle: {
      fontFamily: 'Quicksand_SemiBold',
      color: '#d2d2d2',
   },
   buttonWithMargin: {
      fontFamily: 'Quicksand_SemiBold',
      marginBottom: Platform.OS === 'android' ? 25 : 7,
      backgroundColor: props.color
   },
   buttonWithMarginBottomAndTop: {
      fontFamily: 'Quicksand_SemiBold',
      marginBottom: 20,
      marginTop: 20,
      backgroundColor: props.color
   },
   footerButton: {
      fontFamily: 'Quicksand_SemiBold',
      backgroundColor: props.disabled ? '#7E00C5' : '#0047c5',
   },
   historyButtonResults: {
      fontFamily: 'Quicksand_SemiBold',
      backgroundColor: '#4E00C5',
      alignSelf: 'center',
      marginTop: 20,
      marginBottom: 20,
   },
   meaningsButtonDefault: {
      fontFamily: 'Quicksand_SemiBold',
      backgroundColor: '#0000cc',
      marginBottom: 5,
   },
   meaningsCorrectAnswer: {
      fontFamily: 'Quicksand_SemiBold',
      backgroundColor: '#0000cc',
      marginBottom: 5,
      backgroundColor: '#006600',
   },
   meaningsIncorrectAnswer: {
      fontFamily: 'Quicksand_SemiBold',
      backgroundColor: '#0000cc',
      marginBottom: 5,
      backgroundColor: '#cc0000',
   },
   textAlternative: {
      fontFamily: 'Quicksand_SemiBold',
      color: '#eee',
      fontSize: 17
   },
   // Card styles
   cardComponentGrey: {
      backgroundColor: '#e8e8e8',
      marginBottom: 10,
      padding: 10
   },
   // Styles for Instructions screen
   instructionsHeaderStyle: {
      fontFamily: 'Quicksand_SemiBold',
      color: '#7E00C5',
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
   textBodyStyleMastery: {
      flex: 1,
      alignContent: 'flex-end'
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
   footerBox: {
      bottom: 0,
      padding: 0
   },
   // Header styles
   headerBodyStyle: {
      fontFamily: 'Quicksand_SemiBold',
      flex: 2,
      alignItems: 'center'
   },
   headerStyle: {
      fontFamily: 'Quicksand_SemiBold',
      backgroundColor: '#0047c5',
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      paddingBottom: 10
   },
   headerBoxStyle: {
      padding: 10
   },
   headerTitleStyle: {
      fontFamily: 'Quicksand_SemiBold',
      color: '#d2d2d2',
   },
   headerTitlePaddingLeft: {
      paddingLeft: 10
   },
   // Styles for Browse mode
   browseContainer: {
      padding: 10,
   },
   browseBoxStyle: {
      padding: 5
   },
   // Styles for Forms mode
   scrollViewForms: {
      padding: 14,
      backgroundColor: '#d2d2d2'
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
   labelForms: {
      marginTop: 15,
   },
   promptForms: {
      color: '#7E00C5',
      fontWeight: 'bold',
      fontSize: 16,
      marginTop: 22,
   },
   // Styles for progress bar
   progressBar: {
      color: "#eee",
      padding: 10,
      textAlign: 'center',
   },
   // Styles for results
   headerResults: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24,
      color: '#4E00C5',
      marginTop: 20,
   },
   progressCardStyleNeutral: {
      backgroundColor: '#e8e8e8',
   },
   progressCardStyleGood: {
      backgroundColor: '#a3dc59',
   },
   progressBodyStyle: {
      justifyContent: 'center',
      alignItems: 'center',
   },
   progressStyle: {
      color: '#4E00C5',
      textAlign: 'center',
      fontWeight: 'bold',
   },
   textResults: {
      textAlign: 'center'
   },
   // Styles for feedback
   feedback: {
      fontFamily: 'Quicksand_Bold',
      textAlign: 'center',
      fontSize: 24,
      color: '#4E00C5',
      paddingTop: 20,
   },
   feedbackPoints: {
      textAlign: 'center',
      paddingTop: 10,
   },
   // Styles for Settings screen
   settingsBodyStyle: {
      flexDirection: 'row',
      justifyContent: 'center'
   },
   settingsListStyle: {
      marginBottom: 30
   },
   // Styles for correct answer component
   correctAnswerIOS: {
      color: '#7E00C5',
   },
   correctAnswerAndroid: {
      color: '#7E00C5',
      paddingLeft: 8,
   },
   // Styles for Share Results screen
   formInputSharing: {
      fontSize: 16,
      padding: 10,
      borderColor: '#7E00C5',
      borderWidth: 1,
      width: '100%',
   },
   shareResultsStyle: {
      flex: 1,
      backgroundColor: '#eee'
   },
   // Common styles
   accent: {
      fontWeight: 'bold',
      color: '#4E00C5'
   },
   containerGrey: {
      backgroundColor: '#d2d2d2',
   },
   containerSilver: {
      backgroundColor: '#e8e8e8',
      padding: 10
   },
   containerDarkGrey: {
      backgroundColor: '#dbdbdb'
   },
   contentContainer: {
      padding: 10,
      alignSelf: 'center'
   },
   flexOne: {
      flex: 1
   },
   headingStyle: {
      fontFamily: 'Quicksand_SemiBold',
      color: '#7E00C5',
      fontSize: 20,
      textAlign: 'center',
      marginTop: 10,
      marginBottom: props.smallMarginBottom ? 5 : 15,
      flex: props.flexOne ? 1 : null
   },
   overFlowVisible: {
      overflow: 'visible'
   },
   subheadingStyle: {
      fontFamily: 'Quicksand_Bold',
      color: '#4E00C5',
      marginTop: 15,
      marginBottom: 10,
      textAlign: props.centered ? 'center' : 'left'
   },
   // InfoContent style
   infoContentStyle: {
      backgroundColor: '#f0e2cf',
   }
})