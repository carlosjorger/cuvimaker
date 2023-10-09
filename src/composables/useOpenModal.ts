export function useOpenModal(modalId: string) {
	const onShowModal = () => {
		(document.getElementById(modalId) as HTMLDialogElement)?.showModal();
	};
	return { onShowModal };
}
