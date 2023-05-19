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
        <form
          class="flex flex-col gap-y-2 justify-center place-items-center"
          @submit.prevent="goToLobby"
        >
          <Icon icon="mdi:content-paste" @click="pasteId" class="text-lg" />
          <input
            type="text"
            v-model.trim="lobbyCode"
            placeholder="Lobby Code"
            class="bg-lime-200 text-center place-self-stretch"
          />
          <the-button
            class="place-self-stretch"
            @click="makeLobby"
            v-if="!lobbyExist && !lobbyCreated"
          >
            Join
          </the-button>
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
import { Icon } from "@iconify/vue";
import TheButton from "../UI/TheButton.vue";
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
    if (get.data() !== undefined) {
      error.value = "";
      router.push({ path: `/chat&id=${lobbyCode.value}` });
    } else {
      error.value = "Something went wrong or lobby doesn't exist";
    }
  } catch (e) {
    error.value = "Something went wrong or lobby doesn't exist";
  }
};

const pasteId = () => {
  navigator.clipboard
    .readText()
    .then((text) => {
      lobbyCode.value = text;
    })
    .catch((err) => {});
};
</script>

<style scoped></style>
