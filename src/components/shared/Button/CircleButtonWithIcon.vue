<template>
	<TooltipWrapper :text="text">
		<CircleButton
			:size="width"
			:aria-label="text"
			class="border-2 border-accent"
		>
			<Icon :icon="icon" :width="10 * width" :color="color" />
		</CircleButton>
	</TooltipWrapper>
</template>

<script lang="ts">
	import CircleButton from '../../shared/Button/CircleButton.vue';
	import { Icon } from '@iconify/vue';
	import TooltipWrapper from '../../shared/Tooltip/TooltipWrapper.vue';

	export default {
		props: {
			color: {
				type: String,
				required: true,
			},
			icon: {
				type: String,
				required: true,
			},
			width: {
				type: Number,
				default: 2.2,
			},
			text: {
				type: String,
				required: true,
				default: '',
			},
		},
		components: { CircleButton, Icon, TooltipWrapper },
	};
</script>

<style lang="scss" scoped></style>
