<template>
  <div class="subsection-addelement" v-if="editing">
    <input 
      class="subsection-addelement-input"
      v-model="newElement"
      placeholder="New element" />
    <close-add-button 
        :size="2.5"
        v-on:click="addElement()" />
  </div>
 
  <transition-group name="subsection-elements" tag="ul">
      <li v-for="element in subsection.elements" :key="element.trim()" class="subsection-elements">
        <h3>
          {{ element }}
        </h3>
        <div class="subsection-elements-action-buttons">
          <circle-button :size="2.2"
            v-if="editing">
            <Icon
              icon="ic:baseline-mode-edit"
              width="25"
              color="var(--primary-color)" /> </circle-button
        >
        <circle-button :size="2.2"
            v-if="editing">
            <Icon
              icon="ic:baseline-delete"
              width="25"
              color="var(--primary-color)" /> </circle-button
        >
        </div>
      </li>
    </transition-group>
</template>

<script lang="ts">
import {Subsection} from "../../../models/Subsection";
import CloseAddButton from "../../shared/Button/CloseAddButton.vue";
import {Icon} from "@iconify/vue";
import CircleButton from "../../shared/Button/CircleButton.vue";

export default {
  name: "SubsectionElements",
  components: {
    CloseAddButton, Icon, CircleButton
  },
  data() {
    return {
      newElement: "",
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
.subsection-elements{
  display: flex;
  justify-content: space-between;
}
.subsection-elements-action-buttons{
  display: flex;
  align-items: center;
}
</style>
