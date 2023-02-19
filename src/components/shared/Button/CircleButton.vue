<template>
  <button
    :style="{
      backgroundColor: buttonColor,
      width: `${size}rem`,
      height: `${size}rem`,
      padding: `${(size ?? 0) / 12}rem`,
    }"
    type="button"
    class="rounded-full bg-white flex relative w-12 h-12 p-1 m-0.5 cursor-pointer transition-all duration-300 ease-in justify-evenly items-center">
    <slot></slot>
  </button>
</template>
<script lang="ts">
export default {
  props: {
    buttonColor: {
      type: String,
    },
    size: {
      type: Number,
    },
  },
  name: "CircleButton",
  methods: {},
};
</script>
