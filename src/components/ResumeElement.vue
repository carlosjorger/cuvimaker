<template>
	<a :href="`/editor/${indexResume}`">
		<div
			class="card mx-auto my-3 w-2/3 rounded-lg bg-base-200 p-7 font-extrabold shadow-2xl shadow-warning-content transition-all duration-[400ms] hover:translate-x-6 hover:bg-base-300 hover:duration-100 dark:shadow-success-content max-md:w-5/6 max-sm:w-11/12 max-sm:hover:translate-x-2"
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
	import { computed, type PropType } from 'vue';
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
			type: Object as PropType<Resume>,
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
