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
        {{ title }}
      </div>
      <div class="modal-center text-center bg-white p-2">
        <!-- <span class="font-bold" v-if="!lobbyExist"> {{ lobbyId }}</span>
        <span class="font-bold" v-else>Delete current lobby!</span> -->
        <button @click="makeLobby" v-if="!lobbyExist && !lobbyCreated">
          Create
        </button>
        <div v-if="lobbyCreated">
          <span>Your lobby code: {{ lobbyId }}</span>
          <span @click="copyToCliboard">Coppy</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import uniqid from "uniqid";
import { onMounted } from "vue";
import { db } from "../../firebase";
import {
  collection,
  setDoc,
  addDoc,
  getDoc,
  updateDoc,
} from "@firebase/firestore";
import { doc } from "@firebase/firestore";
import { onBeforeUpdate } from "vue";
import { onBeforeMount } from "vue";
import { useUserStore } from "../../stores/user";
import { ref, watch } from "vue";

const user = useUserStore();
const lobbyExist = ref(false);
const lobbyCreated = ref(false);
const title = ref("Create a lobby");

let lobbyId;
const props = defineProps({
  toggle: {
    type: Boolean,
  },
});

const makeLobby = async () => {
  lobbyId = uniqid();
  const dUser = doc(db, "users", user.user.uid);
  const alreadyHasLobby = await getDoc(dUser);
  if (alreadyHasLobby.data().lobby) {
    lobbyExist.value = true;
    title.value = "You already have a lobby!";
    console.log("yra jau");
    return;
  }

  const d = doc(db, "chats", lobbyId);
  const c = collection(d, lobbyId);
  const get = await getDoc(d);

  await setDoc(d, {});
  await addDoc(c, {});
  await updateDoc(dUser, {
    lobby: lobbyId,
  });
  lobbyCreated.value = true;
  title.value = "Lobby created!";
};
</script>

<style lang="scss" scoped></style>
