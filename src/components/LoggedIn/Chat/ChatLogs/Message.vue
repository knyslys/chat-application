<template>
  <li class="bg-white p-2 rounded-md flex flex-col shadow-md msg">
    <span class="font-bold">{{ author }}:</span>
    <span>{{ checkText(message) }}</span>
  </li>
</template>

<script setup>
import { checkText } from "smile2emoji";
const props = defineProps({
  author: {
    type: String,
  },
  message: {
    type: String,
  },
});
const { author, message } = props;
// message = checkText(message);
</script>

<style scoped>
.msg {
  animation: fade 0.5s ease-in;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
