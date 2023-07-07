<template>
	<ModalTemplate>
		<div
			class="overflow-hidden rounded border-4 border-solid border-primary bg-white text-lg font-extrabold text-primary dark:border-zinc-100 dark:bg-dark-primary-300 dark:text-zinc-300 max-xl:w-1/3 max-lg:w-3/5 max-md:w-9/12 max-sm:w-9/12"
		>
			<div
				class="bg-primary p-4 text-2xl text-zinc-300 dark:bg-white dark:text-primary"
			>
				Confirmation
			</div>
			<div class="p-4">
				<div>
					A you sure that you whant to delete this
					{{ entityToDelete }}?
				</div>

				<div class="flex justify-between pt-5">
					<ConfirmationButton :name="'No'" @click="$emit('cancel')" />
					<ConfirmationButton
						:name="'Yes'"
						@click="$emit('delete')"
					/>
				</div>
			</div>
		</div>
	</ModalTemplate>
</template>
<script lang="ts">
	import ModalTemplate from '../others/ModalTemplate.vue';
	import ConfirmationButton from '../Button/ConfirmationButton.vue';
	export default {
		components: { ModalTemplate, ConfirmationButton },
		props: {
			entityToDelete: String,
		},
	};
</script>
