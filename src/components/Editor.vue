<template>
  <section>
    <create-section-modal :sections="sections" />
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
      sections: [],
    };
  },
};
</script>
<style>
article {
  width: 40%;
}
</style>
