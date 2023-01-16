<template>
  <div class="modal-overlay">
    <div class="form section-card">
      <header class="form-header">
        <h3>Add a Section</h3>
        <close-add-button
          v-on:click="$emit('close-modal')"
          :closeButton="true"
          :lineColor="'#FFFFFF'"
          :buttonColor="'#4c1d95'" />
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
          <div
            v-for="(subsection, index) in subsections"
            v-bind:key="subsection"
            v-scroll-if="subsection"
            class="subsection-item"
            :class="{
              'add-button': subsection.last,
            }"
            :style="{
              backgroundColor: `rgb(76, 29, 149,${!subsection.last * 255})`,
            }">
            <div>
              <div class="subsection-form-header">
                <close-add-button
                  v-on:click="addSubSection(index)"
                  :closeButton="!subsection.last" />
                <transition name="editButton">
                  <circle-button
                    v-on:click="editCancel(index)"
                    v-if="!subsection.last && !subsection.editing">
                    <Icon
                      icon="ic:baseline-mode-edit"
                      width="25"
                      color="#4c1d95" /> </circle-button
                ></transition>
              </div>
              <div v-if="!subsection.last" class="subsection-form-group">
                <input
                  type="text"
                  class="subsection-form-control subsection-form-control-property"
                  :class="{edit: subsection.editing}"
                  placeholder="Property name" />
                <input
                  class="subsection-form-control subsection-form-control-property-description"
                  :class="{edit: subsection.editing}"
                  type="text"
                  placeholder="Property description" />
                <transition name="editButton">
                  <button
                    v-on:click="editCancel(index)"
                    class="save-button"
                    v-if="!subsection.last && subsection.editing">
                    Save
                  </button>
                </transition>
              </div>
            </div>
          </div>
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
<script>
import CloseAddButton from "./CloseAddButton.vue";
import CircleButton from "./CircleButton.vue";
import {Icon} from "@iconify/vue";
export default {
  name: "CreateSectionModal",
  props: ["sections"],
  components: {CloseAddButton, CircleButton, Icon},
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
      subsections: [
        {title: "", text: "", last: true, editing: false, isNew: true},
      ],
      tempSectionName: "",
    };
  },
  methods: {
    addToDo() {
      this.sections.push({
        name: this.tempSectionName,
      });
    },
    addSubSection(index) {
      if (this.subsections.length - 1 == index) {
        this.subsections[index].last = false;
        this.subsections.push({
          title: "",
          text: "",
          last: true,
          editing: false,
          isNew: true,
        });
      } else {
        this.subsections.splice(index, 1);
      }
    },
    editCancel(index) {
      this.subsections[index].editing = !this.subsections[index].editing;
      for (let i = 0; i < this.subsections.length; i++) {
        if (i != index) {
          this.subsections[i].editing = false;
        }
      }
    },
  },
};
</script>
<style lang="scss">
.save-button {
  background-color: white;
  color: #4c1d95;
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
.editButton-leave-active {
  transition: all 0.5s ease;
}
.editButton-enter-active {
  transition: all 0.5s ease;
}
.editButton-leave-to,
.editButton-enter-from {
  opacity: 0;
}
.subsection {
  display: block;
  max-height: 40vh;
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
.subsection-item {
  min-height: 21vh;
  width: 95%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in;
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
  color: #4c1d95;
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
.subsection-form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.subsection-form-group {
  padding: 0.5rem;
}
.subsection-form-control {
  padding: 0.1rem;
  width: 100%;
  margin-top: 0.5rem;
  border: 0;
  border-radius: 0;
  background-color: inherit;
  color: white;
  pointer-events: none;
  transition: all 0.1s ease-in;
}
.subsection-form-control.edit {
  border-bottom: white solid 0.1rem;
  pointer-events: auto;
  font-size: 1em;
}
.subsection-form-control-property {
  font-size: 1.2em;
}
.subsection-form-control-property-description::placeholder {
  opacity: 0;
  transition: all 0.1s ease-in;
}
.subsection-form-control-property-description.edit::placeholder {
  opacity: 1;
}
.subsection-form-control:focus {
  outline: none;
}
.form-button {
  height: 5vh;
  padding: 0.2vw;
  width: 100%;
  margin: 0 auto;
}
.close-img {
  border-radius: 50%;
}
</style>
