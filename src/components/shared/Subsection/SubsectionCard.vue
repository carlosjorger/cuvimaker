<template>
    <article
        class="mb-4 mt-4 w-1/2 rounded-md border-4 border-solid border-primary bg-[#f6f4fb] shadow-xl transition-colors duration-700 hover:bg-[#e1d7fd] dark:border-zinc-300 dark:bg-dark-primary-300 dark:hover:bg-dark-primary max-xl:w-1/2 max-lg:w-4/5 max-md:w-5/6 max-sm:w-11/12"
    >
        <body class="p-8" @click="changeSetting">
            <slot name="body"></slot>
        </body>
        <footer
            class="relative flex w-full justify-end overflow-hidden bg-primary transition-all duration-500 dark:bg-zinc-300"
            :class="{
                ['h-16']: isBeingShowedSetting,
                ['h-0']: !isBeingShowedSetting,
            }"
        >
            <slot name="footer"> </slot>
        </footer>
    </article>
</template>
<script lang="ts">
    import { scrollSmoothToElement } from '../../../utils/scrollServices';
    import mitt from 'mitt';

    const emitter = mitt();
    export default {
        name: 'SubsectionCard',
        props: {
            disableEditSetting: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                isBeingShowedSetting: false,
            };
        },
        mounted() {
            emitter.on('changeSetting', () => {
                this.isBeingShowedSetting = false;
            });
        },
        methods: {
            changeSetting() {
                // TODO: avoid hidden the Setting if another section is selected
                emitter?.emit('changeSetting');
                this.showSetting();
            },
            showSetting() {
                if (!this.disableEditSetting) {
                    scrollSmoothToElement(this.$el);
                    this.isBeingShowedSetting = true;
                }
            },
        },
    };
</script>
