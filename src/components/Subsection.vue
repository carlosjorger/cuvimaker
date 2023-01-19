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
            v-if="!subsection.last && !subsection.editing">
            <Icon
              icon="ic:baseline-mode-edit"
              width="25"
              color="var(--primary-color)" /> </circle-button
        ></transition>
      </div>
      <div v-if="!subsection.last" class="subsection-form-group">
        <input
          v-model="subsection.title"
          type="text"
          class="subsection-form-control subsection-form-control-property"
          :class="{edit: subsection.editing}"
          placeholder="Property name" />
        <input
          v-model="subsection.text"
          class="subsection-form-control subsection-form-control-property-description"
          :class="{edit: subsection.editing}"
          type="text"
          placeholder="Property description" />

        <div class="subsection-form-control-datepicker-group">
          <Datepicker
            class="subsection-form-control-datepicker"
            :class="{edit: subsection.editing}"
            v-model="subsection.dateFrom"
            :upper-limit="subsection.dateTo"
            :lower-limit="from"
            :inline="true"
            :disabled="!subsection.editing" />
          <span
            v-if="
              subsection.dateFrom || subsection.dateTo || subsection.editing
            "
            class="subsection-form-control-datepicker-span"
            >-</span
          >
          <Datepicker
            class="subsection-form-control-datepicker"
            :class="{edit: subsection.editing}"
            v-model="subsection.dateTo"
            :upper-limit="to"
            :lower-limit="subsection.dateFrom"
            :disabled="!subsection.editing" />
        </div>
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
</template>
<script lang="ts">
import CloseAddButton from "./CloseAddButton.vue";
import CircleButton from "./CircleButton.vue";
import {Icon} from "@iconify/vue";
import Datepicker from "vue3-datepicker";
import {Section} from "../models/Section";
import type {PropType} from "vue";
export default {
  name: "Subsection",
  props: {
    subsections: {
      type: Array as PropType<Section[]>,
      required: true,
    },
    subsection: {
      type: Section,
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
      if ((value.last && value.isNew) || value.editing) {
        value.isNew = false;
        el.scrollIntoView({behavior: "smooth"});
      }
    },
  },
  data() {
    return {
      from: new Date(1999, 1, 1),
      to: new Date(),
    };
  },
  methods: {
    addSubSection(index: number) {
      if (this.subsections.length - 1 == index) {
        this.subsections[index].last = false;
        this.subsections.push(new Section("", ""));
      } else {
        console.log(this.subsections);
        this.subsections.splice(index, 1);
        console.log(this.subsections);
      }
    },
    editCancel(index: number) {
      this.subsections[index].editing = !this.subsections[index].editing;
      for (let i = 0; i < this.subsections.length; i++) {
        if (i != index) {
          this.subsections[i].editing = false;
        }
      }
    },
  },
  watch: {
    "subsection.dateTo"(newValue) {},
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
