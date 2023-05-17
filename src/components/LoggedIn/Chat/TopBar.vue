<template>
  <div class="top-bar p-4 flex justify-between place-items-center bg-lime-400">
    <the-button @click="userStore.logOut">log out</the-button>
    <span
      >Username:
      <span class="font-bold">{{ userStore.user.nickname }}</span></span
    >
    <span v-if="userStore.user.lobbyId !== 'undefined'"
      >Lobby: <span class="font-bold">{{ userStore.user.lobbyId }}</span></span
    >
  </div>
</template>

<script setup>
import TheButton from "../../UI/TheButton.vue";
import { useUserStore } from "../../../stores/user";
import { ref } from "vue";
import { onMounted } from "vue";
import { db } from "../../../firebase";
import { onSnapshot } from "@firebase/firestore";
import { doc } from "@firebase/firestore";
import { onBeforeRouteUpdate } from "vue-router";
const userStore = useUserStore();
const lobbyId = ref();
// onMounted(async () => {});

// onBeforeRouteUpdate(() => {});
</script>

<style lang="scss" scoped></style>
