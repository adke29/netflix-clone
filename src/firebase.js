import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDyptK6viQ3XyvJ_Obk6LpOP-u5bijXIK4",
    authDomain: "netflix-clone-bda93.firebaseapp.com",
    projectId: "netflix-clone-bda93",
    storageBucket: "netflix-clone-bda93.appspot.com",
    messagingSenderId: "115327930838",
    appId: "1:115327930838:web:5e839d913f27e503d95477"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = "firebaseApp.firestore();"
  const auth = getAuth(firebaseApp);

  export {auth}
  export default db;