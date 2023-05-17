<template>
  <div class="container mx-auto">
    <div class="main-wrapper flex flex-col bg-lime-200">
      <top-bar></top-bar>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import TopBar from "../TopBar.vue";
onMounted(() => {
  console.log("YYYYYYYYYYYYYYYYYYYY");
});
</script>

<style lang="scss" scoped></style>
