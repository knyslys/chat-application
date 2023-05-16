<template>
  <main class="min-h-screen flex place-items-center">
    <loading v-if="user.fetchingUser"></loading>
    <sign-in v-else-if="!user.user.auth && !user.fetchingUser"></sign-in>
    <Chat v-else-if="user.user.auth && !user.fetchingUser"></Chat>
  </main>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import SignIn from "./components/SignIn.vue";
import Chat from "./components/LoggedIn/Chat/Chat.vue";

import { onMounted } from "vue";
import { useUserStore } from "./stores/user.js";
const user = useUserStore();
</script>

<style scoped></style>
