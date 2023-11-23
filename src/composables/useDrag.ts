import { ref } from 'vue';
export function useDrag<T>(typeOfDrag: string, save: () => void) {
	const markedSection = ref(-1);
	const IdAttr = `${typeOfDrag}ID`;

	const onDragEnter = (index: number, enableDrag: boolean) => {
		if (!enableDrag) {
			return;
		}
		markedSection.value = index;
	};
	const onDrop = (
		event: DragEvent,
		element: T,
		collection: T[],
		index: number,
		enableDrag: boolean
	) => {
		if (!enableDrag) {
			return;
		}
		const eventDataTransfer = event.dataTransfer;
		if (eventDataTransfer) {
			const draggedSectionName = eventDataTransfer.getData(IdAttr);
			const sourceIndex = Number.parseInt(draggedSectionName);
			const sourceSection = collection[sourceIndex];
			collection[sourceIndex] = element;
			collection[index] = sourceSection;
			markedSection.value = -1;
			save();
		}
	};
	const startDrag = (event: DragEvent, index: number) => {
		event.stopPropagation();
		const eventDataTransfer = event.dataTransfer;
		if (eventDataTransfer) {
			eventDataTransfer.dropEffect = 'move';
			eventDataTransfer.effectAllowed = 'move';
			eventDataTransfer.setData(IdAttr, index.toString());
		}
		(event.target as HTMLElement).style.opacity = '1';
	};
	return { onDragEnter, onDrop, startDrag, markedSection };
}
