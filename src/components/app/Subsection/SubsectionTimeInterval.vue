<template>
  <SwitchCheckbox
    v-if="editing"
    v-model="hasPeriodOfTime"
    :title="'Add a time interval'" />
  <div
    class="subsection-form-control-datepicker-group"
    v-if="
      (editing || (timeInterval.dateFrom && timeInterval.dateTo)) &&
      hasPeriodOfTime
    ">
    <subsection-date-picker
      v-model="timeInterval.dateFrom"
      :editing="editing"
      :upperLimit="timeInterval.dateTo"
      :lowerLimit="from" />
    <span
      :class="{
        hidden: !timeInterval.dateFrom && !timeInterval.dateTo && !editing,
      }"
      class="subsection-form-control-datepicker-span"
      >//</span
    >
    <subsection-date-picker
      v-model="timeInterval.dateTo"
      :editing="editing"
      :upperLimit="to"
      :lowerLimit="timeInterval.dateFrom" />
  </div>
</template>

<script lang="ts">
import {TimeInterval} from "../../../models/SubsectionTimeInterval";
import SubsectionDatePicker from "./SubsectionDatePicker.vue";
import SwitchCheckbox from "../../shared/checkbox/SwitchCheckbox.vue";
import {emit} from "process";

export default {
  name: "SubsectionTimeInterval",
  emits: ["setTimeInterval"],
  props: {
    editing: {
      type: Boolean,
    },
    subsectionTimeIntervalProp: {
      type: TimeInterval,
    },
  },
  components: {SubsectionDatePicker, SwitchCheckbox},
  data() {
    return {
      hasPeriodOfTime: false,
      from: new Date(1999, 1, 1),
      to: new Date(),
      timeInterval: new TimeInterval(),
    };
  },
  mounted() {
    this.timeInterval =
      this.subsectionTimeIntervalProp?.copy() ?? new TimeInterval();
  },
  watch: {
    hasPeriodOfTime(newValue: boolean) {
      if (newValue) {
        this.$emit("setTimeInterval", this.timeInterval);
      } else {
        this.$emit("setTimeInterval", undefined);
      }
    },
  },
};
</script>

<style>
.subsection-form-control-datepicker-group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.subsection-form-control-datepicker-span {
  transition: all 0.5s ease;
}
.subsection-form-control-datepicker-span.hidden {
  color: rgba(255, 255, 255, 0);
  transition: all 0.5s ease;
}
</style>
