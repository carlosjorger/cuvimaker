<template>
	<SubsectionAlign>
		<section
			class="section w-full rounded-md bg-base-100 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-base-300 group-[.marked]:translate-x-2 group-[.marked]:bg-base-300"
			ref="element"
		>
			<main
				class="p-7 max-lg:p-10 max-md:p-7 max-sm:p-3"
				@mousedown="changeSetting"
			>
				<slot name="body"></slot>
			</main>
			<footer
				class="relative flex w-full justify-end rounded-b-md bg-primary transition-all duration-200"
				:class="{
					['h-12']: isBeingShowedSetting,
					['h-0 overflow-hidden']: !isBeingShowedSetting,
				}"
			>
				<slot name="footer"> </slot>
			</footer>
		</section>
	</SubsectionAlign>
</template>
<script setup lang="ts">
	import { scrollSmoothToElement } from '../../../utils/scrollServices';
	import SubsectionAlign from './SubsectionAlign.vue';
	import { useResumeStore } from '../../../stores/ResumeStore';
	import { appStore } from '../../../store';
	import { computed, onMounted, ref } from 'vue';
	import emitter from '../../../utils/eventBus';

	const props = defineProps({
		ifEditing: {
			type: Boolean,
			default: false,
		},
		marked: {
			type: Boolean,
			require: true,
		},
	});
	const resumeStore = useResumeStore(appStore);
	const isBeingShowedSetting = ref(false);
	const element = ref<Element | null>(null);

	const disableEditSetting = computed(
		() => resumeStore.isBeingEditingIntroduction
	);
	const changeSetting = () => {
		emitter?.emit('changeSetting');
		tryToShowSetting(!disableEditSetting.value);
	};
	const tryToShowSetting = (canShowSetting: boolean) => {
		if (canShowSetting && element.value) {
			scrollSmoothToElement(element.value);
			isBeingShowedSetting.value = true;
		}
	};
	onMounted(() => {
		isBeingShowedSetting.value = props.ifEditing;
		emitter.on('changeSetting', () => {
			isBeingShowedSetting.value = false;
			tryToShowSetting(props.ifEditing);
		});
	});
</script>
