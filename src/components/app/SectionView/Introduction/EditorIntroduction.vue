<template>
	<SubsectionCard
		:disableEditSetting="isBeingEditingIntroduction"
		:ifEditing="isBeingEditingIntroduction"
	>
		<template #body>
			<form v-on:submit.prevent class="font-extrabold">
				<SubsectionForm
					class="mt-1 text-xl"
					v-model="currentIntroduction.name"
					placeholder="Your name"
					:lightColor="'primary'"
					:darkColor="'zinc-300'"
					:errors="v$.currentIntroduction.name.$errors"
				/>
				<SubsectionForm
					class="mt-1 text-lg"
					v-model="currentIntroduction.profetion"
					placeholder="Profetion"
					:lightColor="'primary'"
					:darkColor="'zinc-300'"
					:errors="v$.currentIntroduction.profetion.$errors"
				/>
				<div class="flex items-center">
					<div
						v-if="
							currentIntroduction.location ||
							isBeingEditingIntroduction
						"
						class="mt-1 p-1 text-primary transition-colors duration-500 dark:text-white"
					>
						<Icon icon="mdi:location" width="20" />
					</div>

					<SubsectionForm
						class="mt-1 min-w-[82%] text-base"
						v-model="currentIntroduction.location"
						placeholder="Location"
						:lightColor="'primary'"
						:darkColor="'zinc-300'"
					/>
				</div>
				<div class="flex items-start" v-if="isBeingEditingIntroduction">
					<div
						class="mt-1 p-1 text-primary transition-colors duration-500 dark:text-white"
					>
						<Icon icon="mdi:account" width="20" />
					</div>
					<SubsectionForm
						class="mt-1 min-w-[82%] text-base"
						v-model="currentSocialAccount"
						placeholder="Add a Social Account"
						:lightColor="'primary'"
						:darkColor="'zinc-300'"
						:errors="v$.currentSocialAccount.$errors"
					/>
					<AppearFadeTransition>
						<CloseAddButton
							v-if="currentSocialAccount.trim()"
							:size="2.3"
							v-on:click="addSocialAccount()"
							:buttonColor="'bg-inherit'"
							:lineColor="'primary'"
							:darkline-color="'zinc-300'"
						/>
					</AppearFadeTransition>
				</div>
				<ul class="mt-1">
					<ListTransition class="relative block">
						<SocialAccount
							v-for="(
								socialAccount, index
							) in currentIntroduction.socialAccounts"
							:key="socialAccount.id"
							:socialAccount="socialAccount"
							:isBeingEditingIntroduction="
								isBeingEditingIntroduction
							"
							:index="index"
						/>
					</ListTransition>
				</ul>
			</form>
		</template>
		<template #footer>
			<Transition>
				<div
					v-if="isBeingEditingIntroduction"
					class="absolute flex h-full items-center"
				>
					<a
						class="w-12 p-2 text-white transition-colors duration-500 hover:text-anchor dark:text-dark-primary dark:hover:text-anchor"
						@click="
							() => {
								setEditingIntroduction(false);
								$emit(
									'set-introduction',
									introductionStore.copy
								);
							}
						"
					>
						<Icon icon="el:ok" width="30" />
					</a>
				</div>
			</Transition>
			<Transition>
				<div
					v-if="!isBeingEditingIntroduction"
					class="absolute flex h-full items-center"
				>
					<a
						class="w-12 p-2 text-white transition-colors duration-500 hover:text-anchor dark:text-dark-primary dark:hover:text-anchor"
						@click="
							() => {
								setEditingIntroduction(true);
							}
						"
					>
						<Icon icon="ic:baseline-edit" width="30" />
					</a>
				</div>
			</Transition>
		</template>
	</SubsectionCard>
</template>

<script lang="ts">
	import type { Introduction } from '../../../../models/Introduction';
	import SubsectionForm from '../../Subsection/SubsectionForm.vue';
	import { PropType, computed } from 'vue';
	import SubsectionCard from '../../../shared/Subsection/SubsectionCard.vue';
	import { Icon } from '@iconify/vue';
	import { useVuelidate } from '@vuelidate/core';
	import { required, url } from '@vuelidate/validators';
	import CloseAddButton from '../../../shared/Button/CloseAddButton.vue';
	import AppearFadeTransition from '../../../shared/Transition/AppearFadeTransition.vue';
	import SocialAccount from './SocialAccount.vue';
	import { useIntroductionStore } from '../../../../stores/IntroductionStore';
	import { appStore } from '../../../../store';
	import ListTransition from '../../../shared/Transition/ListTransition.vue';
	export default {
		components: {
			SubsectionForm,
			SubsectionCard,
			Icon,
			CloseAddButton,
			AppearFadeTransition,
			SocialAccount,
			ListTransition,
		},
		setup() {
			const introductionStore = useIntroductionStore(appStore);
			return {
				v$: useVuelidate({ $scope: true }),
				introductionStore,
			};
		},
		name: 'EditorIntroduction',
		props: {
			introduction: {
				type: Object as PropType<Introduction>,
				required: true,
			},
			isBeingEditingIntroduction: Boolean,
		},
		data(): {
			currentIntroduction: Introduction;
			currentSocialAccount: string;
		} {
			return this.initialState();
		},
		provide() {
			return {
				editing: computed(() => this.isBeingEditingIntroduction),
			};
		},
		methods: {
			initialState(): {
				currentIntroduction: Introduction;
				currentSocialAccount: string;
			} {
				this.introductionStore.setIntroduction(this.introduction);
				const { introduction } = this.introductionStore;
				return {
					currentIntroduction: introduction,
					currentSocialAccount: '',
				};
			},
			setEditingIntroduction(value: boolean) {
				if (this.isBeingEditingIntroduction) {
					this.v$.$validate();
					if (this.v$.$error) {
						return;
					} else {
						this.v$.$reset();
					}
				}
				this.$emit('set-editing-introduction', value);
			},
			addSocialAccount() {
				this.v$.currentSocialAccount.$touch();
				if (this.v$.currentSocialAccount.$invalid) {
					return;
				} else {
					this.v$.$reset();
				}
				this.introductionStore.addSocialAccount(
					this.currentSocialAccount
				);

				this.currentSocialAccount = '';
			},
		},
		validations: {
			currentIntroduction: {
				name: {
					required,
				},
				profetion: {
					required,
				},
			},
			currentSocialAccount: { url },
		},
	};
</script>
