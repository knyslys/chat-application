<template>
  <!-- <loading v-if="user.user.fetchingUser"></loading> -->
  <div class="text-center" v-if="!user.user.fetchingUser">
    <span>Looks like It's your first time here. </span>
    <span
      >Please enter your username, It will be visible to other chat
      members.</span
    >
    <form
      @submit.prevent="user.registerUser(enteredUsername)"
      class="flex flex-col place-items-center gap-y-4"
    >
      <input
        type="text"
        maxlength="10"
        placeholder="Your username"
        v-model="enteredUsername"
        class="p-2 rounded-lg shadow-md mt-3"
      />
      <the-button>Im ready!</the-button>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from "../../../stores/user";
import { ref } from "vue";
import TheButton from "../../UI/TheButton.vue";
const enteredUsername = ref("");
const user = useUserStore();
</script>

<style lang="scss" scoped></style>
