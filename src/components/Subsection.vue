<template>
  <div
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

        <div class="subsection-form-control-datepicker-group">
          <Datepicker
            class="subsection-form-control-datepicker"
            v-model="subsection.dateFrom"
            :upper-limit="to"
            :lower-limit="from"
            :clearable="true" />

          <Datepicker
            class="subsection-form-control-datepicker"
            v-model="subsection.dateTo"
            :upper-limit="to"
            :lower-limit="subsection.dateFrom"
            :clearable="true" />
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
<script>
import CloseAddButton from "./CloseAddButton.vue";
import CircleButton from "./CircleButton.vue";
import {Icon} from "@iconify/vue";
import Datepicker from "vue3-datepicker";
export default {
  name: "Subsection",
  props: ["subsections", "subsection", "index"],
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
    addSubSection(index) {
      if (this.subsections.length - 1 == index) {
        this.subsections[index].last = false;
        this.subsections.push({
          title: "",
          text: "",
          last: true,
          editing: false,
          isNew: true,
          dateFrom: new Date().setDate(new Date().getDate() - 5),
          dateTo: new Date(),
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
  watch: {},
};
</script>
<style lang="scss">
.subsection-item {
  min-height: 21vh;
  width: 95%;
  margin-top: 0.8rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in;
}
.subsection-leave-active {
  position: absolute;
}
.save-button {
  background-color: white;
  color: #4c1d95;
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
.subsection-form-control-datepicker-group {
  display: flex;
  justify-content: flex-start;
}
.subsection-form-control-datepicker {
  position: relative;
  margin-top: 0.8rem;
}
</style>
