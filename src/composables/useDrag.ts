import { ref } from 'vue';
export function useDrag<T>(collection: T[], save: () => void) {
	const markedSection = ref(-1);
	const onDragEnter = (index: number) => {
		markedSection.value = index;
	};
	const onDrop = (event: DragEvent, element: T, index: number) => {
		const eventDataTransfer = event.dataTransfer;
		if (eventDataTransfer) {
			const draggedSectionName = eventDataTransfer.getData('itemID');
			const sourceIndex = Number.parseInt(draggedSectionName);
			const sourceSection = collection[sourceIndex];
			collection[sourceIndex] = element;
			collection[index] = sourceSection;
			markedSection.value = -1;
			save();
		}
	};
	const startDrag = (event: DragEvent, index: number) => {
		const eventDataTransfer = event.dataTransfer;
		if (eventDataTransfer) {
			eventDataTransfer.dropEffect = 'move';
			eventDataTransfer.effectAllowed = 'move';
			eventDataTransfer.setData('itemID', index.toString());
		}
		(event.target as HTMLElement).style.opacity = '1';
	};
	return { onDragEnter, onDrop, startDrag, markedSection };
}
