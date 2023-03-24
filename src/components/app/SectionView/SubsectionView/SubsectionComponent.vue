<template>
    <h4 class="mt-2 text-2xl font-semibold">{{ subsection?.title }}</h4>
    <h5 class="mt-1 text-xl font-extrabold">{{ subsection?.text }}</h5>
    <div
        class="mt-1 flex flex-row items-center p-1"
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
            {{ subsection?.subsectionTimeInterval?.dateFrom?.getDate() }}
        </div>
        &nbsp;-&nbsp;
        <div>
            {{
                subsection?.subsectionTimeInterval?.dateTo?.toLocaleString(
                    'en-US',
                    { month: 'long' }
                )
            }}
            {{ subsection?.subsectionTimeInterval?.dateTo?.getDate() }}
        </div>
    </div>
    <div>
        <ul class="ml-6 list-disc">
            <li
                class="p-1"
                v-for="(element, index) in subsection?.elements"
                :key="index"
            >
                {{ element.name }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { Subsection } from '../../../../models/Subsection';
    import { Icon } from '@iconify/vue';

    export default {
        name: 'SubsectionComponent',
        components: { Icon },
        props: {
            subsection: {
                type: Subsection,
                require: true,
            },
        },
    };
</script>
