<template>
    <transition name="appear-fade">
        <slot></slot>
    </transition>
</template>

<script>
    export default {};
</script>

<style>
    .appear-fade-leave-active {
        transition: all 0.5s ease;
    }
    .appear-fade-enter-active {
        transition: all 0.5s ease;
    }
    .appear-fade-leave-to,
    .appear-fade-enter-from {
        opacity: 0;
    }
</style>
