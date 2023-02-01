<template>
  <div
    class="subsection-elements"
    :class="{
      edit: editingElement && indexElement == selectedElement,
      selected: indexElement == selectedElement,
    }"
    @click="selectElement">
    <input
      v-model="currentElement"
      class="element-input"
      :class="{
        edit: editingElement && indexElement == selectedElement,
      }"
      type="text" />
    <div
      v-if="indexElement == selectedElement && editingElement"
      class="subsection-elements-action-buttons">
      <circle-button :size="2.2" @click="saveElement" v-if="editing">
        <Icon icon="el:ok" width="25" color="var(--primary-color)" />
      </circle-button>
      <circle-button :size="2.2" @click="cancelElement" v-if="editing">
        <Icon icon="mdi:cancel-bold" width="25" color="var(--primary-color)" />
      </circle-button>
    </div>
    <div
      v-if="indexElement == selectedElement && !editingElement"
      class="subsection-elements-action-buttons">
      <circle-button :size="2.2" @click="editElement" v-if="editing">
        <Icon icon="ic:baseline-edit" width="25" color="var(--primary-color)" />
      </circle-button>
      <circle-button :size="2.2" @click="deleteElement" v-if="editing">
        <Icon
          icon="ic:baseline-delete"
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
    deleteElement() {
      this.$emit("removeElement");
    },
    cancelElement() {
      this.resetElementValue();
    },
    editElement() {
      this.editingElement = true;
    },
    saveElement() {
      this.$emit("changeElement", this.currentElement);
      this.editingElement = false;
    },
    selectElement() {
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
  watch: {
    selectedElement(newValue: number) {
      if (newValue != this.indexElement) {
        this.cancelElement();
      }
    },
  },
};
</script>

<style>
.subsection-elements {
  border-radius: 1.5rem;
  padding: 0.3rem;
  display: flex;
  justify-content: space-between;
  border: rgba(255, 255, 255, 0) solid 0.1rem;
}
.subsection-elements.selected {
  background-color: #664596;
}
.subsection-elements.edit {
  border: rgba(255, 255, 255) solid 0.1rem;
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
  width: 80%;
}
.element-input.edit {
  pointer-events: auto;
}
.element-input:focus {
  outline: none;
}
</style>
