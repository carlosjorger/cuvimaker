<template>
	<section>
		<h3 class="mt-2 text-base font-semibold">{{ subsection?.title }}</h3>
		<h4 class="mt-1 text-sm font-extrabold">{{ subsection?.text }}</h4>
		<div
			class="mt-1 flex flex-row items-center text-sm"
			v-if="subsection?.subsectionTimeInterval != null"
		>
			<i class="text-primary dark:text-white">
				<Icon icon="material-symbols:date-range" width="25" />
			</i>
			&nbsp;
			<div>
				{{
					subsection?.subsectionTimeInterval?.dateFrom?.toLocaleString(
						'en-US',
						{ month: 'long' }
					)
				}}
				{{
					subsection?.subsectionTimeInterval?.dateFrom?.getFullYear()
				}}
			</div>
			&nbsp;-&nbsp;
			<div>
				{{
					subsection?.subsectionTimeInterval?.dateTo?.toLocaleString(
						'en-US',
						{ month: 'long' }
					)
				}}
				{{ subsection?.subsectionTimeInterval?.dateTo?.getFullYear() }}
			</div>
		</div>
		<ul class="ml-6 list-disc text-sm">
			<li
				class="p-1"
				v-for="(element, index) in subsection?.elements"
				:key="index"
			>
				{{ element.name }}
			</li>
		</ul>
	</section>
</template>

<script lang="ts">
	import type { PropType } from 'vue';
	import type { Subsection } from '../../../models/Subsection';
	import { Icon } from '@iconify/vue';

	export default {
		name: 'PreviewSubsection',
		components: { Icon },
		props: {
			subsection: {
				type: Object as PropType<Subsection>,
				require: true,
			},
		},
		methods: {},
	};
</script>
