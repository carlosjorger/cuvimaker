<template>
	<div class="p-2">
		<h2 class="mt-3 text-2xl font-extrabold">{{ introduction.name }}</h2>
		<h3 class="mt-3 text-xl">{{ introduction.profetion }}</h3>
		<div
			class="mt-3 grid grid-cols-3 gap-3 text-base max-lg:grid-cols-2 max-md:grid-cols-1"
		>
			<div class="flex items-center" v-if="introduction.location">
				<Icon icon="mdi:location" width="20" />
				<span class="p-1"></span>
				{{ introduction.location }}
			</div>

			<div
				v-for="socialAccount in introduction.socialAccounts"
				:key="socialAccount.id"
				class="flex items-center"
			>
				<IconByUrl :url="socialAccount.link" />
				<span class="p-1"></span>
				<BasicLink
					:href="socialAccount.link"
					:link="socialAccount.link"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import type { PropType } from 'vue';
	import type { Introduction } from '../../../models/Introduction';
	import { getInfoFromUrl } from '../../../utils/urlService';
	import BasicLink from '../../shared/Anchor/BasicLink.vue';
	import IconByUrl from '../../shared/Icon/IconByUrl.vue';
	import { Icon } from '@iconify/vue';

	export default {
		props: {
			introduction: {
				type: Object as PropType<Introduction>,
				required: true,
			},
		},
		components: { BasicLink, IconByUrl, Icon },
		methods: {
			getInfoFromUrl(link: string | undefined) {
				return getInfoFromUrl(link ?? '');
			},
		},
	};
</script>
