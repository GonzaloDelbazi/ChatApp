import { StyleSheet, Dimensions } from "react-native";
import globalStyles from "../../../styles/globalStyles";

const { width, height } = Dimensions.get("screen")

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        flex: 1,
        marginHorizontal: 20,
        justifyContent: "center",
        alignItems: 'center'
    },
    input: {
        backgroundColor: "gray",
        marginBottom: 20,
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        height: "8%",
        width: "95%"
    },
    bodyContainer: {
        bottom: 0,
        borderTopLeftRadius: 100,
        backgroundColor: "#444",
        position: "absolute",
        height: "75%",
        width: "100%",
        borderWidth: 1,
    },
    button: {
        ...globalStyles.primary,
        height: "9%",
        width: "95%",
        borderRadius: 10,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: "center"
    },
    buttonText: {
        fontWeight: "bold",
        color: "white",
        fontSize: 21
    },
    text: {
        fontSize: 35,
        color: "white",
        textAlign: "center",
        paddingVertical: 44,
        fontWeight: "bold"
    },
    signUpText: { 
        color: globalStyles.primary.backgroundColor, 
        fontWeight: "600", 
        fontSize: 14 
    },
    image: {
        top: 0,
        height: 300,
        position: "absolute",
        resizeMode: "cover"
    }
})