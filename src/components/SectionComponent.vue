<template>
  <article class="section-card">
    <header>
      <h3>{{ name }}</h3>
      <hr />
    </header>
    <p>{{ description }}</p>
  </article>
</template>
<script>
export default {
  name: "SectionComponent",
  props: ["name", "description"],
};
</script>
<style>
.section-card {
  animation: 0.5s show-presentation ease;
}
@keyframes show-presentation {
  0% {
    opacity: 0;
    transform: translate(0px, -10px);
  }
}
</style>
