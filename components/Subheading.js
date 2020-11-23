import React from 'react'
import { Text } from 'native-base'

const Subheading = (props) => {
   return (
      <Text
         {...props}
         style={{
            color: '#4E00C5',
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 15,
         }}
      />
   )
}

export default Subheading
