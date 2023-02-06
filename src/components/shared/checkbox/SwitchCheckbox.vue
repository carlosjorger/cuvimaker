<template>
  <div>
    <input type="checkbox" v-model="value" />
  </div>
</template>

<script lang="ts">
export default {
  name: "SwitchCheckbox",
  props: {
    modelValue: {
      type: Boolean,
    },
  },
  emits: ["update:modelValue"],
  setup() {
    return {};
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value: Date) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style scoped></style>
