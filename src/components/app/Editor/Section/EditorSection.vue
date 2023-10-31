<template>
	<SubsectionCard
		ref="currentElement"
		class="group"
		:class="{
			['marked']: marked,
		}"
		:marked="marked"
		:ifEditing="false"
	>
		<template #body>
			<div @click="changeSetting">
				<PreviewSectionHeader :name="section?.name" />
				<div v-if="!allSubsectionsHaveOnlyATitle">
					<SubsectionComponent
						v-for="(subsection, index) in section?.subsections"
						:key="index"
						:subsection="subsection"
					/>
				</div>
				<ul class="ml-6 list-disc text-left" v-else>
					<li
						v-for="(subsection, index) in section?.subsections"
						:key="index"
						:subsection="subsection"
						v-show="subsection?.title"
					>
						<h3 class="mt-2 text-base font-semibold">
							{{ subsection?.title }}
						</h3>
					</li>
				</ul>
			</div>
		</template>
		<template #footer>
			<icon-button
				title="Edit a Section"
				iconName="material-symbols:edit"
				@click.prevent="$emit('edit-section')"
			/>
			<icon-button
				title="Delete a Section"
				iconName="mdi:trash"
				@click.prevent="$emit('delete-section')"
			/>
		</template>
	</SubsectionCard>
</template>
<script setup lang="ts">
	import type { Section } from '../../../../models/Section';
	import SubsectionComponent from '../../Preview/PreviewSubsection.vue';
	import SubsectionCard from '../../../shared/Subsection/SubsectionCard.vue';
	import { scrollSmoothToElement } from '../../../../utils/scrollServices';
	import PreviewSectionHeader from '../../Preview/PreviewSectionHeader.vue';
	import { onMounted, ref, type PropType, computed } from 'vue';
	import IconButton from '../../../shared/Button/IconButton.vue';
	const props = defineProps({
		section: {
			type: Object as PropType<Section>,
			require: true,
		},
		marked: {
			type: Boolean,
			require: true,
		},
	});
	const currentElement = ref<Element | null>(null);
	const showSetting = ref(false);
	onMounted(() => {
		const element = currentElement?.value;
		if (element) {
			scrollSmoothToElement(element);
		}
	});
	const changeSetting = () => {
		showSetting.value = !showSetting.value;
	};
	const allSubsectionsHaveOnlyATitle = computed(
		() =>
			props.section?.subsections.every(
				(subsection) =>
					!subsection.text &&
					!subsection.location &&
					subsection.elements.length == 0
			)
	);
</script>
