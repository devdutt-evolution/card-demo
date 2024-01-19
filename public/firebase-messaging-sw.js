// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw";
// import { onBackgroundMessage } from "firebase/messaging/sw";

// let firebaseApp = initializeApp({
//   apiKey: "AIzaSyA6Hmckf6fNw1zWuT3iDyKlwsRdAFHDXuA",
//   authDomain: "tagging-a9f03.firebaseapp.com",
//   projectId: "tagging-a9f03",
//   storageBucket: "tagging-a9f03.appspot.com",
//   messagingSenderId: "70333029107",
//   appId: "1:70333029107:web:589e7de09bafb48286f586",
//   measurementId: "G-Q9YWGTTQ55",
// });

// const messaging = getMessaging(firebaseApp);

// onBackgroundMessage(messaging, (payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = "Background Message Title";
//   const notificationOptions = {
//     body: "Background Message body.",
//     icon: "/firebase-logo.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyA6Hmckf6fNw1zWuT3iDyKlwsRdAFHDXuA",
  authDomain: "tagging-a9f03.firebaseapp.com",
  projectId: "tagging-a9f03",
  storageBucket: "tagging-a9f03.appspot.com",
  messagingSenderId: "70333029107",
  appId: "1:70333029107:web:589e7de09bafb48286f586",
  measurementId: "G-Q9YWGTTQ55",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
