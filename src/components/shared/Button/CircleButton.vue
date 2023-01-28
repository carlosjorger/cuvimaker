<template>
  <button
    :style="{
      backgroundColor: buttonColor,
      width: `${size}rem`,
      height: `${size}rem`,
      padding: `${(size??0)/12}rem`
    }"
    class="button-icon">
    <slot></slot>
  </button>
</template>
<script lang="ts">
export default {
  props:{
    buttonColor:{
      type:String
    },
    size:{
      type:Number
    }
  },
  name: "CircleButton",
  methods: {},
};
</script>
<style>
.button-icon {
  border-radius: 50%;
  background-color: white;
  display: flex;
  position: relative;

  width: 3rem;
  height: 3rem;
  padding: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease-in;
  border: var(--primary-color) solid 0.2rem;
  justify-content: space-evenly;
  align-items: center;
}
</style>
