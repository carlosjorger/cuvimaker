<template>
  <div class="mt-2">
    <SwitchCheckbox
      v-if="editing"
      v-model="hasPeriodOfTime"
      :title="'Add a time interval'" />
    <div
      class="mt-2"
      v-if="
        (editing || (timeInterval.dateFrom && timeInterval.dateTo)) &&
        hasPeriodOfTime
      ">
      <VueDatePicker
        :range="true"
        v-model="interval"
        :min-date="from"
        :max-date="to"
        :disabled="!editing"
        v-on:update:model-value="handleTimeInterval"
        teleport-center
        required />
    </div>
  </div>
</template>

<script lang="ts">
import {TimeInterval} from "../../../../models/SubsectionTimeInterval";
import SubsectionDatePicker from "./SubsectionDatePicker.vue";
import SwitchCheckbox from "../../../shared/checkbox/SwitchCheckbox.vue";
import {inject} from "vue";
import {Subsection} from "../../../../models/Subsection";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
export default {
  name: "SubsectionTimeInterval",
  props: {
    editing: {
      type: Boolean,
      required: true,
    },
    subsectionTimeIntervalProp: {
      type: TimeInterval,
    },
    validating: {
      type: Boolean,
    },
  },
  components: {SubsectionDatePicker, SwitchCheckbox, VueDatePicker},

  data() {
    return {
      subsection: inject("subsection", new Subsection()),
      hasPeriodOfTime: false,
      from: new Date(1999, 1, 1),
      to: new Date(),
      timeInterval: new TimeInterval(),
      interval: <Date[]>[],
    };
  },
  methods: {
    handleTimeInterval(modelData: Date[]) {
      if (modelData.length > 0) {
        this.timeInterval.dateFrom = modelData[0];
        this.timeInterval.dateTo = modelData[1];
      }

      // do something else with the data
    },
  },
  mounted() {
    this.timeInterval =
      this.subsectionTimeIntervalProp?.copy() ?? new TimeInterval();
    if (
      this.timeInterval.dateFrom != undefined &&
      this.timeInterval.dateTo != undefined
    ) {
      this.interval = [this.timeInterval.dateFrom!, this.timeInterval.dateTo!];
    }
  },

  watch: {
    hasPeriodOfTime(newValue: boolean) {
      this.subsection.subsectionTimeInterval = newValue
        ? this.timeInterval
        : undefined;
    },
  },
};
</script>
