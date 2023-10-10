<template>
	<button
		type="button"
		class="btn btn-circle btn-primary btn-outline relative border-2 transition-all duration-200 ease-in"
	>
		<slot></slot>
	</button>
</template>
<script lang="ts">
	export default {
		props: {
			buttonColor: {
				type: String,
			},
			size: {
				type: Number,
			},
		},
		name: 'CircleButton',
		methods: {},
	};
</script>
