<template>
  <div class="subsection-addelement" v-if="editing">
    <input
      class="subsection-addelement-input"
      v-model="newElement"
      placeholder="New element" />
    <close-add-button :size="2.5" v-on:click="addElement()" />
  </div>
  <!-- TODO close this error -->
  <span v-if="!errors.text.valid && editing">{{ errors.text.error }}</span>
  <transition-group
    name="subsection-elements"
    class="subsection-elements-list"
    tag="div">
    <SubsectionElement
      v-for="(element, index) in subsection.elements"
      :key="element.id"
      :editing="editing"
      @selectElement="
        selectedElement = selectedElement != index ? index : undefined
      "
      @removeElement="subsection.elements.splice(index, 1)"
      @changeElement="
          (v:string) => {
            subsection.elements[index].name = v;
          }
        "
      :selecting="selectedElement == index"
      :element="element.name" />
  </transition-group>
</template>

<script lang="ts">
import {Subsection} from "../../../models/Subsection";
import CloseAddButton from "../../shared/Button/CloseAddButton.vue";
import SubsectionElement from "./SubsectionElement.vue";
export default {
  name: "SubsectionElements",
  components: {
    CloseAddButton,
    SubsectionElement,
  },
  data() {
    return {
      newElement: "",
      selectedElement: true ? undefined : 0,
      errors: {
        text: {valid: true, error: ""},
      },
    };
  },
  props: {
    subsection: {
      type: Subsection,
      required: true,
    },
    editing: {
      type: Boolean,
    },
  },
  methods: {
    addElement() {
      if (!this.validate()) {
        return;
      }
      this.subsection.addElement(this.newElement);
      this.newElement = "";
    },
    validate() {
      return !this.editing || this.validateElement();
    },
    validateElement() {
      if (this.newElement == "") {
        this.errors.text.valid = false;
        this.errors.text.error = "Element are required";
      } else {
        this.errors.text.valid = true;
        this.errors.text.error = "";
      }
      return this.errors.text.valid;
    },
  },
};
</script>

<style>
.subsection-addelement {
  display: flex;
  background-color: inherit;
  border-radius: 1.5rem;
  justify-content: space-between;
  padding: 0.3rem;
  border: solid 0.1rem white;
  margin-top: 0.5rem;
  box-shadow: 0px 5px 10px 7px #381868e7;
}
.subsection-addelement-input {
  color: white;
  background-color: inherit;
  font-size: 1.1em;
  width: 80%;
  border: none;
  outline: none;
}

.subsection-elements-move {
  transition: all 0.5s ease;
}
.subsection-elements-leave-active {
  transition: all 0.5s ease;
}
.subsection-elements-enter-active {
  transition: all 0.5s ease;
}
.subsection-elements-enter-from,
.subsection-elements-leave-to {
  opacity: 0;
  transform: translateX(-1rem);
}
.subsection-elements-leave-active {
  position: absolute;
}
.subsection-elements-list {
  position: relative;
  display: block;
}
</style>
