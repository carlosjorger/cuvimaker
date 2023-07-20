<template>
	<div class="p-2">
		<h2 class="mt-3 text-2xl font-extrabold">{{ introduction.name }}</h2>
		<h3 class="mt-3 text-xl">{{ introduction.profetion }}</h3>
		<div
			class="mt-3 grid grid-cols-3 gap-3 text-base max-lg:grid-cols-2 max-md:grid-cols-1"
		>
			<div>
				<div class="flex items-center" v-if="introduction.location">
					<Icon id="location" icon="mdi:location" width="20" />
					<span class="p-1"></span>
					{{ introduction.location }}
				</div>
			</div>

			<div class="flex items-center" v-if="introduction.email">
				<Icon id="email" icon="mdi:email" width="20" />
				<span class="p-1"></span>
				<BasicEmail :email="introduction.email" />
			</div>
			<div class="flex items-center" v-if="introduction.website">
				<Icon id="website" icon="el:website" width="20" />
				<span class="p-1"></span>
				<BasicLink
					:href="introduction.website"
					:link="introduction.website"
				/>
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
	import BasicEmail from '../../shared/Anchor/BasicEmail.vue';

	export default {
		props: {
			introduction: {
				type: Object as PropType<Introduction>,
				required: true,
			},
		},
		components: { BasicLink, BasicEmail, IconByUrl, Icon },
		methods: {
			getInfoFromUrl(link: string | undefined) {
				return getInfoFromUrl(link ?? '');
			},
		},
	};
</script>
