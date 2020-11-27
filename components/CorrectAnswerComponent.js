import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'native-base'

const CorrectAnswerComponent = (props) => {
   console.log('correctAnswerComponent: ', props)

   return (
      <Text style={Platform.OS === 'ios' ? styles.textIOS : styles.textAndroid}>
         {Array.isArray(props.form)
            ? props.form.map((alternative, index) =>
                 index < props.form.length - 1
                    ? alternative + ' / '
                    : alternative
              )
            : props.form}
      </Text>
   )
}

export default CorrectAnswerComponent

const styles = StyleSheet.create({
   textIOS: {
      color: '#7E00C5',
   },
   textAndroid: {
      color: '#7E00C5',
      paddingLeft: 8,
   },
})
