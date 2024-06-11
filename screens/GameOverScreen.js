import { View, Image, StyleSheet, Text } from "react-native";
import Title from "../components/ui/Title";
import Colors from "../utils/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({roundsNumber, userNumber, onStartNewGame}) {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/success.png")}
          style={styles.image}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to
        guess the number <Text style={styles.highlight}>{userNumber}</Text>
      .</Text>
      <PrimaryButton whenPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
  );
}
// i added <Text> component inside <Text> component to make the style of the X and Y different than the rest of text !
export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainer: {
    borderRadius: 200,
    width: 350,
    height: 350,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden", //to hide the non-radius edges of the image
    margin: 36,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  summaryText: {
    fontFamily: "open-sans",
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15
  },

  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
