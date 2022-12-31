<template>
  <section>
    <div class="save-btn">
      <button @click="showModal = true">Add Section</button>
    </div>
    <create-section-modal
      v-show="showModal"
      :sections="sections"
      @close-modal="showModal = false" />
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
      showModal: false,
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
