import React, { useState, useEffect, Fragment } from 'react';
import { Modal } from 'react-native';
import { Box, ScrollView, VStack } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { updateResults } from '../store/actions/results';

import { getResults, createResultsDb } from '../helpers/results';

import DatabaseResults from '../modules/DatabaseResults';
import ResultHistoryView from '../components/results/ResultHistoryView';
import Heading from '../components/styling/Heading';
import HeaderComponent from '../components/header/HeaderComponent';
import Subheading from '../components/styling/Subheading';
import FooterComponent from '../components/footer/FooterComponent';
import ButtonComponent from '../components/buttons/ButtonComponent';
import ProgressComponent from '../components/results/ProgressComponent';
import SpinnerComponent from '../components/styling/SpinnerComponent';

import { connect } from 'react-redux';

import { styles } from '../styles/styles';

const HistoryScreen = (props) => {
   const [showModal, setShowModal] = useState(false);
   const [dropped, setDropped] = useState(false);

   const navigation = useNavigation();

   const levels = [1, 2, 3];

   useEffect(() => {
      return () => { };
   }, []);

   const createResultsAsync = async () => {
      if (await createResultsDb()) {
         props.dispatch(updateResults(await getResults()));
      }
   };

   useEffect(() => {
      if (dropped) {
         createResultsAsync();
      }
   }, [dropped]);

   const dropData = () => {
      DatabaseResults.transaction(
         (tx) => {
            tx.executeSql(
               'drop table if exists results;',
               [],
               setDropped(true),
               (tx, error) => {
                  console.log('Could not execute query: ', error);
               }
            );
         },
         (error) => {
            console.log('Transaction error: ', error);
         }
      );
      setShowModal(false);
   };

   return (
      <>
         <HeaderComponent title="Omat tulokseni" goBack={navigation.goBack} />
         <ScrollView style={styles(props).containerGrey}>
            <>
               {props.results ? (
                  <VStack style={styles(props).contentContainer}>
                     <ButtonComponent
                        title="Jaa tulokset"
                        color="#7E00C5"
                        function={() => navigation.navigate('Jaa tulokset')}
                     />
                     <Heading>
                        Verbien merkitykset{' '}
                        {props.language === 1 ? '(ruotsi)' : '(saksa)'}
                     </Heading>
                     {levels.map((level, index) => (
                        <Fragment key={index}>
                           <Subheading>Taso {level}</Subheading>
                           <ProgressComponent resultsDropped={dropped} historyLevel={level} type={1} />
                           <ResultHistoryView historyLevel={level} type={1} hideButton />
                        </Fragment>
                     ))}
                     <Heading>
                        Verbien muodot{' '}
                        {props.language === 1 ? '(ruotsi)' : '(saksa)'}
                     </Heading>
                     {levels.map((level, index) => (
                        <Fragment key={index}>
                           <Subheading>Taso {level}</Subheading>
                           <ProgressComponent resultsDropped={dropped} historyLevel={level} type={2} />
                           <ResultHistoryView historyLevel={level} type={2} hideButton />
                        </Fragment>
                     ))}
                     <ButtonComponent
                        color="red"
                        title="Tyhjennä tuloshistoria"
                        function={() => setShowModal(true)}
                        withMarginBottomAndTop
                     />
                  </VStack>
               ) : (
                  <VStack>
                     <SpinnerComponent text="Tuloksia ladataan..." />
                  </VStack>
               )}
            </>
         </ScrollView>
         <FooterComponent />
         <Modal
            animationType="slide"
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
         >
            <Box
               contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
            >
               <Heading>
                  Haluatko varmasti tyhjentää tuloshistorian? Tyhjentämällä
                  tuloshistorian menetät suoritustietosi sekä ruotsissa että
                  saksassa.
               </Heading>
               <ButtonComponent
                  title="Tyhjennä historia"
                  color="#ff0000"
                  function={dropData}
               />
               <ButtonComponent
                  title="Peruuta"
                  color="#7E00C5"
                  function={() => setShowModal(false)}
               />
            </Box>
         </Modal>
      </>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   level: state.settings.level,
   results: state.results.results,
});

export default connect(mapStateToProps)(HistoryScreen);
