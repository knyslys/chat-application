<template>
  <loading v-if="user.fetchingUser"></loading>
  <sign-in v-else-if="!user.user.auth && !user.fetchingUser"></sign-in>
  <Chat v-else-if="user.user.auth && !user.fetchingUser"></Chat>
</template>

<script setup>
import { useUserStore } from "../stores/user.js";
import SignIn from "../components/SignIn.vue";
import Chat from "../components/LoggedIn/Chat/Chat.vue";
import router from "../router";
import { onMounted } from "vue";

const user = useUserStore();
</script>

<style scoped></style>
