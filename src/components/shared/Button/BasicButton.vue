<template>
	<button
		type="submit"
		class="btn btn-primary p-2 text-sm font-extrabold shadow-xl transition-colors duration-200 ease-out"
		:class="{
			'btn-active': active,
		}"
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
			active: {
				type: Boolean,
				default: false,
			},
		},
	};
</script>
