<template>
	<BasicLink :link="`mailto:${email}`" />
</template>

<script lang="ts">
	import BasicLink from './BasicLink.vue';
	export default {
		props: {
			email: String,
		},
		components: { BasicLink },
	};
</script>
