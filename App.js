import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

import Colors from "./utils/colors";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOVer, setGameIsOver] = useState(false); //initially the game is over, bc before starting the game so the game is over
  const [guessRounds, setGuessRounds] = useState(0);

  // now the fonts are loaded, you can choose any id f.e. 'open-sans'
  // fontsLoaded is boolian true means the fonts loaded
  const [fontsLoaded] = useFonts({
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
    setGameIsOver(false); //set it to be false for the second round !
  }


  // the dafault screen is StartGameScreen
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  // if the user entered a "checked" number then the game will start !
  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOVer) {
    screen = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <LinearGradient
      style={styles.mainScreen}
      colors={[Colors.primary800, Colors.accent500]}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.mainScreen}
        imageStyle={styles.backgroundImage}
      >
        {/* i used the SafeAreaView here cuze i want the background ^^ to fit the hole screen */}
        {/* SafeAreaView used to not allow any component to be below the الدويرة السودا which is on the top of the iphone screen */}
        <SafeAreaView style={styles.mainScreen}>{screen}</SafeAreaView>
        {/* Before was : <StartGameScreen /> */}
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
  },

  backgroundImage: {
    opacity: 0.5,
  },
});

// this will apply the opacity on the input field as well, and i want the opacity on the image only !
// <ImageBackground
// source={require("./assets/images/background.png")}
// resizeMode="cover"
// style={[styles.mainScreen, styles.backgroundImage ]}
// >
