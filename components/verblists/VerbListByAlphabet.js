import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import CardComponentBrowse from '../cards/CardComponentBrowse';

import { sortAndSliceVerbs } from '../../helpers/sorters';
import SpinnerComponent from '../styling/SpinnerComponent';
import ButtonComponent from '../buttons/ButtonComponent';

const VerbListByAlphabet = (props) => {
   const [verbsByAlphabet, setVerbsByAlphabet] = useState([]);
   const [verbsLoaded, setVerbsLoaded] = useState(false);
   const [verbCount, setVerbCount] = useState(50);
   const [prevCount, setPrevCount] = useState(0);
   const [buttonDisplayed, setButtonDisplayed] = useState(true);
   const [loadingVerbs, setLoadingVerbs] = useState(true);

   useEffect(() => {
      if (loadingVerbs) {
         let verbs =
            props.language === 1 ? props.verbsSwedish : props.verbsGerman;
         setVerbsLoaded(false);
         let verbsSliced = [];
         verbsSliced = sortAndSliceVerbs(verbs, prevCount, verbCount);
         setVerbsByAlphabet([...verbsByAlphabet, ...verbsSliced]);
         setPrevCount(() => prevCount + 50);
         setVerbCount(() => verbCount + 50);
         setVerbsLoaded(true);
         if (verbCount >= verbs.length) {
            setButtonDisplayed(false);
         } else {
            setButtonDisplayed(true);
         }
      }
   }, [loadingVerbs]);

   useEffect(() => {
      setLoadingVerbs(false);
      setVerbsLoaded(true);
   }, [verbsByAlphabet]);

   useEffect(() => {
      return () => {};
   }, []);

   return (
      <>
         {verbsLoaded &&
            verbsByAlphabet.map(
               (verb, idx) =>
                  verb && (
                     <CardComponentBrowse
                        verb={verb}
                        verbLoaded={verbsLoaded}
                        key={idx}
                        level={verb.level}
                        ownVerbsSwedish={props.ownVerbsSwedish}
                        ownVerbsGerman={props.ownVerbsGerman}
                        addToOwnVerbs={props.addToOwnVerbs}
                        removeFromOwnVerbs={props.removeFromOwnVerbs}
                        verbAdded={props.verbAdded}
                     />
                  )
            )}
         {loadingVerbs && <SpinnerComponent text="Ladataan verbejä..." />}
         {!loadingVerbs && buttonDisplayed && (
            <ButtonComponent
               function={() => setLoadingVerbs(true)}
               color="#7E00C5"
               title="Näytä lisää verbejä"
               mb="20"
            />
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
