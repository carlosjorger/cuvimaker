<template>
	<dialog :id="id" class="modal text-base-content">
		<div class="modal-box">
			<form method="dialog">
				<button
					class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
				>
					✕
				</button>
			</form>
			<h3 class="text-lg font-bold">Wait!</h3>
			<p class="py-4">
				A you sure that you whant to delete this {{ entityToDelete }}?
			</p>
			<form method="dialog" class="flex justify-between pt-3">
				<button aria-label="Yes" @click="onDelete()" class="btn">
					Yes
				</button>
				<button aria-label="No" @click="$emit('cancel')" class="btn">
					No
				</button>
			</form>
		</div>
	</dialog>
</template>
<script setup lang="ts">
	defineProps({
		entityToDelete: {
			type: String,
			required: true,
		},
		id: {
			type: String,
			default: 'confirmationModal',
		},
	});
	const emit = defineEmits(['delete', 'cancel']);

	const onDelete = () => {
		emit('delete');
		emit('cancel');
	};
</script>
