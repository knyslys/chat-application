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
import { doc, getDoc, where, setDoc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const fetchingUser = ref(true);
  const user = ref({
    // auth: false,
    uid: "0",
    exist: undefined,
  });

  // fetchingUser.value = true;
  onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
      user.value.auth = true;
      user.value.uid = authUser.uid;
      console.log("auth: " + authUser.uid);
      console.log("authexist: " + user.value.exist);
      checkIfUserExist();
      fetchingUser.value = false;
    } else {
      user.value.auth = false;
      user.value.uid = "0";
      user.value.exist = undefined;
      console.log("NE");
      fetchingUser.value = false;
    }
  });

  const ifLoggedIn = async () => {
    console.log(auth.currentUser);
    return auth.currentUser;
  };

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // user.value.credential = GoogleAuthProvider.credentialFromResult(result);
        user.value.uid = GoogleAuthProvider.credentialFromResult(result).uid;
        user.value.auth = true;
        // The signed-in user info.
        fetchingUser.value = false;
        const user = result.user;
        //...
      })
      .catch((error) => {
        fetchingUser.value = false;
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        //...
      });
    fetchingUser.value = false;
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        user.value.auth = false;
        user.value.uid = "0";
        localStorage.removeItem("auth");
        fetchingUser.value = false;
        router.push({ path: "/" });
      })
      .catch((error) => {});
  };

  const checkIfUserExist = () => {
    const d = doc(db, "users", user.value.uid);

    console.log("testas: " + user.value.uid);
    onSnapshot(d, (snapshot) => {
      user.value.lobbyId = snapshot.data().lobby;
    });

    console.log("testas");
    user.value.fetchingUser = true;
    const ref = doc(db, "users", user.value.uid);
    let exist = undefined;

    getDoc(ref)
      .then((u) => {
        console.log("FIRST CIRCLE" + u.exists());
        if (u.exists()) {
          user.value.exist = true;
          user.value.nickname = u.data().nickname;
        } else {
          user.value.exist = false;
        }
        user.value.fetchingUser = false;
      })
      .catch((er) => {
        console.log(er);
        user.value.fetchingUser = false;
      });
    console.log("get user exist function:" + exist);
  };

  const registerUser = async (username) => {
    const nickname = username.toLowerCase();
    const ref = doc(db, "users", user.value.uid);
    await setDoc(ref, {
      nickname: nickname,
    });
    user.value.exist = true;
    user.value.nickname = nickname;
  };
  return {
    user,
    signIn,
    logOut,
    checkIfUserExist,
    registerUser,
    fetchingUser,
    ifLoggedIn,
  };
});
