<template>
	<section class="m-2">
		<header>
			<h3 class="text-xl font-extrabold text-primary dark:text-white">
				{{ section?.name }}
			</h3>
		</header>
		<hr class="mt-1 h-1 rounded-md bg-primary dark:bg-zinc-300" />
	</section>
</template>

<script lang="ts">
	import { Section } from '../../../models/Section';

	export default {
		props: {
			section: {
				type: Section,
				required: true,
			},
		},
	};
</script>
