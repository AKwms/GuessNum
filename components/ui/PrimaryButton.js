import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../utils/colors";

function PrimaryButton({ children, whenPress }) {
  function pressHandler() {}

  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.pressedItem, styles.NotpressedItem]
          : styles.NotpressedItem
      }
      onPress={whenPress}
    >
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}> {children} </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.primary500,
    borderRadius: 8,
    paddingVertical: 8,
    margin: 8,
    paddingHorizontal: 10,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 6,
    shadowOpacity: 0.4,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
  },

  pressedItem: {
    opacity: 0.5,
  },

  NotpressedItem: {},
});

//same pupose of the above ^^
// function PrimaryButton(props) {
//     return (
//         <View>
//             <Text> {props.children} </Text>
//         </View>
//     )
// }

// -------------------------------------------------------
// if pressed == true then apply the opacity to it !
//# <Pressable onPress={pressHandler} style={({pressed}) => pressed && styles.pressedItem}>

//if pressed == true then apply the other style + the opacity if false apply only the other style
// style={({ pressed }) =>
//     pressed
//   ? [styles.pressedItem, styles.NotpressedItem]
//   : styles.NotpressedItem
//   }

export default PrimaryButton;
