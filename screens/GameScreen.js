import { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text, FlatList } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";

import GuessLogItem from "../components/game/GuessLogItem";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

// floor used to give a decimal number, random fun gives a random number between 0,1 (1 excluded) ! thats why i multiplied it with max - min
// to make sure the min number isn't zero so i "+" min.
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundry = 1;
let maxBoundry = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initGuess = generateRandomBetween(1, 100, userNumber); //Note: 100 is excluded
  const [currentGuess, setCurrentGuess] = useState(initGuess);
  const [guessRounds, setGuessRounds] = useState([initGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length); // execute gameOverHandler fun on app.js which is true initially.
    }
  }, [currentGuess, userNumber, onGameOver]); // these are the dependencies of the useEffect, when any dependency change the if state. will execute

  useEffect(() => {
    minBoundry = 1;
    maxBoundry = 100;
  }, []); //since the max and min keep changing during the guesses so i used [] empty dependencies to ensure the max and min will return to its values for the first time only !

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie", "You know this is wrong !", [
        { text: "Sorry!", style: "cancle" },
      ]);
      return;
    }

    if (direction === "lower") {
      //direction => 'lower', 'greater'
      maxBoundry = currentGuess;
    } else {
      minBoundry = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundry,
      maxBoundry,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  }

  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title> Opponent's guess </Title>
      <NumberContainer> {currentGuess} </NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText2}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton whenPress={nextGuessHandler.bind(this, "lower")}>
              <AntDesign name="minus" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton whenPress={nextGuessHandler.bind(this, "greater")}>
              <Entypo name="plus" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* {guessRounds.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text> //i used the guessing number as a key bc its rare to guess the same number twice
        ))} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
  },

  buttonsContainer: {
    flexDirection: "row",
  },

  buttonContainer: {
    flex: 1,
  },
  //to write over the template <InstructionText> you have to pass style to the InstructionText function by {children, style}
  instructionText2: {
    marginBottom: 40,
  },

  listContainer: {
    //remove it to see the difference
    flex: 1,
    padding: 16,
  },
});
