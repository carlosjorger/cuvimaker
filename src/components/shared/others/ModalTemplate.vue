<template>
    <transition name="show-close-modal">
        <div
            class="fixed bottom-0 left-0 right-0 top-0 z-10 flex h-full items-center justify-around justify-self-center bg-[#000000da]"
        >
            <slot></slot>
        </div>
    </transition>
</template>
<style>
    .show-close-modal-leave-active {
        transition: all 0.5s ease;
    }
    .show-close-modal-enter-active {
        transition: all 0.5s ease;
    }
    .show-close-modal-leave-to,
    .show-close-modal-enter-from {
        transform: translateY(-1rem);
        opacity: 0;
    }
</style>
