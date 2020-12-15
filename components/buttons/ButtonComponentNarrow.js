import React from 'react'
import { Button, Text } from 'native-base'

const ButtonComponentNarrow = (props) => {
   return (
      <Button
         style={{ backgroundColor: props.disabled ? '#7E00C5' : '#4E00C5', marginLeft: 2, marginRight: 2 }}
         onPress={props.function} disabled={props.disabled}
      >
         <Text uppercase={false} style={{ color: '#D2D2D2' }}>
            {props.title}
         </Text>
      </Button>
   )
}

export default ButtonComponentNarrow
