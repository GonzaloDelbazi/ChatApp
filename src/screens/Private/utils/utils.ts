import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { database } from "../../../../config/firebase";
import { firebaseApi } from "../../../firebaseApi";

export const ChatUtils = {
  async getCurrentRoomId(collaborators: string[]) {
    const collectionRef = collection(database, "chats");
    const querySnapshot = await getDocs(
      query(
        collectionRef,
        where("collaborators", "array-contains-any", collaborators)
      )
    );
    return querySnapshot.docs.map((doc) => doc.data())[0];
  },
  async VerifyChatRoomExist(collaborators: string[]) {
    try {
      const room = await ChatUtils.getCurrentRoomId(collaborators);
      console.log("NO ENCONTRE NADA: ", room);
      if (!room) {
        return await ChatUtils.CreateNewRoom(collaborators);
      } else {
        return room;
      }
    } catch (error) {
      console.error(error);
    }
  },
  async CreateNewRoom(collaborators: string[]) {
    const myRoomData = {
      collaborators: collaborators,
      messages: [],
      lastMsg: "",
    };
    return await firebaseApi.createNewChatRoom(myRoomData);
  },
  sortArray(array) {
    return array.sort(function (a, b) {
      // Convert the date strings to Date objects
      let dateA = new Date(a.createdAt.toDate());
      let dateB = new Date(b.createdAt.toDate());

      // Subtract the dates to get a value that is either negative, positive, or zero
      return dateB.getTime() - dateA.getTime();
    });
  },
};
