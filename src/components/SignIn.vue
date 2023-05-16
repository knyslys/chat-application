<template>
  <div
    class="container mx-auto text-center flex flex-col place-items-center gap-3"
  >
    <h1 class="uppercase">Chatzy</h1>
    <p>
      Chatzy is a chat application built with VUE.JS where you can chat with
      your friends!
    </p>
    <button
      class="flex justify-center place-items-center gap-2 bg-lime-500 text-white font-bold p-3 mt-3 rounded-lg hover:bg-lime-600 duration-500"
      @click="user.signIn"
    >
      <span>Sign In with Google</span>
      <Icon icon="mdi:google" />
    </button>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
// import { GoogleAuthProvider } from "firebase/auth";
import { useUserStore } from "../stores/user";
const user = useUserStore();
</script>

<style lang="scss" scoped></style>
