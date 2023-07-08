<template>
	<Icon :icon="getIconByUrl" width="20" />
</template>

<script lang="ts">
	import { Icon } from '@iconify/vue';
	import { getIconByUrl } from '../../../utils/urlService';

	export default {
		props: {
			url: {
				type: String,
				required: true,
			},
		},
		components: { Icon },
		computed: {
			getIconByUrl() {
				return getIconByUrl(this.url);
			},
		},
	};
</script>
