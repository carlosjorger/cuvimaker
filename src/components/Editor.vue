<script>
export default {
  data() {
    return {
      sections: [
        {
          name: "WORK EXPERIENCE",
          description: "My work experience",
        },
      ],
    };
  },
};
</script>
<template>
  <div v-for="section in sections">
    <h3>{{ section.name }}</h3>
    <p>{{ section.description }}</p>
  </div>
</template>
