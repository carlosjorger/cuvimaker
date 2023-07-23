<template>
	<div
		class="mt-2 flex min-h-[5.5rem] w-full items-center justify-end rounded-lg border-solid border-white p-1 text-sm shadow-xl transition-all duration-300 ease-linear"
		:class="{
			['border-4']: editingElement && selecting && editing,
			['bg-[#664596] dark:bg-[#49387a]']: selecting && editing,
			['bg-[var(--primary-form-color)] dark:bg-dark-primary']:
				!selecting || !editing,
		}"
		@click="selectElement"
	>
		<textarea
			ref="element"
			:id="index.toString()"
			v-model="currentElement"
			class="pointer-events-none w-[95%] resize-none overflow-hidden border-0 bg-inherit p-2 text-white focus:outline-none"
			:class="{
				['pointer-events-auto']: editingElement && selecting && editing,
			}"
			rows="1"
			@input="changeTextArea"
		></textarea>
		<div class="w-1/4"></div>
		<AppearFadeTransition>
			<div v-if="selecting && editingElement" class="absolute">
				<div class="flex items-center max-md:flex-col-reverse">
					<CircleButtonWithIcon
						v-if="editing"
						@click="saveElement"
						color="var(--primary-color)"
						icon="el:ok"
						:width="2"
					/>
					<CircleButtonWithIcon
						v-if="editing"
						@click="cancelElement"
						color="var(--primary-color)"
						icon="mdi:cancel-bold"
						:width="2"
					/>
				</div>
			</div>
		</AppearFadeTransition>
		<AppearFadeTransition>
			<div v-if="selecting && !editingElement" class="absolute">
				<div class="flex items-center max-md:flex-col-reverse">
					<CircleButtonWithIcon
						v-if="editing"
						@click="editElement"
						color="var(--primary-color)"
						icon="ic:baseline-edit"
						:width="2"
					/>
					<CircleButtonWithIcon
						v-if="editing"
						@click="deleteElement"
						color="var(--primary-color)"
						icon="ic:baseline-delete"
						:width="2"
					/>
				</div>
			</div>
		</AppearFadeTransition>
	</div>
</template>
<script lang="ts">
	import { inject, ref } from 'vue';
	import { Subsection } from '../../../../models/Subsection';
	import AppearFadeTransition from '../../../shared/Transition/AppearFadeTransition.vue';
	import CircleButtonWithIcon from '../../../shared/Button/CircleButtonWithIcon.vue';

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
