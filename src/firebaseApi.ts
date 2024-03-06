import { uuidv4 } from "@firebase/util";
import { auth, database } from "../config/firebase";
import { User } from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export const firebaseApi = {
  async createNewChatRoom(currentData) {
    const roomId = uuidv4();
    const collectionRef = collection(database, "chats");
    const newChat = {
      roomId: roomId,
      collaborators: currentData.collaborators,
      messages: currentData.messages,
      lastMsg: currentData.lastMsg,
    };
    try {
      await setDoc(doc(collectionRef, `${roomId}`), newChat);
      return newChat;
    } catch (error) {
      console.error(error);
    }
  },
  async sendMessageToRoom(item) {
    const collectionRef = collection(database, "chats");
    updateDoc(doc(collectionRef, `${item.roomId}`), {
      messages: item.messages,
      lastMsg: item.messages[0],
    });
  },

  async saveUser(user: User) {
    const collectionRef = collection(database, "users");
    await setDoc(doc(collectionRef, user.uid), {
      id: user.uid,
      displayName: user.displayName,
      email: user.email,
      imageUrl: user.photoURL,
    });
  },
  updateDisplayName(user: User) {
    const collectionRef = collection(database, "users");
    updateDoc(doc(collectionRef, user.uid), {
      displayName: user.displayName,
    });
  },
  getChatsById(id) {
    const collectionRef = collection(database, "chats");
    const q = query(
      collectionRef,
      where("collaborators", "array-contains", id)
    );
  },
  async addMessageToRoom(message, roomId) {
    updateDoc(doc(database, "chats", roomId), {
      messages: arrayUnion(message),
    });
  },
  //   saveInCollection(collection, data customId) {

  //   }
};
