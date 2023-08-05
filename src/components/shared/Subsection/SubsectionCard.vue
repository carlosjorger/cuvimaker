<template>
	<SubsectionAlign>
		<section
			class="w-full rounded-md border-4 border-solid border-primary bg-[#f6f4fb] shadow-xl transition-colors duration-700 hover:bg-[#e1d7fd] dark:border-zinc-300 dark:bg-dark-primary-300 dark:hover:bg-dark-primary"
		>
			<main class="p-4 max-md:p-4 max-sm:p-2" @click="changeSetting">
				<slot name="body"></slot>
			</main>
			<footer
				class="relative flex w-full justify-end overflow-hidden bg-primary transition-all duration-200 dark:bg-zinc-300"
				:class="{
					['h-12']: isBeingShowedSetting,
					['h-0']: !isBeingShowedSetting,
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
	const emitter = mitt();
	export default {
		name: 'SubsectionCard',
		props: {
			disableEditSetting: {
				type: Boolean,
				default: false,
			},
			ifEditing: {
				type: Boolean,
				default: false,
			},
		},
		components: { SubsectionAlign },
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
	};
</script>
