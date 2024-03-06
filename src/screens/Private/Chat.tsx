import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import {
  Firestore,
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { signOut, User } from "firebase/auth";
import { auth, database } from "../../../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import globalStyles from "../../styles/globalStyles";
import { ChatUtils } from "./utils/utils";
import { UserContext } from "../../providers/context/UserContext";
import { firebaseApi } from "../../firebaseApi";
import { doc } from "firebase/firestore";

const { width, height } = Dimensions.get("screen");

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(null);
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const { params } = route;

  const handleSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: params.user.displayName,
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={handleSignOut}>
          <AntDesign
            name="logout"
            size={24}
            color={globalStyles.secondary.backgroundColor}
            style={{ marginRight: 10 }}
          ></AntDesign>
        </TouchableOpacity>
      ),
    });
  });

  useLayoutEffect(() => {
    handleRoom();
    const collectionRef = doc(database, "chats", params.roomId);
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      console.log("snapshot");
      console.log(snapshot.data().messages);
      const sortedArray = ChatUtils.sortArray(snapshot.data().messages);
      setMessages(
        sortedArray.map((message) => ({
          _id: message._id,
          createdAt: message.createdAt.toDate(),
          text: message.text,
          user: message.user,
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  const handleRoom = async () => {
    const myRoom = await ChatUtils.VerifyChatRoomExist([
      params.user.id,
      user.uid,
    ]);
    setRoom(myRoom);
  };

  const onSend = useCallback(async (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    const newMessage = { _id, createdAt, text, user };
    await firebaseApi.addMessageToRoom(newMessage, params.roomId);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, ...globalStyles.secondary }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth?.currentUser.email,
          avatar: "https://i.pravatar.cc/300",
        }}
        messagesContainerStyle={{ ...globalStyles.secondary }}
      />
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
    </SafeAreaView>
  );
};

export default ChatScreen;
