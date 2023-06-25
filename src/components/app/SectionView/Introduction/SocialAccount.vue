<!-- TODO:Add option to delete and update the social accounts -->

<template>
    <div
        class="m-1 flex w-11/12 items-center justify-end rounded-lg p-1.5 transition-all duration-300 ease-linear"
        @mouseover="mouseover"
        @mouseleave="mouseleave"
        :class="{
            ['bg-[#9c74da]']: editing,
        }"
    >
        <div class="flex w-9/12 resize-none">
            <div
                class="p-1 text-primary transition-colors duration-500 dark:text-white"
            >
                <Icon :icon="getIconByUrl(socialAccount.link)" width="20" />
            </div>
            <BasicLink :link="socialAccount.link" />
        </div>
        <div class="w-1/4"></div>
        <AppearFadeTransition>
            <div
                v-if="selecting && editing && isBeingEditingIntroduction"
                class="absolute flex items-center"
            >
                <circle-button :size="2.2" @click="saveElement">
                    <Icon
                        icon="el:ok"
                        width="23"
                        color="var(--primary-color)"
                    />
                </circle-button>
                <circle-button :size="2.2" @click="cancelElement">
                    <Icon
                        icon="mdi:cancel-bold"
                        width="23"
                        color="var(--primary-color)"
                    />
                </circle-button>
            </div>
        </AppearFadeTransition>
        <AppearFadeTransition>
            <div
                v-if="selecting && !editing && isBeingEditingIntroduction"
                class="absolute flex items-center"
            >
                <circle-button :size="2.2" @click="editElement">
                    <Icon
                        icon="ic:baseline-edit"
                        width="22"
                        color="var(--primary-color)"
                    />
                </circle-button>
                <circle-button :size="2.2" @click="deleteElement">
                    <Icon
                        icon="ic:baseline-delete"
                        width="22"
                        color="var(--primary-color)"
                    />
                </circle-button>
            </div>
        </AppearFadeTransition>
    </div>
</template>
<script lang="ts">
    import { SocialAccount } from '../../../../models/SocialAccount';
    import BasicLink from '../../../shared/Anchor/BasicLink.vue';
    import { Icon } from '@iconify/vue';
    import AppearFadeTransition from '../../../shared/Transition/AppearFadeTransition.vue';
    import CircleButton from '../../../shared/Button/CircleButton.vue';
    import { useIntroductionStore } from '../../../../stores/IntroductionStore';
    import { appStore } from '../../../../store';
    import { storeToRefs } from 'pinia';

    export default {
        props: {
            socialAccount: {
                type: SocialAccount,
                required: true,
            },
            isBeingEditingIntroduction: {
                type: Boolean,
                required: true,
            },
        },
        components: { BasicLink, Icon, AppearFadeTransition, CircleButton },
        setup() {
            const introductionStore = useIntroductionStore(appStore);
            return {
                introductionStore,
            };
        },
        data() {
            return this.initialState();
        },

        methods: {
            initialState() {
                const { isSelected } = storeToRefs(this.introductionStore);
                return {
                    editing: false,
                    isSelected,
                };
            },
            mouseover() {
                this.introductionStore.selectASocialAccount(
                    this.socialAccount.Id
                );
            },
            mouseleave() {
                this.introductionStore.selectASocialAccount(-1);
            },
            getIconByUrl(url: string) {
                if (url.includes('github.com/')) {
                    return 'mdi:github';
                }
                if (url.includes('twitter.com/')) {
                    return 'mdi:twitter';
                }
                if (url.includes('linkedin.com/in/')) {
                    return 'mdi:linkedin';
                }
                if (url.includes('reddit.com')) {
                    return 'ic:baseline-reddit';
                }
                if (url.includes('t.me')) {
                    return 'ic:baseline-telegram';
                }
                if (url.includes('instagram.com')) {
                    return 'mdi:instagram';
                }
                if (url.includes('facebook.com')) {
                    return 'ic:baseline-facebook';
                }
                if (url.includes('tiktok.com')) {
                    return 'ic:baseline-tiktok';
                }
                if (url.includes('tiktok.com')) {
                    return 'ic:baseline-tiktok';
                }
                if (url.includes('youtube.com')) {
                    return 'mdi:youtube';
                }
                if (url.includes('twitch.tv')) {
                    return 'mdi:twitch';
                }
                return 'material-symbols:account-box';
            },
            deleteElement() {
                console.log('delete');
            },
            editElement() {
                this.editing = true;
                // this.fileInput?.focus();
            },
            saveElement() {
                // this.subsection.elements[this.index].name = this.currentElement;
                this.editing = false;
            },
            selectElement() {
                if (!this.editing) {
                    this.$emit('selectElement');
                }
            },
            cancelElement() {
                // this.resetElementValue();
            },
        },
        computed: {
            selecting() {
                return this.isSelected(this.socialAccount.Id);
            },
        },
    };
</script>
