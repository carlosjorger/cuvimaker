<template>
  <section>
    <div class="form-group">
      <label for="sectionName">Section Name</label>
      <input type="text" class="form-control" v-model="tempSectionName" />
      <label for="sectionDescription">Section Description</label>
      <input
        type="text"
        class="form-control"
        v-model="tempSectionDescription"
      />
      <button v-on:click="addToDo">Add toDo</button>
    </div>

    <div v-for="section in sections">
      <h3>{{ section.name }}</h3>
      <p>{{ section.description }}</p>
    </div>
  </section>
</template>
<script lang="ts">
import { string } from "zod";
export default {
  data() {
    return {
      tempSectionName: "",
      tempSectionDescription: "",
      sections: [] as { name: string; description: string }[],
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
