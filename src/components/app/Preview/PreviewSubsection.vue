<template>
	<section class="p-1">
		<h3 class="mt-2 text-base font-semibold">{{ subsection?.title }}</h3>
		<h4 class="mt-1 text-sm font-extrabold">{{ subsection?.text }}</h4>
		<div class="w-[88%] text-xs max-sm:w-11/12">
			<div class="flex items-center justify-between">
				<div
					class="mt-1 flex flex-row items-center"
					v-if="subsection?.subsectionTimeInterval != null"
				>
					<i class="text-primary dark:text-white">
						<Icon
							icon="material-symbols:date-range"
							class="text-secondary"
							width="20"
						/>
					</i>
					&nbsp;
					<time
						:datetime="
							subsection?.subsectionTimeInterval?.dateFrom?.toString()
						"
					>
						{{
							subsection?.subsectionTimeInterval?.dateFrom?.toLocaleString(
								'en-US',
								{ month: 'long' }
							)
						}}
						{{
							subsection?.subsectionTimeInterval?.dateFrom?.getFullYear()
						}}
					</time>
					&nbsp;-&nbsp;
					<time
						:datetime="
							subsection?.subsectionTimeInterval?.dateTo?.toString()
						"
						v-if="subsection?.subsectionTimeInterval?.dateTo"
					>
						{{
							subsection?.subsectionTimeInterval?.dateTo?.toLocaleString(
								'en-US',
								{ month: 'long' }
							)
						}}
						{{
							subsection?.subsectionTimeInterval?.dateTo?.getFullYear()
						}}
					</time>
					<div v-else>current</div>
				</div>
				<h5 class="mt-1 font-extrabold">
					{{ subsection?.location }}
				</h5>
			</div>

			<ul class="ml-6 list-disc text-left">
				<li
					class="p-1"
					v-for="(element, index) in subsection?.elements"
					:key="index"
				>
					<p class="break-words">{{ element.name }}</p>
				</li>
			</ul>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { Subsection } from '../../../models/Subsection';
	import { Icon } from '@iconify/vue';
	defineProps({
		subsection: {
			type: Object as PropType<Subsection>,
			require: true,
		},
	});
</script>
