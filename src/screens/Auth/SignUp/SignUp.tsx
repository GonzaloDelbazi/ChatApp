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
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from "../styles/Login.styles";
import { firebaseApi } from "../../../firebaseApi";
const bgImage = require("../../../../assets/bgImage.png");

const SignUp = ({ navigation }: any) => {
  const [toggle, setToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copyPassword, setCopyPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = () => {
    const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    if (regex.test(email)) {
      setEmailError("");
      return true;
    }
    setEmailError("Email no valido");
    return false;
  };

  const validatePasswords = () => {
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
    console.log(password, regex.test(password));
    if (regex.test(password)) {
      if (password === copyPassword) {
        setPasswordError("");
        return true;
      }
      setPasswordError("Las contraseñas no son iguales");
      return false;
    }
    setPasswordError("Porfavor ingrese una contraseña valida");
    return false;
  };

  const onHandleSignUp = () => {
    if (validateEmail() && validatePasswords()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          firebaseApi.saveUser(user);
          console.log("User created");
        })
        .catch((err) => console.error("SignUp error: ", err.message));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={bgImage} style={styles.image} />
      <View style={styles.bodyContainer} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.text}>Crear cuenta</Text>
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
          secureTextEntry={toggle}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Repita la contraseña"
          autoCapitalize="none"
          placeholderTextColor={"#444"}
          autoCorrect={false}
          secureTextEntry={toggle}
          textContentType="password"
          value={copyPassword}
          onChangeText={(text) => setCopyPassword(text)}
        />
        {passwordError && <Text style={{ color: "red" }}>{passwordError}</Text>}
        <TouchableOpacity style={styles.button} onPress={onHandleSignUp}>
          <Text style={styles.buttonText}>Registrarse</Text>
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
            ¿Tienes cuenta?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signUpText}> Inicia Sesión</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SignUp;
