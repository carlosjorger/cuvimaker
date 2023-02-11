<template>
  <input
    v-model="value"
    class="subsection-form-control"
    v-if="editing || value"
    :class="{edit: editing}"
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

<style>
.subsection-form-control {
  padding: 0.1rem;
  width: 100%;
  margin-top: 0.5rem;
  border: 0;
  border-radius: 0;
  background-color: inherit;
  pointer-events: none;
  transition: all 0.3s ease-in;
  color: white;
  border-bottom: rgba(255, 255, 255, 0) solid 0.1rem;
  box-shadow: 0;
}

.subsection-form-control.edit {
  border-bottom: white solid 0.1rem;
  transition: all 0.3s ease-out;
  pointer-events: auto;
  box-shadow: 0px 10px 6px -6px #220b44e7;
  font-size: 1em;
}
.subsection-form-control::placeholder {
  transition: all 0.3s ease-in;
  color: rgba(166, 166, 166, 0);
}
.subsection-form-control.edit::placeholder {
  transition: all 0.3s ease-out;
  color: var(--placeholder-color);
}
.subsection-form-control:focus {
  outline: none;
}
</style>
