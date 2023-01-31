<template>
  <div class="subsection-elements" @click="select">
    <input
      v-model="currentElement"
      class="element-input"
      :class="{
        edit: editingElement,
      }"
      type="text" />
    <div
      v-if="indexElement == selectedElement"
      class="subsection-elements-action-buttons">
      <circle-button :size="2.2" @click="editSaveElement" v-if="editing">
        <Icon
          :icon="editingElement ? 'el:ok' : 'ic:baseline-edit'"
          width="25"
          color="var(--primary-color)" />
      </circle-button>
      <circle-button :size="2.2" @click="deleteCancel" v-if="editing">
        <Icon
          :icon="editingElement ? 'mdi:cancel-bold' : 'ic:baseline-delete'"
          width="25"
          color="var(--primary-color)" />
      </circle-button>
    </div>
  </div>
</template>
<script lang="ts">
import CircleButton from "../../shared/Button/CircleButton.vue";
import {Icon} from "@iconify/vue";

export default {
  name: "SubsectionElement",
  props: {
    selectedElement: {
      type: Number,
    },
    editing: {
      type: Boolean,
      required: true,
    },
    element: {
      type: String,
      required: true,
    },
    indexElement: {
      type: Number,
      required: true,
    },
  },
  components: {CircleButton, Icon},
  data() {
    return {
      currentElement: "",
      editingElement: false,
    };
  },
  methods: {
    deleteCancel() {
      if (!this.editingElement) {
        this.$emit("removeElement");
      } else {
        this.resetElementValue();
      }
    },
    editSaveElement() {
      if (!this.editingElement) {
        this.editingElement = true;
      } else {
        this.$emit("changeElement", this.currentElement);
        this.editingElement = false;
      }
    },
    select() {
      if (!this.editingElement) {
        this.$emit("selectElement");
      }
    },
    resetElementValue() {
      this.currentElement = this.element;
      this.editingElement = false;
    },
  },
  mounted() {
    this.resetElementValue();
  },
};
</script>

<style>
.subsection-elements {
  display: flex;
  justify-content: space-between;
}
.subsection-elements-action-buttons {
  display: flex;
  align-items: center;
}
.element-input {
  color: white;
  pointer-events: none;
  background-color: inherit;
  border: 0;
  border-radius: 0;
  border-bottom: rgba(255, 255, 255, 0) solid 0.1rem;
}
.element-input.edit {
  pointer-events: auto;
  border-bottom: rgba(255, 255, 255) solid 0.1rem;
}
</style>
