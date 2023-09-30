<template>
	<tooltip-wrapper :text="title">
		<button
			:title="title"
			:aria-label="title"
			type="button"
			class="w-12 p-2 text-white transition-colors duration-500 hover:text-anchor dark:text-dark-primary dark:hover:text-anchor"
		>
			<Icon :icon="iconName" width="30" />
		</button>
	</tooltip-wrapper>
</template>

<script setup>
	import { Icon } from '@iconify/vue';
	import TooltipWrapper from '../Tooltip/TooltipWrapper.vue';

	defineProps({
		title: {
			type: String,
			required: true,
		},
		iconName: {
			type: String,
			required: true,
		},
	});
</script>
<style lang="scss" scoped></style>
