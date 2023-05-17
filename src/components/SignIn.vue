<template>
  <div class="container mx-auto">
    <XyzTransitionGroup
      appear
      class="bbz text-center flex flex-col place-items-center"
    >
      <h1 class="uppercase" :key="1">Chatzy</h1>
      <p key="1">
        Chatzy is a chat application built with VUE.JS where you can chat with
        your friends!
      </p>
      <button
        class="flex justify-center place-items-center gap-2 bg-lime-500 text-white font-bold p-3 mt-3 rounded-lg hover:bg-lime-600 duration-500"
        @click="user.signIn"
        key="2"
      >
        <span key="3">Sign In with Google</span>
        <Icon icon="mdi:google" />
      </button>
    </XyzTransitionGroup>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
// import { GoogleAuthProvider } from "firebase/auth";
import { useUserStore } from "../stores/user";
const user = useUserStore();
</script>

<style scoped>
.bbz {
  --xyz-rotate-x: 90deg;
  --xyz-rotate-z: -180deg;
  --xyz-origin: -200%;
  --xyz-stagger: 0.1s;
  --xyz-duration: 0.75s;
  --xyz-perspective: 100px;
  --xyz-translate-z: 100px;
  --xyz-translate-y: 10vh;
}
</style>
