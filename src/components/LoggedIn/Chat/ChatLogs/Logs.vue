<template>
  <div class="container mx-auto">
    <div class="main-wrapper flex flex-col bg-lime-200">
      <top-bar></top-bar>
      <span class="text-red-500" v-if="error !== ''">{{ error }}</span>
      <div v-else class="chat-logs flex flex-col place-content-between">
        <ul class="p-4 flex flex-col gap-y-2">
          <message
            v-for="m in chatsLogs"
            :author="m.author"
            :message="m.message"
            :key="m.id"
          ></message>
        </ul>

        <form
          @submit.prevent="writeMessage"
          class="flex place-items-center gap-x-2"
        >
          <textarea type="text" v-model.trim="typedMessage" class="max-h-40" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import TopBar from "../TopBar.vue";
import router from "../../../../router";
import { useUserStore } from "../../../../stores/user";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  collectionGroup,
  where,
  query,
  onSnapshot,
  QuerySnapshot,
  addDoc,
  orderBy,
} from "@firebase/firestore";
import { ref } from "vue";
import { db } from "../../../../firebase";
import { useRoute } from "vue-router";
import { onUpdated } from "vue";
import Message from "./Message.vue";
const lobbyId = ref();
const rtr = useRoute();
const user = useUserStore();
const error = ref("");
const canShowChat = ref(false);
const chatsLogs = ref([]);
const typedMessage = ref("");

const writeMessage = () => {
  const d = doc(db, "chats", lobbyId.value);
  const c = collection(d, lobbyId.value);
  addDoc(c, {
    time: new Date().getTime(),
    author: user.user.nickname,
    message: typedMessage.value,
  });
};

onMounted(async () => {
  lobbyId.value = rtr.params.id;
  if (!user.user.auth) {
    console.log("User is not");
    router.push({ name: "home" });
  }

  onUpdated(async () => {
    if (canShowChat.value) {
      console.log("chat");
    }
  });

  try {
    const d = doc(db, "chats", lobbyId.value);
    const req = await getDoc(d);
    if (req.data() !== undefined) {
      // const museums = query(collectionGroup(db, "chats"));
      // const querySnapshot = await getDocs(museums);
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      // });
      const c = collection(d, lobbyId.value);
      const q = query(c, orderBy("time"));

      // const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      //   messages.push({
      //     author: doc.data().author,
      //     message: doc.data().message,
      //   });
      // });
      onSnapshot(q, (QuerySnapshot) => {
        const messages = [];
        QuerySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          messages.push({
            id: doc.id,

            author: doc.data().author,
            message: doc.data().message,
          });
        });
        chatsLogs.value = messages;
      });
    } else {
      console.log("nera");
    }
  } catch (e) {
    error.value = "Lobby doesn't exist or something went wrong";
    canShowChat.value = false;
    console.log(e);
  }

  console.log("lobbyid: " + lobbyId.value);
});
</script>

<style scoped>
.chat-logs {
  min-height: 30rem;
  max-height: 30rem;
  overflow-y: scroll;
}
</style>
