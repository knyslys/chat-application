<template>
  <div
    class="actions flex flex-col gap-y-4 p-4 justify-center place-items-center place-content-center"
  >
    <!-- modals for joining and creating lobbies -->
    <join-lobby
      :toggle="toggleLobbyJoin"
      @toggle-back="joinLobbyToggle"
      v-if="toggleLobbyJoin"
    ></join-lobby>
    <!-- modals for joining and creating lobbies -->
    <create-lobby
      :toggle="toggleLobbyCreate"
      @toggle-back="lobbyToggle"
      v-if="toggleLobbyCreate"
    ></create-lobby>
    <!-- actions -->
    <the-button @click="lobbyToggle">Create chat lobby</the-button>

    <the-button @click="joinLobbyToggle">Join chat lobby</the-button>
    <!-- actions -->
  </div>
</template>

<script setup>
import TheButton from "../../UI/TheButton.vue";
import CreateLobby from "../../Modals/CreateLobby.vue";
import JoinLobby from "../../Modals/JoinLobby.vue";
import { ref, computed } from "vue";
const toggleLobbyCreate = ref(false);
const toggleLobbyJoin = ref(false);
console.log("hi2");
const lobbyToggle = () => {
  toggleLobbyCreate.value = !toggleLobbyCreate.value;
};
const joinLobbyToggle = () => {
  toggleLobbyJoin.value = !toggleLobbyJoin.value;
};
</script>

<style scoped>
.actions {
  min-height: inherit;
}
</style>
