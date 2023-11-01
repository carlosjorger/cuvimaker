<template>
	<TooltipWrapper :text="text">
		<CircleButton :aria-label="text" :buttonSize="buttonSize">
			<Icon :icon="icon" :width="14 * width" />
		</CircleButton>
	</TooltipWrapper>
</template>

<script setup lang="ts">
	import CircleButton from '../../shared/Button/CircleButton.vue';
	import { Icon } from '@iconify/vue';
	import TooltipWrapper from '../../shared/Tooltip/TooltipWrapper.vue';

	defineProps({
		icon: {
			type: String,
			required: true,
		},
		width: {
			type: Number,
			default: 2,
		},
		text: {
			type: String,
			required: true,
			default: '',
		},
		buttonSize: {
			type: String,
			default: 'md',
		},
	});
</script>
