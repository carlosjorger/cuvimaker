<template>
	<div class="p-1">
		<h2 class="mt-3 text-left text-lg font-extrabold">
			{{ introduction.name }}
		</h2>
		<h3 class="mt-3 text-left text-base">{{ introduction.profetion }}</h3>
		<div
			class="mt-3 grid grid-cols-3 gap-2 text-xs max-lg:grid-cols-2 max-md:grid-cols-1"
		>
			<div class="flex items-center" v-if="introduction.location">
				<Icon
					id="location"
					class="text-accent"
					icon="mdi:location"
					width="20"
				/>
				<span class="p-1"></span>
				{{ introduction.location }}
			</div>

			<div class="flex items-center" v-if="introduction.email">
				<Icon
					id="email"
					class="text-accent"
					icon="mdi:email"
					width="20"
				/>
				<span class="p-1"></span>
				<BasicEmail :email="introduction.email" />
			</div>
			<div class="flex items-center" v-if="introduction.website">
				<Icon
					id="website"
					class="text-accent"
					icon="bi:person-fill"
					width="20"
				/>
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

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { Introduction } from '../../../models/Introduction';
	import BasicLink from '../../shared/Anchor/BasicLink.vue';
	import IconByUrl from '../../shared/Icon/IconByUrl.vue';
	import { Icon } from '@iconify/vue';
	import BasicEmail from '../../shared/Anchor/BasicEmail.vue';
	defineProps({
		introduction: {
			type: Object as PropType<Introduction>,
			required: true,
		},
	});
</script>
