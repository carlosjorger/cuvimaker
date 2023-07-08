<template>
	<li
		class="m-1 flex w-11/12 items-center justify-end rounded-lg p-2 transition-all duration-300 ease-linear"
		@mouseover="mouseover"
		@mouseleave="mouseleave"
		:class="{
			['bg-[#9c74da]']: selecting && isBeingEditingIntroduction,
		}"
	>
		<div class="flex w-3/4 resize-none items-center">
			<div
				class="p-1 text-primary transition-colors duration-500 dark:text-white"
			>
				<IconByUrl :url="link" />
			</div>
			<BasicLink v-if="!editing" :link="link" />
			<SubsectionForm
				v-if="editing"
				:lightColor="'primary'"
				:darkColor="'zinc-300'"
				v-model="link"
				class="w-full"
			/>
		</div>
		<div class="w-1/4"></div>
		<AppearFadeTransition>
			<div
				v-if="selecting && editing && isBeingEditingIntroduction"
				class="absolute flex items-center"
			>
				<CircleButtonWithIcon
					@click="saveElement"
					color="var(--primary-color)"
					icon="el:ok"
				/>
				<CircleButtonWithIcon
					@click="cancelElement"
					color="var(--primary-color)"
					icon="mdi:cancel-bold"
				/>
			</div>
		</AppearFadeTransition>
		<AppearFadeTransition>
			<div
				v-if="selecting && !editing && isBeingEditingIntroduction"
				class="absolute flex items-center"
			>
				<CircleButtonWithIcon
					@click="editElement"
					color="var(--primary-color)"
					icon="ic:baseline-edit"
				/>
				<CircleButtonWithIcon
					@click="deleteElement"
					color="var(--primary-color)"
					icon="ic:baseline-delete"
				/>
			</div>
		</AppearFadeTransition>
	</li>
</template>

<script lang="ts">
	import { SocialAccount } from '../../../../models/SocialAccount';
	import BasicLink from '../../../shared/Anchor/BasicLink.vue';
	import AppearFadeTransition from '../../../shared/Transition/AppearFadeTransition.vue';
	import { storeToRefs } from 'pinia';
	import { useIntroductionStore } from '../../../../stores/IntroductionStore';
	import { appStore } from '../../../../store';
	import type { ComputedRef } from 'vue';
	import SubsectionForm from '../../Subsection/SubsectionForm.vue';
	import CircleButtonWithIcon from '../../../shared/Button/CircleButtonWithIcon.vue';
	import IconByUrl from '../../../shared/Icon/IconByUrl.vue';
	export default {
		components: {
			BasicLink,
			AppearFadeTransition,
			SubsectionForm,
			CircleButtonWithIcon,
			IconByUrl,
		},
		setup() {
			const introductionStore = useIntroductionStore(appStore);
			return {
				introductionStore,
			};
		},
		name: 'SocialAccount',
		props: {
			socialAccount: {
				type: SocialAccount,
				required: true,
			},
			index: {
				type: Number,
				required: true,
			},
			isBeingEditingIntroduction: {
				type: Boolean,
				required: true,
			},
		},
		data(): {
			editing: boolean;
			isSelected: ComputedRef<(SocialAccountId: number) => boolean>;
			link: string;
		} {
			return this.initialState();
		},
		methods: {
			initialState(): {
				editing: boolean;
				isSelected: ComputedRef<(SocialAccountId: number) => boolean>;
				link: string;
			} {
				const { isSelected } = storeToRefs(this.introductionStore);
				return {
					editing: false,
					isSelected,
					link: this.socialAccount.link,
				};
			},
			mouseover() {
				this.introductionStore.selectASocialAccount(
					this.socialAccount.id
				);
			},
			mouseleave() {
				if (!this.editing) {
					this.introductionStore.unSelectASocialAccount(
						this.socialAccount.id
					);
				}
			},

			deleteElement() {
				this.introductionStore.unSelectASocialAccount(
					this.socialAccount.id
				);
				this.introductionStore.removeSocialAccount(this.index);
			},
			editElement() {
				this.editing = true;
			},
			saveElement() {
				this.editing = false;
				this.introductionStore.saveSocialAccount(this.index, this.link);
			},
			cancelElement() {
				this.editing = false;
				// this.resetElementValue();
			},
		},
		computed: {
			selecting() {
				return this.isSelected(this.socialAccount.id);
			},
		},
	};
</script>
