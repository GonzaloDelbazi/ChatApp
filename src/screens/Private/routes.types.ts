import { StackScreenProps } from "@react-navigation/stack";
import { UserFirestore } from "../../interfaces/User.interfaces";

export type PrivateRoutesParamList = {
  Home: undefined;
  Chat: { user: UserFirestore; roomId: string };
};

export type PrivateNavigationProps = StackScreenProps<
  PrivateRoutesParamList,
  "Chat"
>;
