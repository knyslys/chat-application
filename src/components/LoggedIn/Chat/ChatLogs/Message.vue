<template>
  <li>
    <span>{{ author }}:</span>
    <span>{{ message }}</span>
  </li>
</template>

<script setup>
const props = defineProps({
  author: {
    type: String,
  },
  message: {
    type: String,
  },
});
const { author, message } = props;
</script>

<style scoped></style>
