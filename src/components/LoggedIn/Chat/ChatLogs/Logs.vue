<template>
  <div class="container mx-auto">
    <div
      class="main-wrapper flex flex-col bg-lime-200 rounded-md overflow-hidden shadow-md"
    >
      <top-bar>
        <the-button @click="router.push({ path: '/' })">Back</the-button>
        <template #id
          ><span>Current Lobby id: {{ lobbyId }}</span></template
        >
      </top-bar>
      <span class="text-red-500" v-if="error !== ''">{{ error }}</span>
      <div v-else class="chat-logs flex flex-col place-content-between">
        <ul class="p-4 flex flex-col gap-y-2" v-auto-animate>
          <message
            v-for="m in chatsLogs"
            :author="m.author"
            :message="m.message"
            :key="m.id"
          ></message>
        </ul>
      </div>
      <form
        @submit.prevent="writeMessage"
        class="flex place-items-center gap-x-2 p-4 align-text-top md:justify-stretch"
      >
        <input
          type="text"
          maxlength="150"
          v-model.trim="typedMessage"
          class="max-h-40 rounded-md shadow-md pb-20 pl-2"
        />
        <button type="submit">
          <Icon
            icon="bi:send-fill"
            :class="{ typed: typedSuccess }"
            class="text-2xl"
          />
        </button>
      </form>
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
  limit,
  startAfter,
  limitToLast,
} from "@firebase/firestore";
import { ref } from "vue";
import { db } from "../../../../firebase";
import { useRoute } from "vue-router";
import { onUpdated } from "vue";
import Message from "./Message.vue";
import TheButton from "../../../UI/TheButton.vue";
import { onBeforeUpdate } from "vue";
import { Icon } from "@iconify/vue";
const lobbyId = ref();
const rtr = useRoute();
const user = useUserStore();
const error = ref("");
const canShowChat = ref(false);
const chatsLogs = ref([]);
const typedMessage = ref("");
const typedSuccess = ref(false);
const typedDelay = ref(false);
const writeMessage = () => {
  const d = doc(db, "chats", lobbyId.value);
  const c = collection(d, lobbyId.value);
  if (typedMessage.value.length < 1) return;
  if (typedDelay.value) return;
  typedDelay.value = true;
  typedSuccess.value = true;
  addDoc(c, {
    time: new Date().getTime(),
    author: user.user.nickname,
    message: typedMessage.value,
  });
  typedMessage.value = "";

  setTimeout(() => {
    typedSuccess.value = false;
    typedDelay.value = false;
  }, 1000);
};

onBeforeUpdate(async () => {
  const loggedIn = await user.ifLoggedIn();
  if (!loggedIn) {
    console.log("User is not");
    router.push({ name: "home" });
  }
});

onMounted(async () => {
  lobbyId.value = rtr.params.id;

  try {
    const d = doc(db, "chats", lobbyId.value);
    const req = await getDoc(d);
    if (req.data() !== undefined) {
      const c = collection(d, lobbyId.value);

      const ddddd = await getDocs(c);

      console.log("bbz", ddddd);
      const q = query(c, orderBy("time"), limitToLast(10));

      onSnapshot(q, (QuerySnapshot) => {
        const messages = [];
        QuerySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          messages.unshift({
            id: doc.id,

            author: doc.data().author,
            message: doc.data().message,
          });
        });
        chatsLogs.value = messages;
      });
    } else {
      error.value = "Chat not found";
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
input {
  /* height: 5rem; */
  min-width: 50%;
}

.typed {
  transition: 1s all linear;
  transform: rotate(360deg);
  color: white;
}
.chat-logs {
  min-height: 30rem;
  max-height: 30rem;
  overflow-y: scroll;
}
</style>
