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
        <subsection-form
          :editing="editing"
          class="subsection-form-control-property"
          v-model="subsection.title"
          placeholder="Subsection title" />
        <span v-if="!errors.text.valid">{{ errors.text.error }}</span>
        <subsection-form
          :editing="editing"
          v-model="subsection.text"
          placeholder="Subsection subtitle" />

        <div
          class="subsection-form-control-datepicker-group"
          v-if="editing || (subsection.dateFrom && subsection.dateTo)">
          <subsection-date-picker
            v-model="subsection.dateFrom"
            :editing="editing"
            :upperLimit="subsection.dateTo"
            :lowerLimit="from" />
          <span
            :class="{
              hidden: !subsection.dateFrom && !subsection.dateTo && !editing,
            }"
            class="subsection-form-control-datepicker-span"
            >|</span
          >
          <subsection-date-picker
            v-model="subsection.dateTo"
            :editing="editing"
            :upperLimit="to"
            :lowerLimit="subsection.dateFrom" />
        </div>
        <textarea
          v-if="editing || subsection.description"
          :class="{edit: editing}"
          class="subsection-textarea"
          v-model="subsection.description"></textarea>
        <subsection-elements :subsection="subsection" :editing="editing" />
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
import CloseAddButton from "../../shared/Button/CloseAddButton.vue";
import CircleButton from "../../shared/Button/CircleButton.vue";
import {Icon} from "@iconify/vue";
import Datepicker from "vue3-datepicker";
import {Subsection} from "../../../models/Subsection";
import {Section} from "../../../models/Section";
import SubsectionDatePicker from "./SubsectionDatePicker.vue";
import mitt from "mitt";
import SubsectionForm from "./SubsectionForm.vue";
import SubsectionElements from "./SubsectionElements.vue";
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

  components: {
    CloseAddButton,
    CircleButton,
    Icon,
    Datepicker,
    SubsectionDatePicker,
    SubsectionForm,
    SubsectionElements,
  },
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
      newElement: "",
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
<style>
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

.subsection-form-control-property {
  font-size: 1.2em;
}

.subsection-textarea {
  width: 100%;
  margin-top: 0.5rem;
  background-color: inherit;
  color: white;
  transition: all 0.1s ease-in;
  pointer-events: none;
  border: rgba(255, 255, 255, 0) solid 0.1rem;
}
.subsection-textarea.edit {
  border: white solid 0.1rem;
  pointer-events: auto;
  transition: all 0.3s ease-out;
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
.subsection-form-control-datepicker-span {
  transition: all 0.5s ease;
}
.subsection-form-control-datepicker-span.hidden {
  color: rgba(255, 255, 255, 0);
  transition: all 0.5s ease;
}
</style>
