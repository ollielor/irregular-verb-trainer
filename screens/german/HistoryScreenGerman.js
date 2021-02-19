import React, { useState, useEffect } from 'react';
import { StyleSheet, Modal, Text } from 'react-native';
import { Container, Content } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import DatabaseResults from '../../modules/DatabaseResults';
import ResultHistoryView from '../../components/results/ResultHistoryView';
import Heading from '../../components/styling/Heading';
import HeaderComponent from '../../components/header/HeaderComponent';
import Subheading from '../../components/styling/Subheading';
import FooterComponent from '../../components/footer/FooterComponent';
import ButtonComponent from '../../components/buttons/ButtonComponent';
import ProgressComponent from '../../components/results/ProgressComponent';
import SpinnerComponent from '../../components/styling/SpinnerComponent';

import { connect } from 'react-redux';

const HistoryScreenGerman = (props) => {
   const [historyMeanings, setHistoryMeanings] = useState([]);
   const [historyForms, setHistoryForms] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [dropped, setDropped] = useState(false);
   const [historyLoaded, setHistoryLoaded] = useState(false);

   const navigation = useNavigation();

   useEffect(() => {
      return () => {};
   }, []);

   useEffect(() => {
      DatabaseResults.transaction(
         (tx) => {
            tx.executeSql(
               'select * from results;',
               [],
               (tx, results) => {
                  setHistoryMeanings(
                     results.rows._array.filter(
                        (historyItem) => historyItem.type === 1
                     )
                  );
                  setHistoryForms(
                     results.rows._array.filter(
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
   }, [dropped]);

   const dropData = () => {
      DatabaseResults.transaction(
         (tx) => {
            tx.executeSql('drop table if exists results;', [], (tx, error) => {
               console.log('Could not execute query: ', error);
            });
         },
         (error) => {
            console.log('Transaction error: ', error);
         }
      );
      setShowModal(false);
      setDropped(true);
   };

   return (
      <Container style={styles.container}>
         <HeaderComponent title="Omat tulokseni" goBack={navigation.goBack} />
         {historyMeanings || historyForms ? (
            <Content style={styles.contentContainer}>
               <Heading>Verbien merkitykset {props.language === 1 ? '(ruotsi)' : '(saksa)'}</Heading>
               {historyMeanings.filter((meaningItem) => meaningItem.language === props.language).length === 0 && (
                  <Text style={{ textAlign: 'center' }}>
                     Ei tuloksia tästä kategoriasta.
                  </Text>
               )}
               {historyMeanings.filter(
                  (historyItem) =>
                     historyItem.level === 1 && historyItem.language === props.language
               ).length > 0 && (
                  <>
                     <Subheading>Taso 1</Subheading>
                     <ProgressComponent
                        data={historyMeanings.filter(
                           (historyItem) =>
                              historyItem.level === 1 &&
                              historyItem.language === props.language
                        )}
                     />
                     <ResultHistoryView
                        hideButton
                        resultHistory={historyMeanings.filter(
                           (historyItem) =>
                              historyItem.level === 1 &&
                              historyItem.language === props.language
                        )}
                     />
                  </>
               )}
               {historyMeanings.filter(
                  (historyItem) =>
                     historyItem.level === 2 && historyItem.language === props.language
               ).length > 0 && (
                  <>
                     <Subheading>Taso 2</Subheading>
                     <ProgressComponent
                        data={historyMeanings.filter(
                           (historyItem) =>
                              historyItem.level === 2 &&
                              historyItem.language === props.language
                        )}
                     />
                     <ResultHistoryView
                        hideButton
                        resultHistory={historyMeanings.filter(
                           (historyItem) =>
                              historyItem.level === 2 &&
                              historyItem.language === props.language
                        )}
                     />
                  </>
               )}
               {historyMeanings.filter(
                  (historyItem) =>
                     historyItem.level === 3 && historyItem.language === props.language
               ).length > 0 && (
                  <>
                     <Subheading>Taso 3</Subheading>
                     <ProgressComponent
                        data={historyMeanings.filter(
                           (historyItem) =>
                              historyItem.level === 3 &&
                              historyItem.language === props.language
                        )}
                     />
                     <ResultHistoryView
                        hideButton
                        resultHistory={historyMeanings.filter(
                           (historyItem) =>
                              historyItem.level === 3 &&
                              historyItem.language === props.language
                        )}
                     />
                  </>
               )}
               <Heading>Verbien muodot {props.language === 1 ? '(ruotsi)' : '(saksa)'}</Heading>
               {historyForms.filter((formItem) => formItem.language === props.language).length === 0 && (
                  <Text style={{ textAlign: 'center', marginBottom: 20 }}>
                     Ei tuloksia tästä kategoriasta.
                  </Text>
               )}
               {historyForms.filter(
                  (historyItem) =>
                     historyItem.level === 1 && historyItem.language === 2
               ).length > 0 && (
                  <>
                     <Subheading>Taso 1</Subheading>
                     <ProgressComponent
                        data={historyForms.filter(
                           (historyItem) =>
                              historyItem.level === 1 &&
                              historyItem.language === 2
                        )}
                     />
                     <ResultHistoryView
                        hideButton
                        resultHistory={historyForms.filter(
                           (historyItem) =>
                              historyItem.level === 1 &&
                              historyItem.language === 2
                        )}
                     />
                  </>
               )}
               {historyForms.filter(
                  (historyItem) =>
                     historyItem.level === 2 && historyItem.language === 2
               ).length > 0 && (
                  <>
                     <Subheading>Taso 2</Subheading>
                     <ProgressComponent
                        data={historyForms.filter(
                           (historyItem) =>
                              historyItem.level === 2 &&
                              historyItem.language === 2
                        )}
                     />
                     <ResultHistoryView
                        hideButton
                        resultHistory={historyForms.filter(
                           (historyItem) =>
                              historyItem.level === 2 &&
                              historyItem.language === 2
                        )}
                     />
                  </>
               )}
               {historyForms.filter(
                  (historyItem) =>
                     historyItem.level === 3 && historyItem.language === 2
               ).length > 0 && (
                  <>
                     <Subheading>Taso 3</Subheading>
                     <ProgressComponent
                        data={historyForms.filter(
                           (historyItem) =>
                              historyItem.level === 3 &&
                              historyItem.language === 2
                        )}
                     />
                     <ResultHistoryView
                        hideButton
                        resultHistory={historyForms.filter(
                           (historyItem) =>
                              historyItem.level === 3 &&
                              historyItem.language === 2
                        )}
                     />
                  </>
               )}
               {historyForms.length > 0 || historyMeanings.length > 0 ? (
                  <ButtonComponent
                     title="Tyhjennä tuloshistoria"
                     color="#cc0000"
                     function={() => setShowModal(true)}
                  />
               ) : null}
            </Content>
         ) : (
            <Content>
               <SpinnerComponent text="Tuloksia ladataan..." />
            </Content>
         )}
         <FooterComponent />
         <Modal
            animationType="slide"
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
         >
            <Content
               contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
            >
               <Heading>Haluatko varmasti tyhjentää tuloshistorian?</Heading>
               <ButtonComponent title="Tyhjennä historia" function={dropData} />
               <ButtonComponent
                  title="Peruuta"
                  function={() => setShowModal(false)}
               />
            </Content>
         </Modal>
      </Container>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   level: state.settings.level
});

export default connect(mapStateToProps)(HistoryScreenGerman);

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#d2d2d2',
   },
   contentContainer: {
      padding: 10,
   },
});
