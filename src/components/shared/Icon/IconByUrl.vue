<template>
	<Icon :id="id" :icon="getIconByUrl" class="text-accent" width="20" />
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
			id() {
				return getIconByUrl(this.url);
			},
		},
	};
</script>
