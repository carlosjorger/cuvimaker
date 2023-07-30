<template>
	<button
		class="rounded-2xl bg-primary px-6 py-2 font-bold text-zinc-300 transition-colors duration-200 ease-in active:bg-[#0c071a] dark:bg-white dark:text-primary dark:active:bg-[#a29bbf]"
	>
		{{ name }}
	</button>
</template>
<script lang="ts">
	export default {
		props: {
			name: {
				type: String,
			},
		},
	};
</script>
