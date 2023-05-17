<template>
  <main class="min-h-screen flex place-items-center">
    <!-- <loading v-if="user.fetchingUser"></loading>
    <sign-in v-else-if="!user.user.auth && !user.fetchingUser"></sign-in>
    <Chat v-else-if="user.user.auth && !user.fetchingUser"></Chat> -->
    <RouterView></RouterView>
  </main>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped></style>
