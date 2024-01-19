"use client";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA6Hmckf6fNw1zWuT3iDyKlwsRdAFHDXuA",
  authDomain: "tagging-a9f03.firebaseapp.com",
  projectId: "tagging-a9f03",
  storageBucket: "tagging-a9f03.appspot.com",
  messagingSenderId: "70333029107",
  appId: "1:70333029107:web:589e7de09bafb48286f586",
  measurementId: "G-Q9YWGTTQ55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = () => {
  let token = localStorage.getItem("fcm_token");

  if (token) return token;

  return getToken(messaging, {
    vapidKey:
      "BKbw8G0qVh4zY9RCpBjgvUGLT3fuMzTAWQNqDGhqENdJQWJzLjwt85ba_QWzisTboNWEN0q0RJI1EWGBTlVBt2w",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        localStorage.setItem("fcm_token", currentToken);
        return currentToken;
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI console.log('No registration token available. Request permission to generate one.');
        console.log("failed to get token");
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () => {
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    alert("Notificacion");
  });
}
