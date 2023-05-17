<template>
  <Transition name="fade" mode="out-in">
    <div class="container mx-auto">
      <create-username v-if="!userStore.user.exist"> </create-username>

      <chat-content v-else></chat-content>
    </div>
  </Transition>
</template>

<script setup>
import { useUserStore } from "../../../stores/user";
import { ref, onMounted } from "vue";
import TheButton from "../../UI/TheButton.vue";
import CreateUsername from "./CreateUsername.vue";

import ChatContent from "./ChatContent.vue";
const userStore = useUserStore();
</script>

<style scoped>
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
.fade-leave-active,
.fade-enter-active {
  transition: 0.5s all linear;
}
.fade-enter-to {
  opacity: 1;
}
</style>
