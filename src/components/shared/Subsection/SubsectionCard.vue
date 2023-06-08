<template>
     <article
        class="mt-4 w-2/5 rounded-md border-4 border-solid border-primary bg-[#f6f4fb] shadow-xl transition-colors duration-700 hover:bg-[#e1d7fd] dark:border-zinc-300 dark:bg-dark-primary-300 dark:hover:bg-dark-primary max-xl:w-1/2 max-lg:w-4/5 max-md:w-5/6 max-sm:w-11/12"
        >
        <body class="p-8" @click="changeSetting">
            <slot name="body"></slot>
        </body>
        <footer
            class="w-full relative overflow-hidden bg-primary transition-all duration-500 dark:bg-zinc-300 flex justify-end"
            :class="{
                ['h-16']: showSetting,
                ['h-0']: !showSetting,
            }"
        >
            <slot name="footer">

            </slot>
        </footer>
     </article>
</template>

<script lang="ts">
    export default {
        name: 'SubsectionCard',
        
        data() {
            return {
                showSetting: false,
            };
        },
        methods: {
            changeSetting() {
                this.showSetting = !this.showSetting;
            },
        },
    };
</script>
