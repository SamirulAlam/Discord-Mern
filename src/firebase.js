import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAej4X-9dfi0XB_UcfkEYvzNLfiSetzKu0",
  authDomain: "discord-clone-6d4c7.firebaseapp.com",
  projectId: "discord-clone-6d4c7",
  storageBucket: "discord-clone-6d4c7.appspot.com",
  messagingSenderId: "506305542396",
  appId: "1:506305542396:web:d18bc5b3c8920ed07f7f79",
  measurementId: "G-V0CW3MTDBS"
};

  firebase.initializeApp(firebaseConfig)

  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
 