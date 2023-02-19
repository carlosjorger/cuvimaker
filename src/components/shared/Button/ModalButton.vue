<template>
  <button
    type="submit"
    class="text-[var(--primary-color)] p-2 w-5/12 mt-2 rounded-lg transition-colors duration-500"
    :class="{
      [' bg-transparent']: invisible,
      [' bg-white']: !invisible,
    }"
    v-on:click="saveSubSection">
    {{ name }}
  </button>
</template>

<script>
export default {
  name: "ModalButton",
  props: {
    invisible: {
      type: Boolean,
    },
    name: {
      type: String,
    },
  },
};
</script>
