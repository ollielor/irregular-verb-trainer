import React, { useState, useEffect, Fragment } from 'react';
import { Text } from 'native-base';

import { connect } from 'react-redux';

import CardComponentBrowse from '../cards/CardComponentBrowse';

import { sortVerbsByLevel } from '../../helpers/sorters';
import SpinnerComponent from '../styling/SpinnerComponent';
import ButtonComponentNarrow from '../buttons/ButtonComponentNarrow';

const VerbListByLevel = (props) => {

    const [verbsByLevel, setVerbsByLevel] = useState([]);
    const [verbsLoaded, setVerbsLoaded] = useState(false);
    const [verbs, setVerbs] = useState([]);
 
    const levels = [1, 2, 3];
 
   useEffect(() => {
      let verbListByLevel = []; 
      verbListByLevel = [...verbListByLevel, sortVerbsByLevel(
         props.language === 1 ? props.verbsSwedish : props.verbsGerman, 
         props.levelToShow
      )];
      setVerbsByLevel(verbListByLevel);
      props.setVerbsLoaded(true);
   }, [props.levelToShow]);

   useEffect(() => {
      return () => { };
   }, []);

   return (
      <>
        {!props.verbsLoaded && props.levelToShow
        ? (
           <SpinnerComponent text='Ladataan verbejä...' />
        )
         : verbsByLevel.map((verbLevelGroup) =>
            verbLevelGroup.map((verb, idx) => (
                <CardComponentBrowse verb={verb} key={idx} level={verb.level} />
         )))}
      </>
   );
};

const mapStateToProps = (state) => ({
   verbsGerman: state.verbs.verbsGerman,
   verbsSwedish: state.verbs.verbsSwedish,
   language: state.settings.language,
});

export default connect(mapStateToProps)(VerbListByLevel);
