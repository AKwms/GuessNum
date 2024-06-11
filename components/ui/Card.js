import { StyleSheet, View } from "react-native";
import Colors from "../../utils/colors";
function Card({children}) {
    return <View style={styles.card}>{children}</View>;
}


export default Card;


const styles=StyleSheet.create({
    card: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 36,
        marginHorizontal: 24,
        borderRadius: 8,
        padding: 16,
        backgroundColor: Colors.primary800,
        shadowColor: "black",
        shadowOffset: { width: 10, height: 10 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
      }
})