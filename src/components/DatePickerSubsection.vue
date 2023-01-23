<template>
  <Datepicker
    class="subsection-form-control-datepicker"
    :class="{edit: editing}"
    v-model="value"
    :upper-limit="upperLimit"
    :lower-limit="lowerLimit"
    :inline="true"
    :disabled="!editing" />
</template>

<script lang="ts">
import Datepicker from "vue3-datepicker";

export default {
  name: "DatePickerSubsection",
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

<style lang="scss">
.subsection-form-control-datepicker {
  position: relative;
  background-color: var(--primary-color);
  color: white;
  border: rgba(255, 255, 255, 0) solid 0.1rem;
  pointer-events: none;
  margin: 0;
  width: 88%;
  transition: all 0.3s ease-in;
  border-radius: 0.6rem;
  padding: 0.2rem;
}
.subsection-form-control-datepicker.edit {
  border: white solid 0.1rem;
  pointer-events: auto;
  transition: all 0.3s ease-out;
}
.v3dp__datepicker {
  width: 4.8em;
}
</style>
