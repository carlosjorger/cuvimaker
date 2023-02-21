<template>
  <div
    v-scroll-if="subsection"
    class="text-white w-full mt-3 p-3 rounded-lg transition-all duration-500 bg-[var(--primary-color)]"
    :class="{
      shake: shake,
    }">
    <div>
      <div class="flex justify-between items-center">
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
      <form v-on:submit.prevent v-if="!subsection.last" class="p-2">
        <subsection-form
          :editing="editing"
          class="text-lg"
          v-model="subsection.title"
          placeholder="Subsection title" />
        <div v-for="error of v$.subsection.title.$errors" :key="error.$uid">
          <div>{{ error.$message }}</div>
        </div>
        <subsection-form
          :editing="editing"
          v-model="subsection.text"
          placeholder="Subsection subtitle" />
        <SubsectionTimeIntervalSection
          :editing="editing"
          :subsectionTimeIntervalProp="subsection.subsectionTimeInterval" />
        <SubsectionListSection :editing="editing" />
        <div class="flex justify-between">
          <ModalButton
            :invisible="!editing"
            :name="'Save'"
            v-on:click="saveSubSection" />
          <ModalButton
            :invisible="!editing"
            :name="'Cancel'"
            v-on:click="cancelSubSection" />
        </div>
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
import SubsectionDatePicker from "./TimeInterval/SubsectionTimeIntervalSection.vue";
import mitt from "mitt";
import SubsectionForm from "./SubsectionForm.vue";
import SubsectionElements from "./List/SubsectionElements.vue";
import {scrollSmoothToElement} from "../../../utils/scrollServices";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import SwitchCheckbox from "../../shared/checkbox/SwitchCheckbox.vue";
import SubsectionTimeIntervalSection from "./TimeInterval/SubsectionTimeIntervalSection.vue";
import ModalButton from "../../shared/Button/ModalButton.vue";
import {computed} from "vue";
import SubsectionListSection from "./List/SubsectionListSection.vue";
const emitter = mitt();
export default {
  name: "SubsectionMenu",
  props: {
    section: {
      type: Section,
      required: true,
    },

    prevSubsection: {
      type: Subsection,
      required: true,
    },
    subsectionIndex: {
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
    SubsectionTimeIntervalSection,
    ModalButton,
    SubsectionListSection,
  },
  setup() {
    return {
      v$: useVuelidate({$scope: true}),
    };
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
      subsection: new Subsection(),
      hasElementList: false,
      editing: false,
      shake: false,
    };
  },
  provide() {
    return {
      subsection: computed(() => this.subsection),
    };
  },
  methods: {
    addRemoveSubSection() {
      if (this.subsection.last) {
        this.addSubSection();
      } else {
        this.removeSubsection();
      }
    },

    removeSubsection() {
      this.section.removeSubsection(this.subsectionIndex);
    },
    addSubSection() {
      if (this.section.subsectionEditing) {
        this.emmitSendEditing();
      } else {
        this.section.addNewSubsection();
      }
    },

    saveSubSection() {
      this.validate();
      if (this.v$.$error) {
        return;
      }
      this.prevSubsection.setSubsection(this.subsection);
      this.disabledEditing();
    },

    cancelSubSection() {
      if (this.isANewEmptySubsection()) {
        this.validate();
      } else {
        this.subsection.setSubsection(this.prevSubsection);
        this.disabledEditing();
      }
    },
    validate() {
      this.v$.$validate();
    },
    isANewEmptySubsection() {
      return this.prevSubsection.isEmpty && this.subsection.isEmpty;
    },
    disabledEditing() {
      this.section.disabledEditing();
    },

    editSubSection() {
      if (this.section.subsectionEditing) {
        this.emmitSendEditing();
      } else {
        this.setEditingIndex();
      }
    },
    setEditingIndex() {
      this.section.editingIndex = this.subsectionIndex;
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
      if (index == this.subsectionIndex) {
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
      this.editing = newValue == this.subsectionIndex;
    },
    "prevSubsection.last"(newValue: boolean) {
      this.subsection.last = newValue;
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
</style>
