<template>
  <div class="mt-2">
    <SwitchCheckbox
      v-if="editing"
      v-model="hasElementList"
      :title="'Add a List'" />
    <subsection-elements v-if="hasElementList" :editing="editing" />
  </div>
</template>

<script lang="ts">
import SwitchCheckbox from "../../../shared/checkbox/SwitchCheckbox.vue";
import SubsectionElements from "./SubsectionElements.vue";
export default {
  name: "SubsectionListSection",
  components: {SwitchCheckbox, SubsectionElements},
  props: {
    editing: {
      type: Boolean,
    },
  },
  data() {
    return {
      hasElementList: false,
    };
  },
};
</script>

<style scoped></style>
