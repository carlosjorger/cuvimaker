import { it, describe } from 'vitest';
import CVEditor from './CVEditor.vue';
import { VueWrapper, mount } from '@vue/test-utils';
function findByText(wrap: VueWrapper, selector: string, text: string) {
	return wrap.findAll(selector).filter((n) => n.text().match(text));
}
describe('CVEditor.vue Test', () => {
	console.log('----------------');
	it('testing CVEditor Add Section button', async () => {
		const wrapper = mount(CVEditor);
		const buttons = findByText(wrapper, 'button', 'Add a new Section');
		console.log(buttons);
	});
});
