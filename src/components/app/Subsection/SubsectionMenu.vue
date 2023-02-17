<template>
  <div
    v-scroll-if="subsection"
    class="subsection-item"
    :class="{
      'add-button': subsection.last,
      shake: shake,
    }">
    <div>
      <div class="subsection-form-header">
        <close-add-button
          v-on:click="addRemoveSubSection()"
          :closeButton="!subsection.last" />
        <transition name="editButton">
          <circle-button
            v-on:click="editSubSection()"
            v-if="!subsection.last && !editing">
            <Icon
              icon="ic:baseline-mode-edit"
              width="25"
              color="var(--primary-color)" /> </circle-button
        ></transition>
      </div>
      <form
        v-on:submit.prevent="cancelSubSection()"
        v-if="!subsection.last"
        class="subsection-form-group">
        <subsection-form
          :editing="editing"
          class="subsection-form-control-property"
          v-model="subsection.title"
          placeholder="Subsection title" />
        <div
          class="input-errors"
          v-for="error of v$.subsection.title.$errors"
          :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
        <subsection-form
          :editing="editing"
          v-model="subsection.text"
          placeholder="Subsection subtitle" />
        <SubsectionTimeInterval
          :editing="editing"
          :subsectionTimeIntervalProp="subsection.subsectionTimeInterval" />
        <SwitchCheckbox
          v-if="editing"
          v-model="hasElementList"
          :title="'Add a list'" />
        <subsection-elements v-if="hasElementList" :editing="editing" />
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
import {scrollSmoothToElement} from "../../../utils/scrollServices";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import SwitchCheckbox from "../../shared/checkbox/SwitchCheckbox.vue";
import SubsectionTimeInterval from "./SubsectionTimeInterval.vue";
import type {TimeInterval} from "../../../models/SubsectionTimeInterval";
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
    SwitchCheckbox,
    SubsectionTimeInterval,
  },
  setup() {
    return {v$: useVuelidate({$scope: false})};
  },
  directives: {
    scrollIf(el: Element, {value}) {
      if (value.last) {
        scrollSmoothToElement(el);
      }
    },
  },
  data() {
    return {
      hasPeriodOfTime: false,
      hasElementList: false,
      newElement: "",
      from: new Date(1999, 1, 1),
      to: new Date(),
      editing: false,
      shake: false,
    };
  },
  provide() {
    return {
      subsection: this.subsection,
    };
  },
  methods: {
    addRemoveSubSection() {
      if (this.section.lastSubsectionIndex == this.index) {
        this.addSubSection();
      } else {
        this.$emit("removeSubsection", this.index);
      }
    },
    addSubSection() {
      if (this.section.subsectionEditing) {
        this.emmitSendEditing();
      } else {
        this.$emit("addNewSubsection");
      }
    },
    cancelSubSection() {
      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }
      this.$emit("disabledEditing");
    },
    editSubSection() {
      if (this.section.subsectionEditing) {
        this.emmitSendEditing();
      } else {
        this.$emit("setEditingIndex", this.index);
      }
    },

    emmitSendEditing() {
      emitter?.emit("editing", this.section.editingIndex);
    },
    shakeSubsection() {
      this.shake = true;
      setTimeout(() => {
        this.shake = false;
      }, 1500);
    },
  },
  mounted() {
    emitter.on("editing", (index) => {
      if (index == this.index) {
        scrollSmoothToElement(this.$el);
        this.shakeSubsection();
      }
    });
  },
  validations: {
    subsection: {
      title: {
        required,
      },
    },
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
  background-color: var(--primary-color);
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
</style>
