<template>
  <circle-button
    v-bind:class="{
      'close-icon': closeButton,
    }">
    <div class="line line-90deg"></div>
    <div class="line line-180deg"></div>
  </circle-button>
</template>
<script>
import CircleButton from "./CircleButton.vue";

export default {
  props: ["closeButton"],
  name: "CloseAddButton",
  components: {CircleButton},
  methods: {},
};
</script>
<style>
.close-icon {
  transform: rotate(45deg);
}
.line {
  position: absolute;
  height: 0.25rem;
  width: 50%;
  background-color: #4c1d95;
  border-radius: 2px;
  transition: all 0.3s ease-in;
}
.line-90deg {
  transform: rotate(90deg);
}
.line-180deg {
  transform: rotate(180deg);
}
</style>
