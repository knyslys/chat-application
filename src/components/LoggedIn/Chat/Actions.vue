<template>
  <div
    class="actions flex flex-col gap-y-4 p-4 justify-center place-items-center place-content-center"
  >
    <!-- modals for joining and creating lobbies -->
    <create-lobby
      :toggle="toggleLobbyCreate"
      @toggle-back="lobbyToggle"
      v-if="lobbyToggle"
    ></create-lobby>
    <!-- modals for joining and creating lobbies -->

    <!-- actions -->
    <the-button @click="lobbyToggle">Create chat lobby</the-button>

    <the-button>Join chat lobby</the-button>
    <!-- actions -->
  </div>
</template>

<script setup>
import TheButton from "../../UI/TheButton.vue";
import CreateLobby from "../../Modals/CreateLobby.vue";
import { ref, computed } from "vue";
const toggleLobbyCreate = ref(false);
console.log("hi2");
const lobbyToggle = () => {
  console.log("hi");
  toggleLobbyCreate.value = !toggleLobbyCreate.value;
};
</script>

<style scoped>
.actions {
  min-height: inherit;
}
</style>
