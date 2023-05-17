<template>
  <div class="top-bar p-4 flex justify-between place-items-center bg-lime-400">
    <the-button @click="userStore.logOut">log out</the-button>
    <span
      >Username:
      <span class="font-bold">{{ userStore.user.nickname }}</span></span
    >
  </div>
</template>

<script setup>
import TheButton from "../../UI/TheButton.vue";
import { useUserStore } from "../../../stores/user";
const userStore = useUserStore();
</script>

<style lang="scss" scoped></style>
