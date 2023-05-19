<template>
  <div
    class="top-bar p-4 flex flex-col gap-4 bg-lime-400 border-b-2 border-lime-600"
  >
    <div class="flex flex-col gap-y-2">
      <the-button @click="userStore.logOut">log out</the-button>
      <slot></slot>
    </div>
    <div class="flex flex-col text-center">
      <span
        >Username:
        <span class="font-bold">{{ userStore.user.nickname }}</span></span
      >
      <div v-if="userStore.user.lobbyId !== 'undefined'">
        Lobby:
        <span class="font-bold">{{ userStore.user.lobbyId }}</span>
        <span @click="copyToCliboard">Coppy</span>
      </div>
    </div>
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
const copyToCliboard = async () => {
  await navigator.clipboard.writeText(userStore.user.lobbyId);
};
</script>

<style lang="scss" scoped></style>
