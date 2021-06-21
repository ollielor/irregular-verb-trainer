import React, { useState, useEffect } from 'react';
import { StyleSheet, Modal, Text } from 'react-native';
import { Container, Content } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { updateResults } from '../store/actions/results'

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
import ResultComponent from '../components/results/ResultComponent';

const HistoryScreen = (props) => {
   //const [historyMeanings, setHistoryMeanings] = useState([]);
   //const [historyForms, setHistoryForms] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [dropped, setDropped] = useState(false);
   const [tableCreated, setTableCreated] = useState(false);

   const navigation = useNavigation();

   console.log('HistoryScreen props: ', props);

   useEffect(() => {
      return () => {};
   }, []);

   const createResultsAsync = async () => {
      if (await createResultsDb()) {
         setTableCreated(true);
         props.dispatch(updateResults(await getResults()));
      }
   }
 
   useEffect(() => {
      if (dropped) {
         createResultsAsync();
      }
   }, [dropped]);


   /*useEffect(() => {
      console.log(props.results);
         setHistoryMeanings(
            props.results.filter(
               (historyItem) => historyItem.type === 1
            )
         );
         setHistoryForms(
            props.results.filter(
               (historyItem) => historyItem.type === 2
            )
         );
   }, [props.results, dropped, tableCreated]);*/

/*    useEffect(() => {
      DatabaseResults.transaction(
         (tx) => {
            tx.executeSql(
               'select * from results;',
               [],
               (tx, results) => {
                  setHistoryMeanings(
                     props.results.filter(
                        (historyItem) => historyItem.type === 1
                     )
                  );
                  setHistoryForms(
                     props.results.filter(
                        (historyItem) => historyItem.type === 2
                     )
                  );
                  setHistoryLoaded(true);
               },
               (tx, error) => {
                  setHistoryMeanings([]);
                  setHistoryForms([]);
                  console.log('Could not execute query: ', error);
               }
            );
         },
         (error) => {
            console.log('Transaction error: ', error);
         }
      );
   }, [dropped]); */

   const dropData = () => {
      DatabaseResults.transaction(
         (tx) => {
            tx.executeSql('drop table if exists results;', [],
            setDropped(true),            
            (tx, error) => {
               console.log('Could not execute query: ', error);
            });
         },
         (error) => {
            console.log('Transaction error: ', error);
         }
      );
      setShowModal(false);

   };

   return (    
      <Container style={styles.container}>
         <HeaderComponent title="Omat tulokseni" goBack={navigation.goBack} />
         <>
         {props.results ? (
            <Content style={styles.contentContainer}>
               <ButtonComponent title='Jaa tulokset' color="#7E00C5" function={() => navigation.navigate('Jaa tulokset')} />
               <Heading>Verbien merkitykset {props.language === 1 ? '(ruotsi)' : '(saksa)'}</Heading>
               <Subheading>Taso 1</Subheading>
                  <>
                     <ProgressComponent historyLevel={1} type={1} />
                     <ResultHistoryView historyLevel={1} type={1} hideButton />
                  </>
               <Subheading>Taso 2</Subheading>
                  <>
                     <ProgressComponent historyLevel={2} type={1} />
                     {/* <ProgressComponent data={historyMeanings} historyLevel={2} type={1} /> */}
                     <ResultHistoryView historyLevel={2} type={1} hideButton />
                  </>
               <Subheading>Taso 3</Subheading>
                  <>
                     <ProgressComponent historyLevel={3} type={1} />
                     <ResultHistoryView historyLevel={3} type={1} hideButton />
                  </>
               <Heading>Verbien muodot {props.language === 1 ? '(ruotsi)' : '(saksa)'}</Heading>
               <Subheading>Taso 1</Subheading>
                  <>
                     <ProgressComponent historyLevel={1} type={2} />
                     <ResultHistoryView historyLevel={1} type={2} hideButton />
                  </>
               <Subheading>Taso 2</Subheading>
                  <>
                     <ProgressComponent historyLevel={2} type={2} />
                     <ResultHistoryView historyLevel={2} type={2} hideButton />
                  </>
               <Subheading>Taso 3</Subheading>
                  <>
                     <ProgressComponent historyLevel={3} type={2} />
                     <ResultHistoryView historyLevel={3} type={2} hideButton />
                  </>
                  <ButtonComponent
                        color="red"
                        title="Tyhjennä tuloshistoria"
                        function={() => setShowModal(true)}
                        withMarginBottomAndTop
                     />             
            </Content>  
         ) : (
            <Content>
               <SpinnerComponent text="Tuloksia ladataan..." />
            </Content>
         )}
         </>
         <FooterComponent />
         <Modal
            animationType="slide"
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
         >
            <Content
               contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
            >
               <Heading>Haluatko varmasti tyhjentää tuloshistorian? Tyhjentämällä tuloshistorian menetät suoritustietosi sekä ruotsissa että saksassa.</Heading>
               <ButtonComponent title="Tyhjennä historia" color="#7E00C5" function={dropData} />
               <ButtonComponent
                  title="Peruuta"
                  color="#7E00C5"
                  function={() => setShowModal(false)}
               />
            </Content>
         </Modal>
      </Container>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   level: state.settings.level,
   results: state.results.results
});

export default connect(mapStateToProps)(HistoryScreen);

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#d2d2d2',
   },
   contentContainer: {
      padding: 10,
   },
});
