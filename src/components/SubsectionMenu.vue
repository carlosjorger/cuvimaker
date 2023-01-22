<template>
  <div
    v-scroll-if="subsection"
    class="subsection-item"
    :class="{
      'add-button': subsection.last,
      shake: shake,
    }"
    :style="{
      backgroundColor: `rgb(76, 29, 149,${Number(!subsection.last) * 255})`,
    }">
    <div>
      <div class="subsection-form-header">
        <close-add-button
          v-on:click="addRemoveSubSection()"
          :closeButton="!subsection.last" />
        <transition name="editButton">
          <circle-button
            v-on:click="editCancel()"
            v-if="!subsection.last && !editing">
            <Icon
              icon="ic:baseline-mode-edit"
              width="25"
              color="var(--primary-color)" /> </circle-button
        ></transition>
      </div>
      <form
        v-on:submit.prevent="editCancel()"
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
            :class="{
              hidden: !subsection.dateFrom && !subsection.dateTo && !editing,
            }"
            class="subsection-form-control-datepicker-span"
            >|</span
          >
          <Datepicker
            class="subsection-form-control-datepicker"
            :class="{edit: editing}"
            v-model="subsection.dateTo"
            :upper-limit="to"
            :lower-limit="subsection.dateFrom"
            :disabled="!editing" />
        </div>
        <button
          type="submit"
          class="save-button"
          :class="{
            hidden: subsection.last || !editing,
          }">
          Save
        </button>
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
import mitt from "mitt";

const emitter = mitt();
export default {
  name: "SubsectionMenu",
  props: {
    section: {
      type: Section,
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
      editing: false,
      shake: false,
      errors: {
        text: {valid: true, error: ""},
      },
    };
  },
  methods: {
    emmitSending() {
      if (this.section.subsectionEditing) {
        emitter?.emit("editing", this.section.editingIndex);
      }
      return this.section.subsectionEditing;
    },
    addRemoveSubSection() {
      if (this.section.subsections.length - 1 == this.index) {
        this.addSubSection();
      } else {
        this.section.removeSubsection(this.index);
      }
    },
    addSubSection() {
      if (this.emmitSending()) {
        return;
      }
      this.section.addNewSubsection();
    },

    editCancel() {
      if (!this.validate()) {
        return;
      }
      if (this.editing) {
        this.section.disabledEditing();
      } else {
        this.editSubSection();
      }
    },
    editSubSection() {
      if (this.emmitSending()) {
        return;
      }
      this.section.editingIndex = this.index;
    },
    validate() {
      return !this.editing || this.validateTitle();
    },
    validateTitle() {
      if (this.subsection.title == "") {
        this.errors.text.valid = false;
        this.errors.text.error = "Title are requerid";
      } else {
        this.errors.text.valid = true;
        this.errors.text.error = "";
      }
      return this.errors.text.valid;
    },
  },
  mounted() {
    emitter.on("editing", (index) => {
      if (index == this.index) {
        this.$el.scrollIntoView({behavior: "smooth"});
        this.shake = true;
        setTimeout(() => {
          this.shake = false;
        }, 1500);
      }
    });
  },
  watch: {
    "section.editingIndex"(newValue: number) {
      this.editing = newValue == this.index;
    },
  },
};
</script>
<style lang="scss">
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
.subsection-item {
  color: white;
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
  transition: all 0.5s ease;
}
.save-button.hidden {
  background-color: rgba(255, 255, 255, 0);
  transition: all 0.5s ease;
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
  padding: 0.1rem;
  width: 100%;
  margin-top: 0.5rem;
  border: 0;
  border-radius: 0;
  background-color: inherit;
  pointer-events: none;
  transition: all 0.3s ease-in;
  color: white;
  border-bottom: rgba(255, 255, 255, 0) solid 0.1rem;
}
.subsection-form-control.edit {
  border-bottom: white solid 0.1rem;
  transition: all 0.3s ease-out;
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
  border: rgba(255, 255, 255, 0) solid 0.1rem;
  pointer-events: none;
  margin: 0;
  width: 88%;
  transition: all 0.3s ease-in;
  border-radius: 0.6rem;
  padding: 0.2rem;
}
.subsection-form-control-datepicker.edit {
  border: white solid 0.1rem;
  pointer-events: auto;
  transition: all 0.3s ease-out;
}
.subsection-form-control-datepicker-span {
  padding: 0.2rem;
  color: white;
}
.subsection-form-control-datepicker-span.hidden {
  color: rgba(255, 255, 255, 0);
}
.v3dp__datepicker {
  width: 4.8em;
}
</style>
