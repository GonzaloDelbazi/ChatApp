import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./src/screens/Chat";

const Stack = createStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName="chat">
      <Stack.Screen name="chat" component={ChatScreen}/>
    </Stack.Navigator>
  )
}

const Routes = () => {
  
  return (
    <NavigationContainer>
      <ChatStack />
    </NavigationContainer>
  )
}

export default Routes;