import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { UserFirestore } from "../../interfaces/User.interfaces";
import { useCallback } from "react";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

const { width, height } = Dimensions.get("screen");

type props = {
  items: UserFirestore[];
  loading: boolean;
  onPressButton: (item: UserFirestore) => void;
};
const BottomSheetUserList = ({ items, onPressButton, loading }: props) => {
  const UserCard = useCallback(({ user }) => {
    const pressed = () => {
      onPressButton(user);
    };

    return (
      <TouchableOpacity onPress={pressed} style={styles.userContainer}>
        <View style={styles.imageCont}></View>
        <Text style={styles.text}>{user.displayName}</Text>
      </TouchableOpacity>
    );
  }, []);

  if (loading) {
    <View
      style={{ alignItems: "center", justifyContent: "center", height: height }}
    >
      <ActivityIndicator color={"white"} size={"small"} />
    </View>;
  }

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <UserCard user={item} />}
      keyExtractor={(item: UserFirestore) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  userContainer: {
    flexDirection: "row",
    width: "100%",
    height: height * 0.1,
    borderBottomWidth: 0.5,
    borderColor: "gray",
    alignItems: "center",
    padding: 20,
  },
  imageCont: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    marginRight: 20,
  },
});

export default BottomSheetUserList;
