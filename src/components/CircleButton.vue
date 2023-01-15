<template>
  <button class="button-icon">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "CircleButton",
  methods: {},
};
</script>
<style>
.button-icon {
  background-color: white;
  display: flex;
  position: relative;

  width: 3rem;
  height: 3rem;
  padding: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease-in;
  border: #4c1d95 solid 0.2rem;
  justify-content: space-evenly;
  align-items: center;
}
</style>
