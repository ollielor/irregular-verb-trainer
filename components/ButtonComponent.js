import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { 
   StyleProvider, 
   Button, 
   Text, 
} from 'native-base';

import commonColor from '../native-base-theme/variables/commonColor';
import variables from '../native-base-theme/variables/variables';

import getTheme from '../native-base-theme/components';

import { connectStyle } from 'native-base'; 

const ButtonComponent = props => {

      return (
         <Button full style={{backgroundColor: props.color, marginBottom: 7}} onPress={props.function}>
            <Text style={{color: '#D2D2D2'}}>
               {props.title}
            </Text>
         </Button>
      );
}

export default ButtonComponent;