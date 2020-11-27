import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Text } from "native-base";

import DatabaseVerbs from "../../modules/DatabaseVerbs";
import DatabaseResults from "../../modules/DatabaseResults";

import { useNavigation } from "@react-navigation/native";

import {
  rndIntGenerator,
  getRandomVerb,
  getCurrentDate,
} from "../../helpers/helpers";

import FooterComponent from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponent";
import CardComponentMeanings from "../../components/CardComponentMeanings";
import GermanResultView from "../../components/GermanResultView";
import LatestResultsGerman from "../../components/LatestResultsGerman";

const GermanMeaningsScreen = (props) => {
  const [verbs, setVerbs] = useState([]);
  const [verbsLoaded, setVerbsLoaded] = useState(false);
  const [level, setLevel] = useState(1);
  const [randomizedVerbs, setRandomizedVerbs] = useState([]);
  const [points, setPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [finished, setFinished] = useState(false);
  const [results, setResults] = useState({});
  const [counterState, setCounterState] = useState(null);
  const [started, setStarted] = useState(true);
  const [resultHistory, setResultHistory] = useState([]);
  const [resultsReady, setResultsReady] = useState(false);
  const [resultsSaved, setResultsSaved] = useState(false);
  const [dateTime, setDateTime] = useState(null);
  const [tableCreated, setTableCreated] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    DatabaseVerbs;
  });

  const loadVerbs = () => {
    let query;
    switch (level) {
      case 1:
        query =
          "select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id where level=1;";
        break;
      case 2:
        query =
          "select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id where level=2;";
        break;
      case 3:
        query =
          "select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id where level=3;";
        break;
      case 4:
        query =
          "select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id;";
        break;
    }
    DatabaseVerbs.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [],
          (tx, results) => {
            setVerbs(results.rows._array);
            setVerbsLoaded(true);
          },
          (tx, error) => {
            console.log("Could not execute query: ", error);
          }
        );
      },
      (error) => {
        console.log("Transaction error: ", error);
      }
    );
    createResultsDb();
  };

  const createResultsDb = () => {
    DatabaseResults.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists results (id integer primary key not null, type integer, language integer, level integer, accuracy integer, q_total integer, points real, maxpoints integer, percentage real, datetime real);"
        );
      },
      null,
      updateList
    );
    setTableCreated(true);
  };

  const updateList = () => {
    DatabaseResults.transaction(
      (tx) => {
        tx.executeSql(
          "select * from results;",
          [],
          (tx, results) => {
            setResultHistory(results.rows._array);
          },
          (tx, error) => {
            console.log("Could not execute query: ", error);
          }
        );
      },
      (error) => {
        console.log("Transaction error: ", error);
      }
    );
  };

  useEffect(() => {
    // Level hardcoded to 1 at the moment
    setLevel(1);
    loadVerbs();
    if (verbsLoaded) {
      let rndVerb;
      let rndVerbs = [];
      let rndVerbsFinal = [];
      while (rndVerbsFinal.length <= 14) {
        const rndInt = rndIntGenerator(verbs.length);
        rndVerb = getRandomVerb(rndInt, verbs);
        if (rndVerb !== undefined) {
          rndVerbs.push(rndVerb);
        }
        if (rndVerb !== undefined && rndVerbs.length > 1) {
          rndVerbsFinal = rndVerbs.filter(
            (verb, index, self) =>
              index === self.findIndex((v) => v.verb_id === verb.verb_id)
          );
        }
      }
      let rndVerbsThree = [];
      let verbObjectArray = [];
      for (let i = 0; i < rndVerbsFinal.length; i++) {
        rndVerbsThree.push(rndVerbsFinal[i]);
        if ((i + 1) % 3 === 0) {
          verbObjectArray.push(rndVerbsThree);
          rndVerbsThree = [];
        }
      }
      setRandomizedVerbs(verbObjectArray);
    }
  }, [verbsLoaded]);

  const evaluate = (accuracy) => {
    if (accuracy) {
      setPoints(points + 20);
      console.log(points);
      setAnswered([...answered, { accuracy: "correct" }]);
      console.log(answered);
    }
    if (!accuracy) {
      setAnswered([...answered, { accuracy: "incorrect" }]);
      console.log(answered);
    }
    setMaxPoints(maxPoints + 20);
  };

  useEffect(() => {
    if (tableCreated && resultsReady && dateTime && !resultsSaved) {
      DatabaseResults.transaction(
        (tx) => {
          tx.executeSql(
            "insert into results (type, language, level, accuracy, q_total, points, maxpoints, percentage, datetime) values (?, ?, ?, ?, ?, ?, ?, ?, ?);",
            [
              1,
              1,
              level,
              results.amountCorrectAnswers,
              answered.length,
              results.totalPoints,
              results.maxPoints,
              results.totalPercentage,
              dateTime,
            ]
          );
        },
        (error) => {
          console.log("Transaction error: ", error);
        },
        null,
        updateList
      );
      setResultsSaved(true);
    }
  }, [resultsReady, dateTime, tableCreated]);

  useEffect(() => {
    updateList();
  }, [resultsSaved]);

  const startAgain = () => {
    setStarted(true);
    setFinished(false);
    setPoints(0);
    setMaxPoints(0);
    setAnswered([]);
    setResults({});
    setResultsReady(false);
    setResultsSaved(false);
  };

  useEffect(() => {
    if (answered.length === 5) {
      setFinished(true);
    }
  }, [answered]);

  useEffect(() => {
    let counter = 0;
    let intervalId = setInterval(() => {
      counter++;
      setCounterState(counter);
    }, 1000);
    if (finished) {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [started, finished]);

  useEffect(() => {
    if (finished) {
      // Sum of correct answers
      let correctAnswers = answered.filter(
        (answer) => answer.accuracy === "correct"
      );
      let totalPoints;
      // Accuracy percentage, i.e. points amount divided by max points
      let accuracyPercentage = (points / maxPoints) * 100.0;
      // If time elapsed is less than 10 seconds and accuracy is at least 80 %, extra points are given
      if (counterState < 10 && accuracyPercentage >= 80) {
        totalPoints = (points + counterState * 0.1) * 1.0;
        // If time elapsed is greater than 30, minus points are given
      } else if (counterState >= 30) {
        totalPoints = (points - counterState * 0.1) * 1.0;
        // If time elapsed is average (not under 10 seconds or over 30 seconds), no bonus or minus points are given
      } else {
        totalPoints = points * 1.0;
      }
      // Weighted percentage: points with bonus points or minus points or without them are divided by max points
      let totalPercentage = (totalPoints / maxPoints) * 100.0;
      setResults({
        totalPoints: totalPoints,
        maxPoints: maxPoints,
        totalPercentage: totalPercentage,
        amountCorrectAnswers: correctAnswers.length,
        totalAnswered: answered.length,
      });
      setDateTime(getCurrentDate());
      setResultsReady(true);
    }
  }, [finished]);

  return (
    <Container style={styles.container}>
      <HeaderComponent title="Verbien merkityksiä" goBack={navigation.goBack} />
      <Content>
        {!randomizedVerbs && <Text>Arvotaan verbejä...</Text>}
        {answered.length < 5 &&
          randomizedVerbs &&
          randomizedVerbs.map((verbGroup, index) => (
            <CardComponentMeanings
              key={index}
              alternatives={verbGroup}
              evaluate={evaluate}
            />
          ))}
        {finished && results && resultsSaved && resultHistory && (
          <>
            <GermanResultView results={results} startAgain={startAgain} />
            <LatestResultsGerman resultHistory={resultHistory} />
          </>
        )}
        {!resultHistory && <Spinner />}
      </Content>
      <FooterComponent />
    </Container>
  );
};

export default GermanMeaningsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d2d2d2",
  },
  contentContainer: {
    padding: 10,
  },
});
