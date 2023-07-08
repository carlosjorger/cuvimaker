<template>
	<button
		type="submit"
		class="rounded-xl border-4 border-primary p-1 text-lg font-extrabold text-primary shadow-xl transition-colors duration-200 ease-out dark:border-zinc-300 dark:text-zinc-300"
		:class="{
			'bg-[#f6f4fb] active:bg-[#9e97bf] dark:bg-dark-primary-200 dark:active:bg-[#140c29]':
				!active,
			'bg-[#9e97bf]  dark:bg-[#140c29]': active,
		}"
	>
		<div
			class="rounded-lg p-0.5 transition-colors duration-200 ease-out"
			:class="{
				'hover:bg-[#c4bddd] dark:hover:bg-[#4e417a]': !active,
			}"
		>
			{{ name }}
		</div>
	</button>
</template>

<script lang="ts">
	export default {
		name: 'BasicButton',
		props: {
			name: {
				type: String,
			},
			active: {
				type: Boolean,
				default: false,
			},
		},
	};
</script>
