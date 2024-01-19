"use client";

import React, { ReactNode } from "react";
// import toast, { Toaster } from 'react-hot-toast';
import { messaging } from "@/utils/firebase";
import { requestForToken, onMessageListener } from "@/utils/firebase";
const App = ({ children }: { children: ReactNode }) => {
  // const [notification, setNotification] = useState({ title: "", body: "" });

  const notify = () => alert("Here is your toast.");

  console.log("messaging", messaging);
  // useEffect(() => {
  //   if (notification) {
  //     notify();
  //   }
  // }, [notification]);
  requestForToken();
  onMessageListener()
    .then((payload) => {
      // setNotification({title: payload?.notification?.title, body: payload?.notification?.body});
      console.log(payload);
      alert(JSON.stringify(payload));
    })
    .catch((err) => console.log("failed: ", err));
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      {children}
    </div>
  );
};
export default App;
