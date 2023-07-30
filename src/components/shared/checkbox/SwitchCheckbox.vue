<template>
	<div class="switch-checkbox-section">
		<div class="switch-checkbox">
			<input type="checkbox" class="input-checkbox" v-model="value" />
			<div class="skin one"></div>
			<div class="skin two"></div>
		</div>
		<h5 class="w-2/3 text-base">{{ title }}</h5>
	</div>
</template>

<script lang="ts">
	export default {
		name: 'SwitchCheckbox',
		props: {
			title: {
				type: String,
				required: true,
			},
			modelValue: {
				type: Boolean,
			},
		},
		emits: ['update:modelValue'],
		setup() {
			return {};
		},
		computed: {
			value: {
				get() {
					return this.modelValue;
				},
				set(value: Date) {
					this.$emit('update:modelValue', value);
				},
			},
		},
	};
</script>

<style>
	.switch-checkbox-section {
		display: flex;
		align-items: center;
	}
	.switch-checkbox {
		display: grid;
		width: 4.5rem;
		height: 1.5rem;
		border-radius: 1rem;
		padding-right: 0.5rem;
	}
	.switch-checkbox > * {
		grid-area: 1/1;
	}
	.input-checkbox {
		opacity: 0;
		cursor: pointer;
	}

	.skin {
		pointer-events: none;
		border-radius: inherit;
	}

	.one.skin {
		background-color: var(--primary-color);
	}
	.dark .one.skin {
		background-color: #190f35;
	}
	.two.skin {
		background-color: rgb(185, 185, 185);

		--mask: radial-gradient(
			circle at 18% 50%,
			rgba(0, 0, 0, 0) 18%,
			rgba(0, 0, 0, 1) 18%
		);
		mask-image: var(--mask);
		-webkit-mask-image: var(--mask);
		-webkit-mask-position: 0% 0%;
		mask-position: 0% 0%;
		transition: all 0.3s ease-out;
	}

	.input-checkbox:checked ~ .two.skin {
		background-color: white;

		--mask: radial-gradient(
			circle at 18% 50%,
			rgba(0, 0, 0, 0) 18%,
			rgba(0, 0, 0, 1) 18%
		);

		mask-image: var(--mask);
		-webkit-mask-image: var(--mask);
		-webkit-mask-position: 2.55rem 0%;
		mask-position: 2.55rem 0%;
		transition: all 0.3s ease-out;
	}
</style>
