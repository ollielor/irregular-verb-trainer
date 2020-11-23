import React from 'react'
import { Button, Text } from 'native-base'

const ButtonComponent = (props) => {
   return (
      <Button style={{ backgroundColor: '#0047c5' }} onPress={props.function}>
         <Text uppercase={false} style={{ color: '#D2D2D2' }}>
            {props.title}
         </Text>
      </Button>
   )
}

export default ButtonComponent
