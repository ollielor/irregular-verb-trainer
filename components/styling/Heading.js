import React from 'react'
import { Text } from 'native-base'

const Heading = (props) => {
   return (
      <Text
         {...props}
         style={{
            color: '#7E00C5',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 10,
            marginBottom: 15,
         }}
      />
   )
}

export default Heading
