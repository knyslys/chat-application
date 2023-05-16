<template>
  <div class="text-center" v-if="!user.checkIfUserExist()">
    <span>Looks like It's your first time here. </span>
    <span
      >Please enter your username, It will be visible to other chat
      members.</span
    >
    <form>
      <input
        type="text"
        maxlength="10"
        placeholder="Your username"
        class="p-2 rounded-lg shadow-md mt-3"
      />
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from "../../../stores/user";
const user = useUserStore();
</script>

<style lang="scss" scoped></style>
