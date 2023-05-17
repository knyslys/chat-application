<template>
  <div class="container mx-auto">
    <div class="main-wrapper flex flex-col bg-lime-200">
      <top-bar></top-bar>
      <span class="text-red-500" v-if="error !== ''">{{ error }}</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import TopBar from "../TopBar.vue";
import router from "../../../../router";
import { useUserStore } from "../../../../stores/user";
import { doc, getDoc } from "@firebase/firestore";
import { ref } from "vue";
import { db } from "../../../../firebase";
import { useRoute } from "vue-router";
const lobbyId = ref();
const rtr = useRoute();
const user = useUserStore();
const error = ref("");
const canShowChat = ref(false);
onMounted(async () => {
  lobbyId.value = rtr.params.id;
  if (!user.user.auth) {
    console.log("User is not");
    router.push({ name: "home" });
  }

  try {
    const d = doc(db, "chats", lobbyId.value);
    const req = await getDoc(d);
    if (req.data() !== undefined) {
      canShowChat.value = true;
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

<style lang="scss" scoped></style>
