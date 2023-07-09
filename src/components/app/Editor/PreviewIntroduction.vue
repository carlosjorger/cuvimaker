<template>
	<div class="p-2">
		<h2 class="mt-3 text-2xl font-extrabold">{{ introduction.name }}</h2>
		<h3 class="mt-3 text-xl">{{ introduction.profetion }}</h3>
		<div
			class="mt-3 grid grid-cols-3 gap-3 text-base max-lg:grid-cols-2 max-md:grid-cols-1"
		>
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
	import { Introduction } from '../../../models/Introduction';
	import { getInfoFromUrl } from '../../../utils/urlService';
	import BasicLink from '../../shared/Anchor/BasicLink.vue';
	import IconByUrl from '../../shared/Icon/IconByUrl.vue';
	export default {
		props: {
			introduction: {
				type: Introduction,
				required: true,
			},
		},
		components: { BasicLink, IconByUrl },
		methods: {
			getInfoFromUrl(link: string | undefined) {
				return getInfoFromUrl(link ?? '');
			},
		},
	};
</script>
