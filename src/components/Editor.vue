<template>
  <section>
    <div class="form">
      <header class="form-header">
        <h3>Add a Section</h3>
      </header>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="tempSectionName"
          placeholder="Section Name"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="tempSectionDescription"
          placeholder="Section Description"
        />
      </div>

      <button v-on:click="addToDo" class="form-button">Add Section</button>
    </div>

    <div v-for="section in sections">
      <h3>{{ section.name }}</h3>
      <p>{{ section.description }}</p>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      tempSectionName: "",
      tempSectionDescription: "",
      sections: [],
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
.form {
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 40%;
  padding: 2rem;
  font-size: 1rem;
  background-color: white;
  border-radius: 0.5rem;
}
.form-header {
  margin-bottom: 0.5rem;
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
  width: 70%;
  margin: 0 auto;
}
</style>
