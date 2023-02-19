<template>
  <Datepicker
    class="pointer-events-none relative w-11/12 p-1 border-b-white border-b-0 bg-inherit text-white transition-all duration-300 ease-out focus:outline-none"
    :class="{
      ['pointer-events-auto  border-b-4  transition-all duration-300 ease-out ']:
        editing,
    }"
    v-model="value"
    :upper-limit="upperLimit"
    :lower-limit="lowerLimit"
    :inline="true"
    :disabled="!editing" />
</template>

<script lang="ts">
import Datepicker from "vue3-datepicker";

export default {
  name: "SubsectionDatePicker",
  props: {
    upperLimit: {
      type: Date,
    },
    lowerLimit: {
      type: Date,
    },
    editing: {
      type: Boolean,
    },
    modelValue: {
      type: Date,
    },
  },
  emits: ["update:modelValue"],
  components: {Datepicker},

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

<style>
.v3dp__datepicker {
  width: 6.7em;
}
</style>
