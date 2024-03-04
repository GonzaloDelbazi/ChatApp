import React, { useEffect, useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ChatScreen, LoginScreen, SignUp, Home } from "./src/screens";
import { auth } from "./config/firebase";
import { UserContext } from "./src/providers/context/UserContext";
import { ActivityIndicator, View } from "react-native";

const Stack = createStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

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
      user ? addUser(user) : addUser(null);
      setTimeout(() => setLoading(false), 1000);
    });
    return () => unsubscribe();
  }, []);
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
      {!user ? <AuthStack /> : <ChatStack />}
    </NavigationContainer>
  );
};

export default Routes;
