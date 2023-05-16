<template>
  <div class="container mx-auto bg-lime-400">
    <create-username v-if="!userStore.user.exist"> </create-username>
    <div class="top-bar p-4 flex justify-between place-items-center" v-else>
      <the-button @click="userStore.logOut">log out</the-button>
      <span
        >Username:
        <span class="font-bold">{{ userStore.user.nickname }}</span></span
      >
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../../../stores/user";
import { ref, onMounted } from "vue";
import TheButton from "../../UI/TheButton.vue";
import CreateUsername from "./CreateUsername.vue";
const userStore = useUserStore();
</script>

<style lang="scss" scoped></style>
