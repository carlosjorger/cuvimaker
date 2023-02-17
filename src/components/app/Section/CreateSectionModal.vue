<template>
  <div class="modal-overlay">
    <div class="form section-card">
      <header class="form-header">
        <h3>Add a Section</h3>
        <close-add-button
          v-on:click="$emit('close-modal')"
          :closeButton="true"
          :lineColor="'#FFFFFF'"
          :buttonColor="'var(--primary-color)'" />
      </header>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="section.name"
          placeholder="Section Name" />
      </div>
      <div class="form-group">
        <transition-group name="subsection" class="subsection" tag="div">
          <subsection-menu
            v-for="(subsection, index) in section.subsections"
            :key="subsection.id"
            :subsectionIndex="index"
            :section="section"
            :prevSubsection="subsection"
            @removeSubsection="(index:number)=>{
              section.removeSubsection(index)
            }"
            @addNewSubsection="section.addNewSubsection()"
            @disabledEditing="section.disabledEditing()"
            @setEditingIndex="(index:number)=>{
              section.editingIndex = index;
            }" />
        </transition-group>
      </div>
      <button
        v-on:click="$emit('addSection', section)"
        class="form-button"
        @click="$emit('close-modal')">
        Add Section
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import CloseAddButton from "../../shared/Button/CloseAddButton.vue";
import SubsectionMenu from "../Subsection/SubsectionMenu.vue";
import {Section} from "../../../models/Section";
import type {PropType} from "vue";
export default {
  name: "CreateSectionModal",
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  components: {SubsectionMenu, CloseAddButton},

  data(): {section: Section} {
    return this.initialState();
  },
  methods: {
    initialState(): {section: Section} {
      return {
        section: new Section(),
      };
    },
    resetWindow: function () {
      Object.assign(this.$data, this.initialState());
    },
  },

  watch: {
    showModal(newValue) {
      if (newValue) {
        this.resetWindow();
      }
    },
  },
};
</script>
<style>
.save-button {
  background-color: white;
  color: var(--primary-color);
  padding: 0.1rem;
  width: 100%;
  margin-top: 0.5rem;
  font-weight: bold;
}
.modal-overlay {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-self: center;
  background-color: #000000da;
  align-items: center;
  justify-content: space-around;
  height: calc(100% + 20px);
}

.subsection {
  display: block;
  height: 65vh;
  overflow: scroll;
  overflow-x: hidden;
  position: relative;
}

.subsection-move {
  transition: opacity 0.5s ease;
  transition: transform 0.5s ease;
}
.subsection-leave-active {
  transition: all 0.5s ease;
}
.subsection-enter-active {
  transition: all 0.5s ease;
}
.subsection-enter-from,
.subsection-leave-to {
  opacity: 0;
  transform: translateX(-1rem);
}

.subsection-leave-active {
  position: absolute;
}

.form {
  display: flex;
  flex-direction: column;
  margin: 0;
  border: 0.2rem solid white;

  font-size: 1rem;
  background-color: white;
}
.dark .form {
  color: black;
}
.form-header {
  display: flex;
  margin-bottom: 0.5rem;
  justify-content: space-between;
  align-items: center;
}
.form-header > h3 {
  color: var(--primary-color);
  font-size: 1.8em;
}
.form-group {
  margin-bottom: 0.5rem;
  box-sizing: border-box;
}
.form-control {
  margin-top: 0.5rem;
  width: 100%;
  box-sizing: inherit;
}
.form-button {
  height: 5vh;
  padding: 0.2vw;
  width: 100%;
  margin: 0 auto;
}
</style>
