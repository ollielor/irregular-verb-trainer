import React from 'react';

import { Text } from 'native-base';

const CorrectAnswerComponent = props => {

   console.log('correctAnswerComponent: ', props)

   return (
      <Text style={{color: '#7E00C5'}}>
         {Array.isArray(props.form) ?
            props.form.map((alternative, index) =>
               index < props.form.length - 1 ? 
                  alternative + ' / '
               :
                  alternative
            )
         :
            props.form
         }
      </Text>
   )

}

export default CorrectAnswerComponent;