import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  Firestore,
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { signOut } from "firebase/auth";
import { auth, database } from "../../../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import globalStyles from "../../styles/globalStyles";

const { width, height } = Dimensions.get("screen");

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
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
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("snapshot");
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <View style={{ flex: 1, paddingBottom: 20 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth?.currentUser.email,
          avatar: "https://i.pravatar.cc/300",
        }}
        messagesContainerStyle={{ ...globalStyles.primary }}
      />
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

export default ChatScreen;
