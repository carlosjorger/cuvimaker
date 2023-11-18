<template>
	<p class="flex flex-col">
		<AdaptableTextArea
			v-model="value"
			class="block w-full border-solid bg-inherit py-0.5 transition-[border-bottom-width] focus:outline-none"
			v-if="editing || value"
			:class="[
				editing
					? 'pointer-events-auto border-b-4 shadow-xl'
					: 'pointer-events-none border-b-0 shadow-none',
				errors != undefined && errors.length > 0
					? 'border-red-600 placeholder:text-red-600 dark:border-rose-500 dark:placeholder:text-rose-500'
					: `border-base-content placeholder-base-content`,
			]"
			type="text"
			:placeholder="placeholder"
		/>
		<ErrorsSection :errors="errors" />
	</p>
</template>

<script lang="ts">
	import type { ErrorObject } from '@vuelidate/core';
	import { inject } from 'vue';
	import ErrorsSection from '../../shared/Error/ErrorsSection.vue';
	import AdaptableTextArea from '../../shared/TextArea/AdaptableTextArea.vue';
	export default {
		name: 'BasicTextArea',
		props: {
			modelValue: {
				type: String,
				default: '',
			},
			lightColor: {
				type: String,
				default: 'white',
			},
			darkColor: {
				type: String,
				default: 'white',
			},
			placeholder: String,
			errors: Object as () => ErrorObject[],
		},
		emits: ['update:modelValue'],
		components: { ErrorsSection, AdaptableTextArea },
		data() {
			return {
				editing: inject('editing', false),
			};
		},
		computed: {
			value: {
				get() {
					return this.modelValue;
				},
				set(value: string) {
					this.$emit('update:modelValue', value);
				},
			},
		},
	};
</script>
