<template>
	<transition-group name="list" tag="div">
		<slot></slot>
	</transition-group>
</template>

<script>
	export default {};
</script>

<style>
	.list-move,
	.list-leave-active,
	.list-enter-active {
		transition: all 0.5s ease;
	}
	.list-enter-from,
	.list-leave-to {
		opacity: 0;
		transform: translateX(-1rem);
	}
	.list-leave-active {
		position: absolute;
	}
</style>
