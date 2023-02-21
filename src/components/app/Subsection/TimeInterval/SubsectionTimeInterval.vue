<template>
  <div class="mt-2">
    <VueDatePicker
      :range="true"
      v-model="interval"
      :min-date="from"
      :max-date="to"
      :disabled="!editing"
      v-on:update:model-value="handleTimeInterval"
      teleport-center
      required />
    <div v-for="error of v$.timeInterval.dateFrom.$errors" :key="error.$uid">
      <div class="error-msg">{{ error.$message }}</div>
    </div>
    <div v-for="error of v$.timeInterval.dateTo.$errors" :key="error.$uid">
      <div class="error-msg">{{ error.$message }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {TimeInterval} from "../../../../models/SubsectionTimeInterval";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
export default {
  name: "SubsectionTimeInterval",

  components: {VueDatePicker},
  props: {
    editing: {
      type: Boolean,
      required: true,
    },
    timeInterval: {
      type: TimeInterval,
      required: true,
    },
    hasPeriodOfTime: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    return {v$: useVuelidate({$scope: true})};
  },
  data() {
    return {
      from: new Date(1999, 1, 1),
      to: new Date(),
      interval: <Date[]>[],
    };
  },
  mounted() {
    if (
      this.timeInterval.dateFrom != undefined &&
      this.timeInterval.dateTo != undefined
    ) {
      this.interval = [this.timeInterval.dateFrom!, this.timeInterval.dateTo!];
    }
  },
  methods: {
    handleTimeInterval(dateRange: Date[]) {
      if (dateRange.length > 0) {
        this.timeInterval.dateFrom = dateRange[0];
        this.timeInterval.dateTo = dateRange[1];
      }
    },
  },
  validations: {
    timeInterval: {
      dateFrom: {
        required,
      },
      dateTo: {
        required,
      },
    },
  },
};
</script>

<style scoped></style>
