<template>
  <article class="section-card">
    <header>
      <h3>{{ section?.name }}</h3>
    </header>
  </article>
</template>
<script lang="ts">
import {Section} from "../models/Section";

export default {
  name: "SectionComponent",
  props: {
    section: {
      type: Section,
      require: true,
    },
  },
};
</script>
<style>
.dark .section-card {
  border: 0.2rem solid white;
}
@keyframes show-presentation {
  0% {
    opacity: 0;
    transform: translate(0px, -10px);
  }
}
</style>
