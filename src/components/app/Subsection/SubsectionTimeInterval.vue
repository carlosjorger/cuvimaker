<template>
  <SwitchCheckbox
    v-if="editing"
    v-model="hasPeriodOfTime"
    :title="'Add a time interval'" />
  <div
    class="flex justify-start items-center"
    v-if="
      (editing || (timeInterval.dateFrom && timeInterval.dateTo)) &&
      hasPeriodOfTime
    ">
    <subsection-date-picker
      v-model="timeInterval.dateFrom"
      :editing="editing"
      :upperLimit="timeInterval.dateTo"
      :lowerLimit="from" />
    <span>//</span>
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
import {inject} from "vue";
import {Subsection} from "../../../models/Subsection";

export default {
  name: "SubsectionTimeInterval",
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
      subsection: inject("subsection", new Subsection()),
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
      this.subsection.subsectionTimeInterval = newValue
        ? this.timeInterval
        : undefined;
    },
  },
};
</script>
