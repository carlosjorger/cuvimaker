<template>
  <div
    class="subsection-element"
    :class="{
      edit: editingElement && selecting && editing,
      selected: selecting && editing,
    }"
    @click="selectElement">
    <input
      ref="fileInput"
      v-model="currentElement"
      class="element-input"
      :class="{
        edit: editingElement && selecting && editing,
      }"
      type="text" />

    <Transition>
      <div
        v-if="selecting && editingElement"
        class="subsection-element-action-buttons">
        <circle-button :size="2.2" @click="saveElement" v-if="editing">
          <Icon icon="el:ok" width="25" color="var(--primary-color)" />
        </circle-button>
        <circle-button :size="2.2" @click="cancelElement" v-if="editing">
          <Icon
            icon="mdi:cancel-bold"
            width="25"
            color="var(--primary-color)" />
        </circle-button>
      </div>
    </Transition>
    <Transition>
      <div
        v-if="selecting && !editingElement"
        class="subsection-element-action-buttons">
        <circle-button :size="2.2" @click="editElement" v-if="editing">
          <Icon
            icon="ic:baseline-edit"
            width="25"
            color="var(--primary-color)" />
        </circle-button>
        <circle-button :size="2.2" @click="deleteElement" v-if="editing">
          <Icon
            icon="ic:baseline-delete"
            width="25"
            color="var(--primary-color)" />
        </circle-button></div
    ></Transition>
  </div>
</template>
<script lang="ts">
import CircleButton from "../../shared/Button/CircleButton.vue";
import {Icon} from "@iconify/vue";
import {ref} from "vue";

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
  setup() {
    const fileInput = ref<HTMLInputElement | null>(null);
    return {
      fileInput,
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
      this.fileInput?.focus();
    },
    saveElement() {
      this.$emit("changeElement", this.currentElement);
      this.editingElement = false;
    },
    selectElement() {
      if (!this.editingElement && this.editing) {
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
  display: flex;
  justify-content: flex-end;
  margin: 0.5rem;
  border-radius: 1.5rem;
  padding: 0.3rem;
  border: rgba(255, 255, 255, 0) solid 0.3rem;
  background-color: #4c1d95;
  transition: all 0.5s ease;
  width: 93%;
  box-shadow: 0px 5px 10px 7px #381868e7;
}
.subsection-element.selected {
  transition: all 0.5s ease;
  background-color: #664596;
}
.subsection-element.edit {
  transition: all 0.5s ease;
  border: rgba(255, 255, 255) solid 0.3rem;
}
.subsection-element-action-buttons {
  position: absolute;
  display: flex;
  align-items: center;
}
.element-input {
  color: white;
  pointer-events: none;
  background-color: inherit;
  border: 0;
  border-radius: 0;
  width: 100%;
}
.element-input.edit {
  pointer-events: auto;
}
.element-input:focus {
  outline: none;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
