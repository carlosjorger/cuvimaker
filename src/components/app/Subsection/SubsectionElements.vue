<template>
  <div class="subsection-addelement" v-if="editing">
    <input
      class="subsection-addelement-input"
      v-model="newElement"
      placeholder="New element" />
    <close-add-button :size="2.5" v-on:click="addElement()" />
  </div>

  <transition-group
    name="subsection-elements"
    class="subsection-elements-list"
    tag="ul">
    <li v-for="(element, index) in subsection.elements" :key="element.id">
      <SubsectionElement
        editing
        @selectElement="
          selectedElement = selectedElement != index ? index : undefined
        "
        @removeElement="subsection.elements.splice(index, 1)"
        @changeElement="
          (v:string) => {
            subsection.elements[index].name = v;
          }
        "
        :element="element.name"
        :index-element="index"
        :selectedElement="selectedElement" />
    </li>
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
      this.subsection.addElement(this.newElement);
      this.newElement = "";
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
.subsection-elements {
  display: flex;
  justify-content: space-between;
}
.subsection-elements-action-buttons {
  display: flex;
  align-items: center;
}
.subsection-elements-list {
  list-style-type: none;
}
</style>
