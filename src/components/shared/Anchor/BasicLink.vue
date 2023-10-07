<template>
	<a
		class="bg-anchorImage bg-[length:100%_0%] bg-[0%_100%] bg-no-repeat text-accent-focus transition-all duration-300 hover:bg-[length:100%_15%]"
		:href="link"
	>
		{{ getInfoFromUrl(link) }}
	</a>
</template>
<script lang="ts">
	import { getInfoFromUrl } from '../../../utils/urlService';
	export default {
		props: {
			link: String,
		},
		methods: {
			getInfoFromUrl(link: string | undefined) {
				return getInfoFromUrl(link ?? '');
			},
		},
	};
</script>
