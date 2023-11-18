<template>
	<a :href="`/editor/${indexResume}`">
		<div
			class="card my-3 ml-12 w-5/6 rounded-lg bg-base-200 p-7 font-extrabold shadow-2xl shadow-warning-content transition-all duration-200 hover:translate-x-6 hover:bg-base-300 dark:shadow-success-content max-md:ml-8 max-md:w-11/12 max-sm:mx-auto max-sm:w-11/12 max-sm:hover:translate-x-2"
		>
			<div
				class="flex items-center justify-between"
				v-if="
					resume?.introduction.name && resume?.introduction.profetion
				"
			>
				<hgroup>
					<h3 class="text-lg">
						{{ resume?.introduction.name }}
					</h3>
					<h4>
						{{ resume?.introduction.profetion }}
					</h4>
				</hgroup>
				<CircleButtonWithIcon
					icon="ic:baseline-delete"
					text="Clear Resume"
					@click.prevent="tryToClearResume($event, indexResume)"
				/>
			</div>
			<h3 v-else class="font-blackOpsOne text-2xl">EMPTY</h3>
		</div>
	</a>
</template>
<script setup lang="ts">
	import { computed } from 'vue';
	import { useOpenModal } from './../composables/useOpenModal';
	import CircleButtonWithIcon from './shared/Button/CircleButtonWithIcon.vue';
	import { Resume } from '../models/Resume';

	const { onShowModal } = useOpenModal('delete_resume_modal');
	const emit = defineEmits(['update:modelValue']);

	const props = defineProps({
		modelValue: {
			type: String,
			required: true,
		},
		indexResume: {
			type: String,
			required: true,
		},
		resume: {
			type: Resume,
		},
	});
	const indexOfElementToDelete = computed({
		get() {
			return props.modelValue;
		},
		set(value: string) {
			emit('update:modelValue', value);
		},
	});
	const tryToClearResume = (event: Event, index: string) => {
		event.stopPropagation();
		indexOfElementToDelete.value = index;
		onShowModal();
		return false;
	};
</script>
