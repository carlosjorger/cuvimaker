<template>
	<transition name="appear-fade-panel">
		<slot></slot>
	</transition>
</template>

<script>
	export default {};
</script>

<style>
	.appear-fade-panel-leave-active {
		animation: appear 0.2s ease-in reverse;
	}
	.appear-fade-panel-enter-active {
		animation: appear 0.6s ease-in;
	}

	@keyframes appear {
		0% {
			opacity: 0;
			height: 0;
		}
		100% {
			opacity: 1;
			height: inherit;
		}
	}
</style>
