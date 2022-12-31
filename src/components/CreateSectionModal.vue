<template>
  <div class="modal-overlay">
    <div class="form section-card">
      <header class="form-header">
        <h3>Add a Section</h3>
        <div class="close" @click="$emit('close-modal')">
          <img
            class="close-img"
            src="./../../public/assets/close-icon.svg"
            alt="" />
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
  },
};
</script>
<style>
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
.close {
  margin: 1%;
  cursor: pointer;
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
</style>
