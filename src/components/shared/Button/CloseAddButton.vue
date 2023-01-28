<template>
  <circle-button
    :buttonColor="buttonColor"
    :size="size"
    v-bind:class="{
      'close-icon': closeButton,
    }">
    <div
      :style="{
        backgroundColor: lineColor,
      }"
      class="line line-90deg"></div>
    <div
      :style="{
        backgroundColor: lineColor,
      }"
      class="line line-180deg"></div>
  </circle-button>
</template>
<script lang="ts">
import CircleButton from "./CircleButton.vue";

export default {
  props: {
    closeButton:{ 
      type:Boolean
    }, 
    lineColor:{
      type:String
    }, 
    buttonColor:{
      type:String
    },
    size:{
      type:Number
    }
  },
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
  background-color: var(--primary-color);
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
