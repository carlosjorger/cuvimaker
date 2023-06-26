<template>
    <CircleButton :size="width" class="active:bg-[#a99cd2]">
        <Icon :icon="icon" width="22" :color="color" />
    </CircleButton>
</template>

<script lang="ts">
    import CircleButton from '../../shared/Button/CircleButton.vue';
    import { Icon } from '@iconify/vue';

    export default {
        props: {
            color: {
                type: String,
                required: true,
            },
            icon: {
                type: String,
                required: true,
            },
            width: {
                type: Number,
                default: 2.2,
            },
        },
        components: { CircleButton, Icon },
    };
</script>

<style lang="scss" scoped></style>
