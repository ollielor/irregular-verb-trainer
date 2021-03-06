import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, Content } from 'native-base';

import ButtonComponent from '../buttons/ButtonComponent';

import { connect } from 'react-redux';

const SaveSettingsComponent = (props) => {
   return (
      <Content>
         <Body
                  style={{ flexDirection: 'row', justifyContent: 'center' }}
               >
                  <ButtonComponent
                     title="Tallenna asetukset"
                     color="#7E00C5"
                     function={props.updateSettings}
                  />
               </Body>
      </Content>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   level: state.settings.level,
});

export default connect(mapStateToProps)(SaveSettingsComponent);

const styles = StyleSheet.create({
   cardStyle: {
      borderWidth: 0,
   },
   cardItemStyle: {
      backgroundColor: '#ebebeb',
   },
});
