<template>
  <div
    v-scroll-if="subsection"
    class="subsection-item"
    :class="{
      'add-button': subsection.last,
    }"
    :style="{
      backgroundColor: `rgb(76, 29, 149,${Number(!subsection.last) * 255})`,
    }">
    <div>
      <div class="subsection-form-header">
        <close-add-button
          v-on:click="addSubSection(index)"
          :closeButton="!subsection.last" />
        <transition name="editButton">
          <circle-button
            v-on:click="editCancel(index)"
            v-if="!subsection.last && !editing">
            <Icon
              icon="ic:baseline-mode-edit"
              width="25"
              color="var(--primary-color)" /> </circle-button
        ></transition>
      </div>
      <form
        v-on:submit.prevent="editCancel(index)"
        v-if="!subsection.last"
        class="subsection-form-group">
        <input
          v-model="subsection.title"
          type="text"
          class="subsection-form-control subsection-form-control-property"
          :class="{edit: editing}"
          placeholder="Property name" />
        <span v-if="!errors.text.valid">{{ errors.text.error }}</span>
        <input
          v-model="subsection.text"
          class="subsection-form-control subsection-form-control-property-description"
          :class="{edit: editing}"
          type="text"
          placeholder="Property description" />

        <div class="subsection-form-control-datepicker-group">
          <Datepicker
            class="subsection-form-control-datepicker"
            :class="{edit: editing}"
            v-model="subsection.dateFrom"
            :upper-limit="subsection.dateTo"
            :lower-limit="from"
            :inline="true"
            :disabled="!editing" />
          <span
            v-if="subsection.dateFrom || subsection.dateTo || editing"
            class="subsection-form-control-datepicker-span"
            >-</span
          >
          <Datepicker
            class="subsection-form-control-datepicker"
            :class="{edit: editing}"
            v-model="subsection.dateTo"
            :upper-limit="to"
            :lower-limit="subsection.dateFrom"
            :disabled="!editing" />
        </div>
        <transition name="editButton">
          <button
            type="submit"
            class="save-button"
            v-if="!subsection.last && editing">
            Save
          </button>
        </transition>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import CloseAddButton from "./CloseAddButton.vue";
import CircleButton from "./CircleButton.vue";
import {Icon} from "@iconify/vue";
import Datepicker from "vue3-datepicker";
import {Subsection} from "../models/Subsection";
import {Section} from "../models/Section";

import type {PropType} from "vue";
export default {
  name: "SubsectionMenu",
  props: {
    section: {
      type: Section,
      required: true,
    },
    subsections: {
      type: Array as PropType<Subsection[]>,
      required: true,
    },
    subsection: {
      type: Subsection,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  components: {CloseAddButton, CircleButton, Icon, Datepicker},
  directives: {
    scrollIf(el, {value}) {
      if (value.last && value.isNew) {
        value.isNew = false;
        el.scrollIntoView({behavior: "smooth"});
      }
    },
  },
  data() {
    return {
      from: new Date(1999, 1, 1),
      to: new Date(),
      editing: true,
      errors: {
        text: {valid: true, error: ""},
      },
    };
  },
  methods: {
    addSubSection(index: number) {
      if (this.subsections.length - 1 == index) {
        this.section.addNewSubsection();
      } else {
        this.subsections.splice(index, 1);
      }
    },
    editCancel(index: number) {
      if (this.editing && !this.validateTitle(this.subsections[index].title)) {
        return;
      }
      if (this.editing) {
        this.section.name = "a";
        this.section.editingIndex = -1;
      } else {
        this.section.editingIndex = this.index;
      }
    },
    validateTitle(title: string) {
      if (title == "") {
        this.errors.text.valid = false;
        this.errors.text.error = "Title are requerid";
      } else {
        this.errors.text.valid = true;
        this.errors.text.error = "";
      }
      return this.errors.text.valid;
    },
  },
  watch: {
    "section.editingIndex"(newValue: number) {
      this.editing = newValue == this.index;
    },
  },
};
</script>
<style lang="scss">
.subsection-item {
  color: white;
  min-height: 21vh;
  width: 95%;
  margin-top: 0.8rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.5s ease-in;
}
.subsection-leave-active {
  position: absolute;
}
.save-button {
  background-color: white;
  color: var(--primary-color);
  padding: 0.1rem;
  width: 100%;
  margin-top: 0.5rem;
  font-weight: bold;
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
.subsection-form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.subsection-form-group {
  padding: 0.5rem;
}
.subsection-form-control {
  // display: flex;
  padding: 0.1rem;
  width: 100%;
  margin-top: 0.5rem;
  border: 0;
  border-radius: 0;
  background-color: inherit;
  pointer-events: none;
  transition: all 0.1s ease-in;
  color: white;
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
.subsection-form-control-datepicker-group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.5rem;
}
.subsection-form-control-datepicker {
  position: relative;
  background-color: var(--primary-color);
  color: white;
  border: none;
  pointer-events: none;
  margin: 0;
  width: 80%;
}
.subsection-form-control-datepicker.edit {
  border: white solid 0.1rem;
  pointer-events: auto;
}
.subsection-form-control-datepicker-span {
  padding: 0.5rem;
}
.v3dp__datepicker {
  width: 5.4em;
}
</style>
