<template>
  <div class="modal-overlay">
    <div class="form section-card">
      <header class="form-header">
        <h3>Add a Section</h3>
        <button
          class="subsection-icon subsection-icon-close"
          @click="$emit('close-modal')">
          <div class="line line-90deg"></div>
          <div class="line line-180deg"></div>
        </button>
      </header>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="tempSectionName"
          placeholder="Section Name" />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="tempSectionDescription"
          placeholder="Section Description" />
      </div>
      <div class="form-group">
        <transition-group name="subsection" class="subsection" tag="div">
          <div
            v-for="(subsection, index) in subsections"
            v-bind:key="subsection"
            v-scroll-if="subsections.length - 1 == index"
            class="subsection-item"
            v-bind:class="{
              'add-button': subsections.length - 1 == index,
            }"
            :style="{
              backgroundColor: `rgb(76, 29, 149,${
                (subsections.length - 1 != index) * 255
              })`,
            }">
            <div>
              <button
                class="subsection-icon"
                v-on:click="addSubSection(index)"
                :style="{
                  transform: `rotate(${
                    -(subsections.length - 1 != index) * 45
                  }deg)`,
                }">
                <div class="line line-90deg"></div>
                <div class="line line-180deg"></div>
              </button>
              <div v-if="subsections.length - 1 != index">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Section Name" />
                <input
                  type="text"
                  class="form-control"
                  placeholder="Section Name" />
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
export default {
  name: "CreateSectionModal",
  props: ["sections"],
  directives: {
    scrollIf(el, {value}) {
      if (value) {
        el.scrollIntoView({behavior: "smooth"});
      }
    },
  },
  data() {
    return {
      subsections: [{title: "", text: ""}],
      tempSectionName: "",
      tempSectionDescription: "",
    };
  },
  methods: {
    addToDo() {
      this.sections.push({
        name: this.tempSectionName,
        description: this.tempSectionDescription,
      });
    },
    addSubSection(index) {
      if (this.subsections.length - 1 == index) {
        this.subsections.push({title: "", text: ""});
      } else {
        this.subsections.splice(index, 1);
      }
    },
  },
};
</script>
<style lang="scss">
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
  max-height: 40vh;
  overflow: scroll;
}
.subsection-move {
  transition: all 0.5s ease;
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
.subsection-item {
  width: 30rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in;
}
.subsection-leave-active {
  position: absolute;
}

.subsection-icon {
  background-color: white;
  display: flex;
  position: relative;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  transition: all 0.3s ease-in;
  border: #4c1d95 solid 0.2rem;
  justify-content: space-evenly;
  align-items: center;
}
.subsection-icon-close {
  transform: rotate(45deg);
}
.line {
  position: absolute;
  height: 0.25rem;
  width: 50%;
  background-color: #4c1d95;
  border-radius: 2px;
  transition: all 0.3s ease-in;
}
.line-90deg {
  transform: rotate(90deg);
}
.line-180deg {
  transform: rotate(180deg);
}

.close {
  background-color: #4c1d95;
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
.form-group {
  margin-bottom: 2rem;
  box-sizing: border-box;
}
.form-control {
  margin-top: 0.5rem;
  width: 92%;
  box-sizing: inherit;
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
