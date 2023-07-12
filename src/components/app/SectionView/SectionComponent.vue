<template>
	<SubsectionCard
		:disableEditSetting="isBeingEditingIntroduction"
		:ifEditing="false"
	>
		<template #body>
			<div class="p-4" @click="changeSetting">
				<header>
					<h3
						class="text-xl font-extrabold text-primary dark:text-white"
					>
						{{ section?.name }}
					</h3>
				</header>
				<hr class="mt-1 h-1 rounded-md bg-primary dark:bg-zinc-300" />

				<SubsectionComponent
					v-for="(subsection, index) in section?.subsections"
					:key="index"
					:subsection="subsection"
				/>
			</div>
		</template>
		<template #footer>
			<a
				class="w-12 p-2 text-white transition-colors duration-500 hover:text-anchor dark:text-dark-primary dark:hover:text-anchor"
			>
				<Icon
					@click="$emit('delete-section')"
					icon="mdi:trash"
					width="30"
				/>
			</a>
			<a
				class="w-12 p-2 text-white transition-colors duration-500 hover:text-anchor dark:text-dark-primary dark:hover:text-anchor"
			>
				<Icon
					icon="material-symbols:edit"
					width="30"
					@click="$emit('edit-section')"
				/>
			</a>
		</template>
	</SubsectionCard>
</template>
<script lang="ts">
	/* target: 3.3, extensions: [".vue"], lib: "vue", jsxSlots: false, strictTemplates: false, skipTemplateCodegen: false, nativeTags: ["html","body","base","head","link","meta","style","title","address","article","aside","footer","header","hgroup","h1","h2","h3","h4","h5","h6","nav","section","div","dd","dl","dt","figcaption","figure","picture","hr","img","li","main","ol","p","pre","ul","a","b","abbr","bdi","bdo","br","cite","code","data","dfn","em","i","kbd","mark","q","rp","rt","ruby","s","samp","small","span","strong","sub","sup","time","u","var","wbr","area","audio","map","track","video","embed","object","param","source","canvas","script","noscript","del","ins","caption","col","colgroup","table","thead","tbody","td","th","tr","button","datalist","fieldset","form","input","label","legend","meter","optgroup","option","output","progress","select","textarea","details","dialog","menu","summary","template","blockquote","iframe","tfoot","svg","animate","animateMotion","animateTransform","circle","clipPath","color-profile","defs","desc","discard","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistanceLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","hatch","hatchpath","image","line","linearGradient","marker","mask","mesh","meshgradient","meshpatch","meshrow","metadata","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","solidcolor","stop","switch","symbol","text","textPath","tspan","unknown","use","view","slot","component"], dataAttributes: [], htmlAttributes: ["aria-*"], optionsWrapper: ["(await import('vue')).defineComponent(",")"], macros: {"defineProps":["defineProps"],"defineSlots":["defineSlots"],"defineEmits":["defineEmits"],"defineExpose":["defineExpose"],"withDefaults":["withDefaults"]}, plugins: [], hooks: [], experimentalDefinePropProposal: false, experimentalAdditionalLanguageModules: [], experimentalResolveStyleCssClasses: "scoped", experimentalModelPropName: {"":{"input":true},"value":{"input":{"type":"text"},"textarea":true,"select":true}}, experimentalUseElementAccessInTemplate: false */
	import type { Section } from '../../../models/Section';
	import SubsectionComponent from './Subsection/SubsectionComponent.vue';
	import { Icon } from '@iconify/vue';
	import SubsectionCard from '../../shared/Subsection/SubsectionCard.vue';
	import { scrollSmoothToElement } from '../../../utils/scrollServices';
	import type { PropType } from 'vue';
	export default {
		name: 'SectionComponent',
		components: { SubsectionComponent, Icon, SubsectionCard },
		props: {
			section: {
				type: Object as PropType<Section>,
				require: true,
			},
			isBeingEditingIntroduction: Boolean,
		},
		mounted() {
			scrollSmoothToElement(this.$el);
		},
		data() {
			return {
				showSetting: false,
			};
		},
		methods: {
			changeSetting() {
				this.showSetting = !this.showSetting;
			},
		},
	};
</script>
