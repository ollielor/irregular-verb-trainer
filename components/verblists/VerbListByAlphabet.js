import React, { useState, useEffect, Fragment } from 'react';

import { connect } from 'react-redux';

import CardComponentBrowse from '../cards/CardComponentBrowse';

import { sortVerbsAlphabetically } from '../../helpers/sorters';
import SpinnerComponent from '../styling/SpinnerComponent';

const VerbListByAlphabet = (props) => {

    const [verbsByAlphabet, setVerbsByAlphabet] = useState([]);
    const [verbsLoaded, setVerbsLoaded] = useState(false);

   useEffect(() => {
      setVerbsLoaded(false);
      setVerbsByAlphabet(sortVerbsAlphabetically(props.verbs));
      setVerbsLoaded(true);
   }, []);

   useEffect(() => {
      return () => { };
   }, []);

   return (
      <>
         {!verbsLoaded ? (
            <SpinnerComponent text='Ladataan verbejä...' />   
         ) :
            verbsByAlphabet.map((verb, idx) =>
            verb && (
                <CardComponentBrowse verb={verb} verbLoaded={verbsLoaded} key={idx} level={verb.level} />
            )
         )}
      </>
   );
};

const mapStateToProps = (state) => ({
   verbsGerman: state.verbs.verbsGerman,
   verbsSwedish: state.verbs.verbsSwedish,
   language: state.settings.language,
});

export default connect(mapStateToProps)(VerbListByAlphabet);