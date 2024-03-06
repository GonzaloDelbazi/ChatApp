import { createStackNavigator } from "@react-navigation/stack";
import { PrivateRoutesParamList } from "./routes.types";
import Home from "./Home";
import ChatScreen from "./Chat";

const Stack = createStackNavigator<PrivateRoutesParamList>();

export const PrivateStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};
