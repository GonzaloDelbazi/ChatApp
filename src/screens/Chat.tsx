import React from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native"
// import { GiftedChat } from "react-native-gifted-chat"


const ChatScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <GiftedChat messages={[]}/> */}
      {
          Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
      }
    </View>
  )
}

export default ChatScreen;