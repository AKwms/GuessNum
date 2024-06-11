import { TextInput, View, StyleSheet, Alert, Text } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../utils/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber('');
  }

  function confirmInputHandler() {
    // parseInt converts string to a number !, because although i used keyboardType="number-pad". receive the numbers as a string :)
    const chosenNumber = parseInt(enteredNumber);
    // if the user doesn't enter a string ?
    // BTW, isNaN means is Not a Number
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      // show an alert
      Alert.alert(
        "Invalid number", //title
        "Number has to be a number between 1 and 99", //message
        [{ text: "Okay", style: "default", onPress: resetInputHandler }] //the button, the style can be 'destructive, cancle, default
      );
      return;
    }
    onPickNumber(chosenNumber);
  }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess my number!</Title>
      <Card>
        <InstructionText>Enter a number:</InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          value={enteredNumber}
          onChangeText={numberInputHandler}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton whenPress={resetInputHandler}> Reset </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton whenPress={confirmInputHandler}>
              Confirm
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

//export the function
export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center' 
  },


  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "thin",
    textAlign: "center",
  },

  buttonsContainer: {
    flexDirection: "row",
  },

  buttonContainer: {
    flex: 1,
  }
});

//  elevation: 4, elevation is an andriod only property the num indicates the level of the shadow !
// shadowOpacity: 0.25, indicates how strong the shadow is
