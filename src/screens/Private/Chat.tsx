import React from "react";
import { View, KeyboardAvoidingView, Platform, Dimensions } from "react-native"
import { GiftedChat } from "react-native-gifted-chat"

const { width, height } = Dimensions.get('screen')

const ChatScreen = () => {
  return (
    <View style={{ flex: 1, paddingBottom: 20 }}>
      <GiftedChat messages={[]}/>
      {
          Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
      }
    </View>
  )
}

export default ChatScreen;