<template>
  <section>
    <div class="form">
      <div class="form-group">
        <label for="sectionName">Section Name</label>
        <input type="text" class="form-control" v-model="tempSectionName" />
      </div>
      <div class="form-group">
        <label for="sectionDescription">Section Description</label>
        <input
          type="text"
          class="form-control"
          v-model="tempSectionDescription"
        />
      </div>

      <button v-on:click="addToDo">Add toDo</button>
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
  margin: 1rem;
  width: 40%;
  padding: 1rem;
}
.form-group {
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-between;
  padding: 0.5rem;
}
.form-control {
  width: 60%;
}
</style>
