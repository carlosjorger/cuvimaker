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
<style></style>
