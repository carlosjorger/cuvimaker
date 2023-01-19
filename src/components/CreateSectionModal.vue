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
          v-model="tempSectionName"
          placeholder="Section Name" />
      </div>
      <div class="form-group">
        <transition-group name="subsection" class="subsection" tag="div">
          <subsection-menu
            v-for="(subsection, index) in subsections"
            :key="subsection.title"
            :index="index"
            :subsections="subsections"
            :subsection="subsection" />
        </transition-group>
      </div>
      <button
        v-on:click="addToDo"
        class="form-button"
        @click="$emit('close-modal')">
        Add Section
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import {Subsection} from "../models/Subsection";
import CloseAddButton from "./CloseAddButton.vue";
import SubsectionMenu from "./SubsectionMenu.vue";
import {Icon} from "@iconify/vue";
import {Section} from "../models/Section";
export default {
  name: "CreateSectionModal",
  props: ["sections"],
  components: {SubsectionMenu, CloseAddButton, Icon},
  directives: {
    scrollIf(el, {value}) {
      if ((value.last && value.isNew) || value.editing) {
        value.isNew = false;
        el.scrollIntoView({behavior: "smooth"});
      }
    },
  },
  data() {
    return {
      subsections: [new Subsection("", "")],
      tempSectionName: "",
    };
  },
  methods: {
    addToDo() {
      this.sections.push(new Section(this.tempSectionName, ""));
    },
  },
};
</script>
<style lang="scss">
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
}

.subsection {
  display: block;
  max-height: 45vh;
  padding: 0.5rem;
  overflow: scroll;
  position: relative;
}

.subsection-move {
  transition: opacity 0.5s ease;
  transition: transform 0.5s ease;
}
.subsection-leave-active {
  animation: opacity 0.5s ease;
  animation: transform 0.5s ease;
  max-height: 10vh;
}
.subsection-enter-active {
  transition: opacity 0.5s ease;
  transition: transform 0.5s ease;
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
  margin-bottom: 2rem;
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
