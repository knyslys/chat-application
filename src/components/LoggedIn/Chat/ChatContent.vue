<template>
  <div class="main-wrapper flex flex-col bg-lime-200">
    <top-bar></top-bar>
    <actions></actions>
  </div>
</template>

<script setup>
import TopBar from "./TopBar.vue";
import Actions from "./Actions.vue";
</script>

<style scoped>
.main-wrapper {
  min-height: 25rem;
}
</style>
