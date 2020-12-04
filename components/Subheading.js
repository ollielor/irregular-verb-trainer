import React from 'react'
import { Text } from 'native-base'

const Subheading = (props) => {
   return (
      <Text
         {...props}
         style={{
            color: '#4E00C5',
            fontWeight: 'bold',
            marginTop: props.noMargin ? 0 : 10,
            marginBottom: props.noMargin ? 0 : 15,
         }}
      />
   )
}

export default Subheading
