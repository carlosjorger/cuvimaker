<template>
    <div class="switch-checkbox-section">
        <div class="switch-checkbox">
            <input type="checkbox" class="input-checkbox" v-model="value" />
            <div class="skin one"></div>
            <div class="skin two"></div>
        </div>
        <h5>{{ title }}</h5>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'SwitchCheckbox',
        props: {
            title: {
                type: String,
                required: true,
            },
            modelValue: {
                type: Boolean,
            },
        },
        emits: ['update:modelValue'],
        setup() {
            return {};
        },
        computed: {
            value: {
                get() {
                    return this.modelValue;
                },
                set(value: Date) {
                    this.$emit('update:modelValue', value);
                },
            },
        },
    };
</script>

<style>
    .switch-checkbox-section {
        display: flex;
        align-items: center;
    }
    .switch-checkbox {
        display: grid;
        width: 5rem;
        height: 2rem;
        border-radius: 1rem;
        padding-right: 0.5rem;
    }
    .switch-checkbox > * {
        grid-area: 1/1;
    }
    .input-checkbox {
        opacity: 0;
        cursor: pointer;
    }

    .skin {
        pointer-events: none;
        border-radius: inherit;
    }

    .one.skin {
        background-color: var(--primary-color);
    }

    .two.skin {
        background-color: rgb(185, 185, 185);

        --mask: radial-gradient(
            circle at 22% 50%,
            rgba(0, 0, 0, 0) 22%,
            rgba(0, 0, 0, 1) 22%
        );
        mask-image: var(--mask);
        -webkit-mask-image: var(--mask);
        -webkit-mask-position: 0% 0%;
        mask-position: 0% 0%;
        transition: all 0.3s ease-out;
    }

    .input-checkbox:checked ~ .two.skin {
        background-color: white;

        --mask: radial-gradient(
            circle at 22% 50%,
            rgba(0, 0, 0, 0) 22%,
            rgba(0, 0, 0, 1) 22%
        );

        mask-image: var(--mask);
        -webkit-mask-image: var(--mask);
        -webkit-mask-position: 2.5rem 0%;
        mask-position: 2.5rem 0%;
        transition: all 0.3s ease-out;
    }
</style>
