<template>
  <div class="">
    <Datepicker
      class="pointer-events-none relative w-full p-1 border-b-white border-b-0 bg-inherit text-white transition-all duration-300 ease-out focus:outline-none"
      :class="{
        ['pointer-events-auto  border-b-4  ease-out ']: editing,
      }"
      v-model="value"
      :upper-limit="upperLimit"
      :lower-limit="lowerLimit"
      :inline="true"
      :disabled="!editing" />
    <div class="h-6">
      <div v-for="error of v$.value.$errors" :key="error.$uid">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import Datepicker from "vue3-datepicker";

export default {
  name: "SubsectionDatePicker",
  setup() {
    return {v$: useVuelidate({$scope: true})};
  },
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
  validations: {
    value: {
      required,
    },
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

<style>
.v3dp__datepicker {
  width: 8.5em;
}
</style>
