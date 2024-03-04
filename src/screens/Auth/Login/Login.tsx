import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { auth } from "../../../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "../styles/Login.styles";
const bgImage = require("../../../../assets/bgImage.png");

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = () => {
    const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    if (regex.test(email)) {
      setEmailError("");
      return true;
    }
    setEmailError("Email no valido");
    return false;
  };

  const onHandleLogin = () => {
    if (validateEmail && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login Success"))
        .catch((err) => console.error("Login error: ", err.message));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={bgImage} style={styles.image} />
      <View style={styles.bodyContainer} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.text}>Iniciar Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese email"
          autoCapitalize="none"
          placeholderTextColor={"#444"}
          autoCorrect={false}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese contraseña"
          autoCapitalize="none"
          placeholderTextColor={"#444"}
          autoCorrect={false}
          autoFocus={true}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
            ¿No tienes cuenta?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signUpText}> Registrate</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;
