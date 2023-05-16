import { defineStore } from "pinia";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { ref, onMounted } from "vue";
import { db } from "../firebase/index.js";
import { doc, getDoc, where } from "firebase/firestore";
export const useUserStore = defineStore("user", () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const user = ref({
    auth: false,
    uid: "0",
    credential: "0",
  });

  onMounted(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        user.value.auth = true;
        user.value.uid = authUser.uid;
        console.log(authUser.uid);
      } else {
        user.value.auth = false;
        user.value.uid = "0";
      }
    });
  });

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // user.value.credential = GoogleAuthProvider.credentialFromResult(result);
        user.value.uid = GoogleAuthProvider.credentialFromResult(result).uid;
        user.value.auth = true;
        // The signed-in user info.

        const user = result.user;
        //...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        //...
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        user.value.auth = false;
        user.value.uid = "0";
      })
      .catch((error) => {});
  };

  const checkIfUserExist = () => {
    console.log("testas");
    const ref = doc(db, "users", user.value.uid);
    console.log(user.value.uid);

    getDoc(ref)
      .then((u) => {
        console.log(u.exists());
        return u.exists();
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return { user, signIn, logOut, checkIfUserExist };
});
