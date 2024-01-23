import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  type Messaging,
  type MessagePayload,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCEpUqGpcZdc081pG2ma9OqT2Nm18DcR24",
  authDomain: "newpro-4d81b.firebaseapp.com",
  projectId: "newpro-4d81b",
  storageBucket: "newpro-4d81b.appspot.com",
  messagingSenderId: "1079809265173",
  appId: "1:1079809265173:web:004c55b0fac638529bc81c",
  measurementId: "G-YHCKX9BWNY",
};
let messaging: Messaging;
export const init = () => {
  return new Promise((resolve) => {
    initializeApp(firebaseConfig);
    messaging = getMessaging();
    resolve(true);
  });
};

export { messaging };

export const requestForToken = async () => {
  try {
    let token = localStorage.getItem("fcm_token");
    if (token) return [true, false];
    else {
      let currentToken = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY,
      });
      if (currentToken) {
        // console.log("current token for client: ", currentToken);
        localStorage.setItem("fcm_token", currentToken);
        return [true, false];
      } else {
        return [false, true];
      }
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
    return [false, true];
  }
};

export const onMessageListener = () =>
  new Promise<MessagePayload>((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
