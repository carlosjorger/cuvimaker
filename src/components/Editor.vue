<template>
  <section>
    <create-section-modal :sections="sections" />
    <div v-for="section in sections">
      <section-component
        :name="section.name"
        :description="section.description" />
    </div>
  </section>
</template>
<script>
import CreateSectionModal from "./CreateSectionModal.vue";
import SectionComponent from "./SectionComponent.vue";
export default {
  components: {CreateSectionModal, SectionComponent},
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
