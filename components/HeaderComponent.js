import React from 'react';
import { StyleSheet } from 'react-native';
import { 
   Button, 
   Body,
   Left,
   Right, 
   Header,
   Title, 
   Icon
} from 'native-base';


const HeaderComponent = props => {

    return (
            <Header iosBarStyle='light-content' androidStatusBarColor='#4E00C5' style={{backgroundColor: '#4E00C5'}}>
               <Left style={{flex: 1}}>
                  {!props.noArrow
                  ?
                     <Button transparent onPress={props.goBack}>
                        <Icon name='arrow-back' style={{color: '#D2D2D2'}} />
                     </Button>
                  : null}
               </Left>
               <Body style={{flex: 2, alignItems: 'center'}}>
                  <Title style={{color: '#D2D2D2'}}>
                     {props.title}
                  </Title>
               </Body>
                <Right style={{flex: 1}} />
            </Header>
    );
}

export default HeaderComponent;