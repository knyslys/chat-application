<template>
  <div
    class="top-bar p-4 flex flex-col gap-4 bg-slate-200 border-b-2 border-lime-600 md:flex-row md:justify-between"
  >
    <div
      class="flex flex-col gap-y-2 md:flex-row gap-x-2 md:place-items-center"
    >
      <the-button @click="userStore.logOut">log out</the-button>
      <slot></slot>
      <slot name="id"></slot>
    </div>
    <div
      class="flex flex-col text-center md:flex-row md:place-items-center gap-x-2"
    >
      <span
        >Username:
        <span class="font-bold">{{ userStore.user.nickname }}</span></span
      >
      <div
        v-if="userStore.user.lobbyId !== 'undefined'"
        class="flex place-items-center justify-center gap-2"
      >
        Your Lobby:
        <span class="font-bold">{{ userStore.user.lobbyId }}</span>
        <Icon
          icon="ph:copy"
          @click="copyToCliboard"
          class="text-lg cursor-pointer"
          :class="{ copy: coppied }"
        />
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
import { Icon } from "@iconify/vue";
const userStore = useUserStore();
const lobbyId = ref();
const coppied = ref(false);
const copyToCliboard = async () => {
  await navigator.clipboard.writeText(userStore.user.lobbyId);
  coppied.value = true;
  setTimeout(() => {
    coppied.value = false;
  }, 1000);
};
</script>

<style scoped>
.copy {
  transition: 0.5s all linear;
  transform: rotate(360deg);
  color: green;
}
</style>
