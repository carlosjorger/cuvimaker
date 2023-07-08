<template>
	<AppearFadeTransition>
		<div></div>
	</AppearFadeTransition>
</template>

<script lang="ts">
	import { Resume } from '../../../models/Resume';
	import AppearFadeTransition from '../../shared/Transition/AppearFadeTransition.vue';
	export default {
		components: { AppearFadeTransition },
		props: {
			resume: {
				type: Resume,
				required: true,
			},
		},
	};
</script>
