<template>
  <input
    v-model="value"
    class="block p-1 w-10/10 mt-2 bg-inherit border-white text-white placeholder-gray-500 focus:outline-none"
    v-if="editing || value"
    :class="{
      ['border-solid border-b-4  pointer-events-auto shadow-xl transition-all duration-300']:
        editing,
      ['border-solid border-b-0  pointer-events-none shadow-none transition-all duration-300']:
        !editing,
    }"
    type="text" />
</template>

<script lang="ts">
export default {
  name: "SubsectionForm",
  props: {
    editing: {
      type: Boolean,
    },
    modelValue: {
      type: String,
    },
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value: String) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>
