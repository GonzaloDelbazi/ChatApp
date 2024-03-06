import { useContext, useState } from "react";
import { UserContext } from "../../providers/context/UserContext";
import { auth } from "../../../config/firebase";
import { updateProfile } from "firebase/auth";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import globalStyles from "../../styles/globalStyles";
import { firebaseApi } from "../../firebaseApi";

const FirstTime = () => {
  const { user, addUser } = useContext(UserContext);
  const [userName, setUserName] = useState("");

  const saveDisplayName = () => {
    updateProfile(auth.currentUser, {
      displayName: userName,
    })
      .then(() => {
        addUser({ ...user, displayName: userName });
        firebaseApi.updateDisplayName(user);
        console.log("Usuario actualizado");
      })
      .catch((error) => console.log(error));
  };

  return (
    <View
      style={{
        backgroundColor: "#3b3b3b",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: "#fff3",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          borderRadius: 20,
          height: "40%",
        }}
      >
        <TextInput
          placeholder="Ingrese su nombre de usuario"
          style={{
            borderRadius: 15,
            width: "90%",
            height: "16%",
            backgroundColor: "#3b3b3b",
            padding: 15,
          }}
          placeholderTextColor={"white"}
          value={userName}
          onChangeText={setUserName}
        ></TextInput>
        <TouchableOpacity
          style={{
            width: "90%",
            height: "14%",
            marginTop: 20,
            borderRadius: 30,
            ...globalStyles.primary,
            padding: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={saveDisplayName}
        >
          <Text>Aceptar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FirstTime;
