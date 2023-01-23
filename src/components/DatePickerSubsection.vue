<template>
  <Datepicker
    class="subsection-form-control-datepicker"
    :class="{edit: editing}"
    v-model="date"
    :upper-limit="upperLimit"
    :lower-limit="lowerLimit"
    :inline="true"
    :disabled="!editing" />
</template>

<script lang="ts">
import Datepicker from "vue3-datepicker";
import {Subsection} from "../models/Subsection";

export default {
  name: "DatePickerSubsection",
  props: {
    subsection: {
      type: Subsection,
      required: true,
    },

    upperLimit: {
      type: Date,
    },
    lowerLimit: {
      type: Date,
    },
    ifFrom: {
      type: Boolean,
      required: true,
    },
    editing: {
      type: Boolean,
      required: true,
    },
  },

  components: {Datepicker},

  computed: {
    date: {
      get() {
        if (this.ifFrom) {
          return this.subsection.dateFrom;
        } else {
          return this.subsection.dateTo;
        }
      },
      set(val: Date) {
        if (this.ifFrom) {
          this.subsection.dateFrom = val;
        } else {
          this.subsection.dateTo = val;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
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
