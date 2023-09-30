<template>
	<SubsectionAlign>
		<section
			class="section w-full rounded-md border-4 border-solid border-primary bg-[#f6f4fb] shadow-xl transition-all duration-300 hover:bg-[#e1d7fd] dark:border-zinc-300 dark:bg-dark-primary-300 dark:hover:bg-dark-primary"
		>
			<main
				class="p-7 max-lg:p-10 max-md:p-7 max-sm:p-3"
				@mousedown="changeSetting"
			>
				<slot name="body"></slot>
			</main>
			<footer
				class="relative flex w-full justify-end bg-primary transition-all duration-200 dark:bg-zinc-300"
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
<script lang="ts">
	import { scrollSmoothToElement } from '../../../utils/scrollServices';
	import mitt from 'mitt';
	import SubsectionAlign from './SubsectionAlign.vue';
	import { useResumeStore } from '../../../stores/ResumeStore';
	import { appStore } from '../../../store';
	const emitter = mitt();
	export default {
		name: 'SubsectionCard',
		props: {
			ifEditing: {
				type: Boolean,
				default: false,
			},
			marked: {
				type: Boolean,
				require: true,
			},
		},
		components: { SubsectionAlign },
		setup() {
			const resumeStore = useResumeStore(appStore);
			return {
				resumeStore,
			};
		},
		data() {
			return {
				isBeingShowedSetting: false,
			};
		},
		mounted() {
			this.isBeingShowedSetting = this.ifEditing;
			emitter.on('changeSetting', () => {
				this.isBeingShowedSetting = false;
				this.tryToShowSetting(this.ifEditing);
			});
		},
		methods: {
			changeSetting() {
				emitter?.emit('changeSetting');
				this.tryToShowSetting(!this.disableEditSetting);
			},
			tryToShowSetting(canShowSetting: boolean) {
				if (canShowSetting) {
					scrollSmoothToElement(this.$el);
					this.isBeingShowedSetting = true;
				}
			},
		},
		computed: {
			disableEditSetting() {
				return this.resumeStore.isBeingEditingIntroduction;
			},
		},
	};
</script>
<style>
	.marked .section {
		background-color: #e1d7fd;
		transform: translateX(1rem);
	}
	.dark .marked .section {
		background-color: rgb(63 50 104);
		transform: translateX(1rem);
	}
</style>
