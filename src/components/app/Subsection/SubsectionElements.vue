<template>
  <div class="subsection-addelement">
    <input
      class="subsection-addelement-input"
      v-model="newElement"
      placeholder="New element" />
    <close-add-button 
        :size="2.5"
        v-on:click="addElement()" />
  </div>
  <ul>
    <li v-for="element in subsection.elements" v-bind:my="element">
      {{ element }}
    </li>
  </ul>
</template>

<script>
import {Subsection} from "../../../models/Subsection";
import CloseAddButton from "../../shared/Button/CloseAddButton.vue";
export default {
  name: "SubsectionElements",
  components: {
    CloseAddButton,
  },
  data() {
    return {
      newElement: "",
    };
  },
  props: {
    subsection: {
      type: Subsection,
    },
  },
  methods: {
    addElement() {
      this.subsection.elements.push(this.newElement);
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
</style>
