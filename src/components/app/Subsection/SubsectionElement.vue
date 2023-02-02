<template>
  <div
    class="subsection-element"
    :class="{
      edit: editingElement && selecting,
      selected: selecting,
    }"
    @click="selectElement">
    <input
      v-model="currentElement"
      class="element-input"
      :class="{
        edit: editingElement && selecting,
      }"
      type="text" />
    <div
      v-if="selecting && editingElement"
      class="subsection-element-action-buttons">
      <circle-button :size="2.2" @click="saveElement" v-if="editing">
        <Icon icon="el:ok" width="25" color="var(--primary-color)" />
      </circle-button>
      <circle-button :size="2.2" @click="cancelElement" v-if="editing">
        <Icon icon="mdi:cancel-bold" width="25" color="var(--primary-color)" />
      </circle-button>
    </div>
    <div
      v-if="selecting && !editingElement"
      class="subsection-element-action-buttons">
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
    selecting: {
      type: Boolean,
      required: true,
    },
    editing: {
      type: Boolean,
      required: true,
    },
    element: {
      type: String,
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
    selecting(newValue: boolean) {
      if (!newValue) {
        this.cancelElement();
      }
    },
  },
};
</script>

<style>
.subsection-element {
  margin: 0.5rem;
  border-radius: 1.5rem;
  padding: 0.3rem;
  display: flex;
  justify-content: space-between;
  border: rgba(255, 255, 255, 0) solid 0.3rem;
  background-color: #4c1d95;
  transition: all 0.5s ease;
}
.subsection-element.selected {
  transition: all 0.5s ease;
  background-color: #664596;
}
.subsection-element.edit {
  border: rgba(255, 255, 255) solid 0.3rem;
}
.subsection-element-action-buttons {
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
