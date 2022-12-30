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
  width: 40%;
  padding: 2rem;
  margin: 2%;
  border-radius: 0.5rem;
}
</style>
