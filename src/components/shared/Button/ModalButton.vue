<template>
	<button
		type="submit"
		class="btn btn-primary mt-2 w-[40%] rounded-2xl max-sm:btn-sm"
	>
		{{ name }}
	</button>
</template>

<script>
	export default {
		name: 'ModalButton',
		props: {
			name: {
				type: String,
			},
		},
	};
</script>
