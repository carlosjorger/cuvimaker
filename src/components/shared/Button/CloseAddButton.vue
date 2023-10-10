<template>
	<TooltipWrapper :text="toolTipText">
		<CircleButton :class="[closeButton ? 'rotate-0' : 'rotate-45']">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-8 w-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</CircleButton>
	</TooltipWrapper>
</template>
<script setup lang="ts">
	import TooltipWrapper from '../Tooltip/TooltipWrapper.vue';
	import CircleButton from './CircleButton.vue';
	defineProps({
		closeButton: {
			type: Boolean,
		},
		lineColor: {
			type: String,
			default: 'primary',
		},
		buttonColor: {
			type: String,
		},
		size: {
			type: Number,
		},
		toolTipText: {
			type: String,
			default: '',
		},
	});
</script>
