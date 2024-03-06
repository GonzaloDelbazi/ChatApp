import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import globalStyles from "../../styles/globalStyles";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { database } from "../../../config/firebase";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import BottomSheetUserList from "../components/BottomSheetUserList";
import { UserFirestore } from "../../interfaces/User.interfaces";
import { PrivateNavigationProps } from "./routes.types";
import { ChatUtils } from "./utils/utils";
import { UserContext } from "../../providers/context/UserContext";

const catImageUrl =
  "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

const Home = () => {
  const navigation = useNavigation<PrivateNavigationProps["navigation"]>();
  const [chats, setChats] = useState([]);
  const { user } = useContext(UserContext);
  const [userList, setUserList] = useState<UserFirestore[]>();
  const [loadingUser, setLoadingUser] = useState(true);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [500], []);

  const showBottomSheet = () => {
    bottomSheetRef.current.expand();
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome
          name="search"
          size={24}
          color={globalStyles.secondary.backgroundColor}
          style={{ marginLeft: 15 }}
        />
      ),
      headerRight: () => (
        <Image
          source={{ uri: catImageUrl }}
          style={{
            width: 40,
            height: 40,
            marginRight: 15,
          }}
        />
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    setLoadingUser(true);
    getUserList();
    setLoadingUser(false);

    // return () => unsubscribe();
  }, []);

  const getUserList = async () => {
    const collectionRef = collection(database, "users");
    const querySnapshot = await getDocs(collectionRef);
    setUserList(
      querySnapshot.docs.map((doc) => ({
        displayName: doc.data().displayName,
        imageUrl: doc.data().imageUrl,
        email: doc.data().email,
        id: doc.data().id,
      }))
    );
  };

  const onHandleNewChat = async (item: UserFirestore) => {
    const chatRoom = await ChatUtils.VerifyChatRoomExist([item.id, user.uid]);
    console.log(chatRoom);
    navigation.navigate("Chat", { user: item, roomId: chatRoom.roomId });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showBottomSheet} style={styles.chatButton}>
        <Entypo
          name="chat"
          size={24}
          color={globalStyles.tertiary.backgroundColor}
        />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        backgroundStyle={globalStyles.secondary}
        animateOnMount={true}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
      >
        <BottomSheetUserList
          items={userList}
          onPressButton={onHandleNewChat}
          loading={loadingUser}
        ></BottomSheetUserList>
      </BottomSheet>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#fff",
  },
  chatButton: {
    ...globalStyles.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: globalStyles.primary.backgroundColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  },
});
