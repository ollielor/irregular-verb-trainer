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
       <StyleProvider style={getTheme(commonColor)}>
         <Button full>
            <Text uppercase={false}>
               {props.title}
            </Text>
         </Button>
      </StyleProvider>
    );
}

export default connectStyle('nativeBaseTheme.ButtonComponent', commonColor)(ButtonComponent);