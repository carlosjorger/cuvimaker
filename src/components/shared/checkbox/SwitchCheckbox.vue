<template>
  <div class="switch-checkbox">
    <input type="checkbox" class="input-checkbox" v-model="value" />
    <div class="skin one"></div>
    <div class="skin two"></div>
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

<style>
.switch-checkbox {
  display: grid;
  width: 6rem;
  height: 2rem;
  border-radius: 45px;
  padding: 0.5rem;
}
.switch-checkbox > * {
  grid-area: 1/1;
}
.input-checkbox {
  opacity: 0;
  cursor: pointer;
}

.skin {
  pointer-events: none;
  border-radius: inherit;
}

.one.skin {
  background-color: white;
}

.two.skin {
  background-color: purple;

  --mask: radial-gradient(
    circle at 1rem 1rem,
    rgba(0, 0, 0, 0) 0.8rem,
    rgba(0, 0, 0, 1) 0.8rem
  );
  mask-image: var(--mask);
  -webkit-mask-image: var(--mask);
  -webkit-mask-position: 0rem 0rem;
  mask-position: 0rem 0rem;
  transition: all 0.5s ease;
}

.input-checkbox:checked ~ .two.skin {
  --mask: radial-gradient(
    circle at 1rem 1rem,
    rgba(0, 0, 0, 0) 0.8rem,
    rgba(0, 0, 0, 1) 0.8rem
  );

  mask-image: var(--mask);
  -webkit-mask-image: var(--mask);
  -webkit-mask-position: 4rem 0rem;
  mask-position: 4rem 0rem;
  transition: all 0.5s ease;
}
</style>
