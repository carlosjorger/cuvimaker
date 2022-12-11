<template>
  <section>
    <create-section-modal />
    <div v-for="section in sections">
      <article>
        <header>
          <h3>{{ section.name }}</h3>
          <hr />
        </header>

        <p>{{ section.description }}</p>
      </article>
    </div>
  </section>
</template>
<script>
import CreateSectionModal from "./CreateSectionModal.vue";
export default {
  components: { CreateSectionModal },
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
article {
  width: 40%;
}
</style>
