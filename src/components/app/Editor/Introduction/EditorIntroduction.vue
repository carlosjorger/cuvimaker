<!-- TODO: Add photo -->
<template>
	<SubsectionCard :ifEditing="isBeingEditingIntroduction">
		<template #body>
			<form v-on:submit.prevent class="font-extrabold">
				<SubsectionForm
					class="mt-1 text-lg"
					v-model="currentIntroduction.name"
					placeholder="Your name"
					:lightColor="'primary'"
					:darkColor="'zinc-300'"
					:errors="v$.currentIntroduction?.name?.$errors"
				/>
				<SubsectionForm
					class="mt-1"
					v-model="currentIntroduction.profetion"
					placeholder="Profetion"
					:lightColor="'primary'"
					:darkColor="'zinc-300'"
					:errors="v$.currentIntroduction?.profetion?.$errors"
				/>
				<div class="grid grid-cols-2 gap-2 text-sm max-sm:grid-cols-1">
					<div class="flex items-center">
						<div
							v-if="
								currentIntroduction.location ||
								isBeingEditingIntroduction
							"
							class="mt-1 p-1 text-accent transition-colors duration-500"
						>
							<Icon icon="mdi:location" width="20" />
						</div>

						<SubsectionForm
							class="mt-1 min-w-[82%]"
							v-model="currentIntroduction.location"
							placeholder="Location"
							:lightColor="'primary'"
							:darkColor="'zinc-300'"
						/>
					</div>
					<div
						class="flex items-start"
						v-if="
							currentIntroduction.email ||
							isBeingEditingIntroduction
						"
					>
						<div
							class="mt-1 p-1 text-accent transition-colors duration-500"
						>
							<Icon icon="mdi:email" width="20" />
						</div>

						<SubsectionForm
							class="mt-1 min-w-[82%]"
							v-model="currentIntroduction.email"
							placeholder="Email"
							:lightColor="'primary'"
							:darkColor="'zinc-300'"
							:errors="v$.currentIntroduction?.email?.$errors"
						/>
					</div>

					<div
						class="flex items-start"
						v-if="isBeingEditingIntroduction"
					>
						<div
							class="mt-1 p-1 text-accent transition-colors duration-500"
						>
							<Icon icon="bi:person-fill" width="20" />
						</div>

						<SubsectionForm
							class="mt-1 min-w-[82%]"
							v-model="currentIntroduction.website"
							placeholder="Website"
							:lightColor="'primary'"
							:darkColor="'zinc-300'"
							:errors="v$.currentIntroduction?.website?.$errors"
						/>
					</div>
					<div
						class="flex items-center"
						v-if="
							currentIntroduction.website &&
							!isBeingEditingIntroduction
						"
					>
						<div
							class="mt-1 p-1 text-accent transition-colors duration-500"
						>
							<Icon icon="bi:person-fill" width="20" />
						</div>
						<BasicLink
							:href="currentIntroduction.website"
							:link="currentIntroduction.website"
						/>
					</div>
				</div>
				<!-- TODO: fix social Account in movile view-->
				<div class="flex items-start" v-if="isBeingEditingIntroduction">
					<div
						class="mt-1 p-1 text-accent transition-colors duration-500"
					>
						<Icon icon="mdi:account" width="20" />
					</div>
					<SubsectionForm
						class="mt-1 min-w-[82%] text-sm"
						v-model="currentSocialAccount"
						placeholder="Add a Social Account"
						:lightColor="'primary'"
						:darkColor="'zinc-300'"
						:errors="v$.currentSocialAccount?.$errors"
					/>
					<AppearFadeTransition>
						<CloseAddButton
							toolTipText="Add a Social Account"
							v-if="currentSocialAccount.trim()"
							:size="2.3"
							v-on:click="addSocialAccount()"
							:buttonColor="'bg-inherit'"
							:lineColor="'primary'"
							:darkline-color="'zinc-300'"
						/>
					</AppearFadeTransition>
				</div>
				<ul
					class="relative mt-1 grid grid-cols-2 gap-2 text-sm max-sm:grid-cols-1"
				>
					<ListTransition>
						<SocialAccount
							v-for="(
								socialAccount, index
							) in currentIntroduction.socialAccounts"
							:key="socialAccount.id"
							:socialAccount="socialAccount"
							:index="index"
						/>
					</ListTransition>
				</ul>
			</form>
			<AppearFadeTransition>
				<div v-if="!isNotEmpty && !isBeingEditingIntroduction">
					<h2 class="text-lg text-info">
						Please fill the Introduction of the Resume...
					</h2>
				</div>
			</AppearFadeTransition>
		</template>
		<template #footer>
			<Transition>
				<div
					v-if="isBeingEditingIntroduction"
					class="absolute flex h-full items-center"
				>
					<icon-button
						title="Save Introduction Section"
						icon-name="el:ok"
						@click.prevent="
							() => {
								setEditingIntroduction(false);
								$emit(
									'set-introduction',
									introductionStore.copy
								);
							}
						"
					/>
				</div>
			</Transition>
			<Transition>
				<div
					v-if="!isBeingEditingIntroduction"
					class="absolute flex h-full items-center"
				>
					<icon-button
						title="Edit Introduction Section"
						icon-name="ic:baseline-edit"
						@click.prevent="setEditingIntroduction(true)"
					/>
				</div>
			</Transition>
		</template>
	</SubsectionCard>
</template>

<script lang="ts">
	import type { Introduction } from '../../../../models/Introduction';
	import SubsectionForm from '../../../shared/TextArea/BasicTextArea.vue';
	import { type PropType, computed } from 'vue';
	import SubsectionCard from '../../../shared/Subsection/SubsectionCard.vue';
	import { Icon } from '@iconify/vue';
	import { useVuelidate } from '@vuelidate/core';
	import { email, required, url } from '@vuelidate/validators';
	import CloseAddButton from '../../../shared/Button/CloseAddButton.vue';
	import AppearFadeTransition from '../../../shared/Transition/AppearFadeTransition.vue';
	import SocialAccount from './EditorSocialAccount.vue';
	import { useIntroductionStore } from '../../../../stores/IntroductionStore';
	import { appStore } from '../../../../store';
	import ListTransition from '../../../shared/Transition/ListTransition.vue';
	import BasicLink from '../../../shared/Anchor/BasicLink.vue';
	import { useResumeStore } from '../../../../stores/ResumeStore';
	import IconButton from '../../../shared/Button/IconButton.vue';
	import { isNotEmptyIntroduction } from '../../../../extensions/extensions';

	export default {
		components: {
			SubsectionForm,
			SubsectionCard,
			Icon,
			CloseAddButton,
			AppearFadeTransition,
			SocialAccount,
			ListTransition,
			BasicLink,
			IconButton,
		},
		setup() {
			const introductionStore = useIntroductionStore(appStore);
			const resumeStore = useResumeStore(appStore);

			return {
				v$: useVuelidate({ $scope: true }),
				introductionStore,
				resumeStore,
			};
		},
		name: 'EditorIntroduction',
		props: {
			introduction: {
				type: Object as PropType<Introduction>,
				required: true,
			},
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
		computed: {
			isBeingEditingIntroduction() {
				return this.resumeStore.isBeingEditingIntroduction;
			},
			isNotEmpty() {
				return isNotEmptyIntroduction(this.currentIntroduction);
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
				email: {
					email,
				},
				website: {
					url,
				},
			},
			currentSocialAccount: { url },
		},
		watch: {
			introduction() {
				const { currentIntroduction, currentSocialAccount } =
					this.initialState();
				this.currentIntroduction = currentIntroduction;
				this.currentSocialAccount = currentSocialAccount;
			},
		},
	};
</script>
