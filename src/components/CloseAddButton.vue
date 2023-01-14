<template>
  <button
    v-bind:class="{
      'close-icon': closeButton,
    }"
    class="add-icon"
    @click="
      () => {
        if (closeButton) {
          $emit('close-modal');
        }
      }
    ">
    <div class="line line-90deg"></div>
    <div class="line line-180deg"></div>
  </button>
</template>
<script>
export default {
  props: ["closeButton", "clickFunc"],
  name: "CloseAddButton",
  methods: {
    clickMethod() {
      if (this.closeButton) {
        $emit("close-modal");
      } else {
        clickFunc();
      }
    },
  },
};
</script>
<style>
.add-icon {
  background-color: white;
  display: flex;
  position: relative;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  transition: all 0.3s ease-in;
  border: #4c1d95 solid 0.2rem;
  justify-content: space-evenly;
  align-items: center;
}
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
