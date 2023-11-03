<template>
	<transition name="appear-fade">
		<slot></slot>
	</transition>
</template>

<style>
	.appear-fade-leave-active,
	.appear-fade-enter-active {
		transition: all 0.3s ease;
	}
	.appear-fade-leave-to,
	.appear-fade-enter-from {
		opacity: 0;
	}
</style>
