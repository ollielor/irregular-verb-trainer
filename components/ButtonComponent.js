import React from 'react'
import { Button, Text } from 'native-base'

const ButtonComponent = (props) => {
   return (
      <Button
         full
         style={{ backgroundColor: props.color, marginBottom: 7 }}
         onPress={props.function}
      >
         <Text uppercase={false} style={{ color: '#D2D2D2' }}>
            {props.title}
         </Text>
      </Button>
   )
}

export default ButtonComponent
