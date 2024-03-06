import React, { useEffect, useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ChatScreen, LoginScreen, SignUp, Home } from "./src/screens";
import { auth } from "./config/firebase";
import { UserContext } from "./src/providers/context/UserContext";
import {
  ActivityIndicator,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { PrivateStack } from "./src/screens/Private/routes";
import FirstTime from "./src/screens/Private/FirstTime";
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

const Routes = () => {
  const { user, addUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(true);
      console.log(user);
      user ? addUser(user) : addUser(null);
      setTimeout(() => setLoading(false), 1000);
    });
    return () => unsubscribe();
  }, []);

  const PrivateRoutes = () => {
    if (user.displayName) {
      return <PrivateStack />;
    }
    return <FirstTime />;
  };

  if (loading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <ActivityIndicator size={"large"} color={"black"} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {!user ? <AuthStack /> : <PrivateRoutes />}
    </NavigationContainer>
  );
};

export default Routes;
