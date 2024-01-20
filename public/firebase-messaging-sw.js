importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCEpUqGpcZdc081pG2ma9OqT2Nm18DcR24",
  authDomain: "newpro-4d81b.firebaseapp.com",
  projectId: "newpro-4d81b",
  storageBucket: "newpro-4d81b.appspot.com",
  messagingSenderId: "1079809265173",
  appId: "1:1079809265173:web:004c55b0fac638529bc81c",
  measurementId: "G-YHCKX9BWNY",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  /**
   * {collapseKey :  undefined, data :  {title: '50% offer for T shirts', message: 'Get extra 10% on your first order. Hurry! offer expires in 2 hours', url: '/offers'}, from :  "1079809265173"}
   */

  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/logo.svg",
  };

  // self.registration.showNotification(notificationTitle, notificationOptions);
});
