<template>
	<div class="p-2">
		<h2 class="text-3xl">{{ introduction.name }}</h2>
		<h3 class="text-2xl">{{ introduction.profetion }}</h3>
	</div>
</template>

<script>
	import { Introduction } from '../../../models/Introduction';

	export default {
		props: {
			introduction: {
				type: Introduction,
				required: true,
			},
		},
	};
</script>
