<template>
  <button
    type="submit"
    class="text-[var(--primary-color)] bg-white p-2 w-5/12 mt-2 rounded-lg transition-colors duration-500"
    v-on:click="saveSubSection">
    {{ name }}
  </button>
</template>

<script>
export default {
  name: "ModalButton",
  props: {
    name: {
      type: String,
    },
  },
};
</script>
