<template>
	<button
		type="submit"
		class="rounded-3xl border-4 border-primary bg-[#f6f4fb] p-3 text-xl font-extrabold text-primary shadow-xl transition-colors duration-200 ease-out active:bg-[#9e97bf] dark:border-zinc-300 dark:bg-dark-primary-200 dark:text-zinc-300 dark:active:bg-[#0c071a]"
	>
		{{ name }}
	</button>
</template>

<script lang="ts">
	export default {
		name: 'BasicButton',
		props: {
			name: {
				type: String,
			},
		},
	};
</script>
