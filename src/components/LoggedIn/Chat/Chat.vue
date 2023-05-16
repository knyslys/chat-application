<template>
  <div class="container mx-auto">
    <button @click="user.logOut">log out</button>

    <create-username v-if="!user.checkIfUserExist()"> </create-username>
  </div>
</template>

<script setup>
import { useUserStore } from "../../../stores/user";
import CreateUsername from "./CreateUsername.vue";
const user = useUserStore();
</script>

<style lang="scss" scoped></style>
