<template>
    <a
        class="bg-primaryImage bg-[length:100%_0%] bg-[0%_100%] bg-no-repeat text-primary transition-all duration-300 hover:bg-[length:100%_15%] dark:bg-zincImage dark:text-zinc-100"
        :href="link"
    >
        {{ link }}
    </a>
</template>
<script>
    export default {
        props: {
            link: String,
        },
    };
</script>
