<template>
  <main class="min-h-screen flex place-items-center">
    <!-- <loading v-if="user.fetchingUser"></loading>
    <sign-in v-else-if="!user.user.auth && !user.fetchingUser"></sign-in>
    <Chat v-else-if="user.user.auth && !user.fetchingUser"></Chat> -->
    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </main>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
.fade-enter-active {
  animation: fade 1s linear;
}
.fadde-leave-active {
  animation: fade 1s linear reverse;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
