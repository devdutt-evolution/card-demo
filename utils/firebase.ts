import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  projectId: process.env.FIREBASE_projectId,
  storageBucket: process.env.FIREBASE_storageBucket,
  messagingSenderId: process.env.FIREBASE_messagingSenderId,
  appId: process.env.FIREBASE_appId,
  measurementId: process.env.FIREBASE_measurementId,
};
// Initialize Firebase
initializeApp(firebaseConfig);
const messaging = getMessaging();

export { messaging };

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey: process.env.FIREBASE_vapidKey,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
      } else {
        console.log("failed to get token");
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      // {"from":"1079809265173","messageId":"8322e519-86a3-4696-a280-a55aeb1bc2bc","data":{"title":"50% offer for T shirts","message":"Get extra 10% on your first order. Hurry! offer expires in 2 hours","url":"/offers"}}
      resolve(payload);
    });
  });
