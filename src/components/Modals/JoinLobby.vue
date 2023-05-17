<template>
  <div
    class="modal fixed w-screen h-screen flex flex-col justify-center place-items-center"
    v-if="props.toggle"
  >
    <div
      class="overlay fixed w-screen h-screen bg-lime-950 bg-opacity-30 blur-md top-0 left-0"
      @click="$emit('toggle-back')"
    ></div>

    <div
      class="modal-content container bg-lime-400 flex flex-col relative z-10"
    >
      <div class="modal-top text-center p-4">
        <span>Enter a Lobby Code</span>
      </div>
      <div class="modal-center text-center bg-white p-2">
        <form class="flex flex-col gap-y-2" @submit.prevent="goToLobby">
          <input
            type="text"
            v-model.number="lobbyCode"
            placeholder="Lobby Code"
            class="bg-lime-200 text-center"
          />
          <button @click="makeLobby" v-if="!lobbyExist && !lobbyCreated">
            Join
          </button>
          <span class="text-red-700 text-sm" v-if="error !== ''">{{
            error
          }}</span>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { db } from "../../firebase";
import { doc, getDoc } from "@firebase/firestore";
import router from "../../router";
const props = defineProps({
  toggle: {
    type: Boolean,
  },
});
const error = ref();
const lobbyCode = ref();

const goToLobby = async () => {
  try {
    const d = doc(db, "chats", lobbyCode.value);
    const get = await getDoc(d);
    error.value = "";
    router.push({ path: `/chat&id=${lobbyCode.value}` });
  } catch (e) {
    error.value = "Something went wrong or lobby doesn't exist";
  }
};
</script>

<style scoped></style>
