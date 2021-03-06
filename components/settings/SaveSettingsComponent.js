import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, Content } from 'native-base';

import ButtonComponent from '../buttons/ButtonComponent';

import { connect } from 'react-redux';

import { updateLanguage, updateLevel } from '../../store/actions/settings';

const SaveSettingsComponent = (props) => {
   return (
      <Content>
         <Body
                  style={{ flexDirection: 'row', justifyContent: 'center' }}
               >
                  <ButtonComponent
                     title="Tallenna asetukset"
                     function={props.updateSettings}
                  />
                  <ButtonComponent
                     title="Tyhjennä asetukset"
                     color="#cc0000"
                     function={props.clearSettings}
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
