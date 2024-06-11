import { Text, StyleSheet } from "react-native";
import Colors from "../../utils/colors";

function Title({children}) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    // fontWeight: "bold",
    color: Colors.accent100,
    textAlign: "center",
    borderWidth: 2,
    borderColor: Colors.accent100,
    padding: 12,
    fontFamily: 'open-sans-bold' //you can use Verdana and its a built in font
  },
});
