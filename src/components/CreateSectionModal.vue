<template>
  <div class="modal-overlay">
    <div class="form section-card">
      <header class="form-header">
        <h3>Add a Section</h3>
        <div
          class="sub-section-icon close-subsection"
          @click="$emit('close-modal')">
          <div class="leftright close"></div>
          <div class="rightleft close"></div>
        </div>
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
        <transition-group name="sub-section" tag="div">
          <div
            v-for="(subSection, index) in subSections"
            v-bind:key="subSection"
            class="sub-section-item">
            <div v-on:click="addSubSection(index)">
              <button
                class="sub-section-icon add"
                :style="{
                  transform: `rotate(${
                    -(subSections.length - 1 != index) * 45
                  }deg)`,
                }">
                <div class="leftright"></div>
                <div class="rightleft"></div>
              </button>
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
  data() {
    return {
      subSections: [{title: "", text: ""}],
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
      if (this.subSections.length - 1 == index) {
        this.subSections.push({title: "", text: ""});
      } else {
        this.subSections.splice(index, 1);
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

.sub-section-move {
  transition: all 0.5s ease;
}
.sub-section-leave-active {
  transition: all 0.5s ease;
}
.sub-section-enter-active {
  transition: all 0.5s ease;
}
.sub-section-enter-from,
.sub-section-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
.sub-section-item {
  margin-top: 0.5rem;
}
.sub-section-leave-active {
  position: absolute;
}
@keyframes show-subsection {
  0% {
    opacity: 0;
    transform: translate(-10px, 0);
  }
}
.sub-section-icon {
  position: relative;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  transition: all 0.3s ease-in;
}
.leftright {
  position: absolute;
  height: 0.25rem;
  width: 1.5rem;
  background-color: white;
  border-radius: 2px;
  transform: rotate(90deg);
  transition: all 0.3s ease-in;
  margin-left: -0.36rem;
  margin-top: -0.12rem;
}

.rightleft {
  position: absolute;

  height: 0.25rem;
  width: 1.5rem;
  background-color: white;
  border-radius: 2px;
  transform: rotate(180deg);
  transition: all 0.3s ease-in;
  margin-left: -0.36rem;
  margin-top: -0.12rem;
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
  width: 100%;
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
