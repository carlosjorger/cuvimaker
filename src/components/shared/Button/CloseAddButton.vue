<template>
  <circle-button
    :buttonColor="buttonColor"
    :size="size"
    v-bind:class="{
      'rotate-45': closeButton,
    }">
    <div
      :style="{
        backgroundColor: lineColor,
      }"
      class="absolute h-1 w-1/2 bg-[var(--primary-color)] rounded-sm transition-all duration-300 rotate-90"></div>
    <div
      :style="{
        backgroundColor: lineColor,
      }"
      class="absolute h-1 w-1/2 bg-[var(--primary-color)] rounded-sm transition-all duration-300 rotate-180"></div>
  </circle-button>
</template>
<script lang="ts">
import CircleButton from "./CircleButton.vue";

export default {
  props: {
    closeButton: {
      type: Boolean,
    },
    lineColor: {
      type: String,
    },
    buttonColor: {
      type: String,
    },
    size: {
      type: Number,
    },
  },
  name: "CloseAddButton",
  components: {CircleButton},
  methods: {},
};
</script>
