<template>
    <div class="flex items-center">
        <div
            class="p-1 text-primary transition-colors duration-500 dark:text-white"
        >
            <Icon :icon="getIconByUrl(socialAccount.link)" width="20" />
        </div>
        <BasicLink :link="socialAccount.link" />
        <AppearFadeTransition>
            <div v-if="selecting && editing" class="absolute flex items-center">
                <circle-button :size="2.2" @click="saveElement" v-if="editing">
                    <Icon
                        icon="el:ok"
                        width="23"
                        color="var(--primary-color)"
                    />
                </circle-button>
                <circle-button
                    :size="2.2"
                    @click="cancelElement"
                    v-if="editing"
                >
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
                v-if="selecting && !editing"
                class="absolute flex items-center"
            >
                <circle-button :size="2.2" @click="editElement" v-if="editing">
                    <Icon
                        icon="ic:baseline-edit"
                        width="22"
                        color="var(--primary-color)"
                    />
                </circle-button>
                <circle-button
                    :size="2.2"
                    @click="deleteElement"
                    v-if="editing"
                >
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

    export default {
        props: {
            socialAccount: {
                type: SocialAccount,
                required: true,
            },
            selecting: {
                type: Boolean,
                required: true,
            },
        },
        components: { BasicLink, Icon, AppearFadeTransition },
        data() {
            return {
                editing: false,
            };
        },
        methods: {
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
    };
</script>
