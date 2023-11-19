<template>
	<div
		class="mt-2 flex w-full items-center justify-end rounded-lg border-solid border-base-content px-3 py-3 text-sm shadow-xl transition-all duration-300 ease-linear max-sm:flex-col max-sm:py-3"
		:class="{
			['border-4 max-md:min-h-[5.5rem]']:
				editingElement && selecting && editing,
			['translate-x-2 bg-base-200']: markedElement,
			['bg-base-100']: !markedElement,
			['hover:bg-base-200 ']: editing,
		}"
		@click="selectElement"
	>
		<textarea
			ref="element"
			:id="index.toString()"
			v-model="currentElement"
			class="pointer-events-none w-[95%] resize-none overflow-hidden border-0 bg-inherit p-2 focus:outline-none"
			:class="{
				['pointer-events-auto']: editingElement && selecting && editing,
			}"
			rows="1"
			@input="changeTextArea"
		></textarea>
		<div v-if="selecting" class="w-1/3 max-sm:h-12 max-sm:w-0"></div>
		<AppearFadeTransition
			v-show="selecting"
			v-if="selecting"
			class="max-sm:px-3"
		>
			<div v-if="editingElement" class="absolute max-sm:w-full">
				<div
					class="flex items-center gap-1 max-md:flex-col-reverse max-sm:flex-row-reverse max-sm:justify-between"
				>
					<CircleButtonWithIcon
						v-if="editing"
						@click="saveElement"
						:text="`Save ${sectionTemplate.subsectionElement}`"
						icon="el:ok"
					/>
					<CircleButtonWithIcon
						v-if="editing"
						@click="cancelElement"
						text="Cancel"
						icon="mdi:cancel-bold"
					/>
				</div>
			</div>
			<div v-else class="absolute max-sm:w-full">
				<div
					class="flex items-center gap-1 max-md:flex-col-reverse max-sm:flex-row-reverse max-sm:justify-between"
				>
					<CircleButtonWithIcon
						v-if="editing"
						@click="editElement"
						:text="`Edit ${sectionTemplate.subsectionElement}`"
						icon="ic:baseline-edit"
					/>
					<CircleButtonWithIcon
						v-if="editing"
						@click="deleteElement"
						:text="`Delete ${sectionTemplate.subsectionElement}`"
						icon="ic:baseline-delete"
					/>
				</div>
			</div>
		</AppearFadeTransition>
	</div>
</template>
<script lang="ts">
	import { inject, ref, type PropType } from 'vue';
	import { Subsection } from '../../../../models/Subsection';
	import AppearFadeTransition from '../../../shared/Transition/AppearFadeTransition.vue';
	import CircleButtonWithIcon from '../../../shared/Button/CircleButtonWithIcon.vue';
	import type { SectionTemplate } from '../../../../models/SectionTemplate';

	export default {
		name: 'EditorElement',
		props: {
			selecting: {
				type: Boolean,
				required: true,
			},

			element: {
				type: String,
				required: true,
			},
			index: {
				type: Number,
				required: true,
			},
			marked: {
				type: Boolean,
				required: true,
			},
			sectionTemplate: {
				type: Object as PropType<SectionTemplate>,
				required: true,
			},
		},
		emits: ['selectElement', 'delete-element'],
		components: {
			AppearFadeTransition,
			CircleButtonWithIcon,
		},
		data() {
			return {
				editing: inject('editing', false),
				subsection: inject('subsection', new Subsection()),
				currentElement: '',
				editingElement: false,
			};
		},
		setup() {
			const fileInput = ref<HTMLInputElement | null>(null);
			return {
				fileInput,
			};
		},
		created() {
			window.addEventListener('resize', this.resizeHandler);
		},

		unmounted() {
			window.removeEventListener('resize', this.resizeHandler);
		},
		methods: {
			resizeHandler() {
				this.changeTextArea();
			},
			changeTextArea() {
				var textArea = this.$refs.element as HTMLInputElement | null;

				if (textArea) {
					textArea.style.height = '0px';
					textArea.style.height = textArea?.scrollHeight + 'px';
				}
			},
			deleteElement() {
				this.$emit('delete-element', this.index);
			},
			editElement() {
				this.editingElement = true;
				this.fileInput?.focus();
			},
			saveElement() {
				this.subsection.elements[this.index].name = this.currentElement;
				this.editingElement = false;
			},
			selectElement() {
				if (!this.editingElement && this.editing) {
					this.$emit('selectElement');
				}
			},
			cancelElement() {
				this.resetElementValue();
			},
			resetElementValue() {
				this.currentElement = this.element;
				this.editingElement = false;
			},
		},
		mounted() {
			this.changeTextArea();
			this.resetElementValue();
		},
		computed: {
			markedElement() {
				return (this.selecting && this.editing) || this.marked;
			},
		},
		watch: {
			selecting(newValue: boolean) {
				if (!newValue) {
					this.cancelElement();
				}
			},
			editing(newValue: boolean) {
				if (!newValue) {
					this.resetElementValue();
				}
			},
			currentElement() {
				this.$nextTick(() => {
					this.changeTextArea();
				});
			},
			element(element: string) {
				this.currentElement = element;
			},
		},
	};
</script>
