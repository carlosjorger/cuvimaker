import { it, describe, expect } from 'vitest';
import CVEditor from './CVEditor.vue';
import { VueWrapper, flushPromises, mount } from '@vue/test-utils';
import { Resume } from '../models/Resume';
import { Section } from '../models/Section';
function findByText(wrap: VueWrapper, selector: string, text: string) {
	return wrap.findAll(selector).filter((n) => n.text().match(text));
}

describe('CVEditor.vue Test', () => {
	it('testing CVEditor load a resume sections', async () => {
		// TODO: mock localstorage store https://pinia.vuejs.org/cookbook/testing.html
		const wrapper = mount(CVEditor);

		const resume = new Resume();
		resume.sections = [
			new Section('A'),
			new Section('B'),
			new Section('C'),
			new Section('D'),
			new Section('E'),
		];
		wrapper.setData({
			resume: resume,
		});
		await wrapper.vm.$nextTick;
		const deleteSectionButtons = wrapper
			.findAll('button')
			.filter(
				(button) => button.attributes().title == 'Delete a Section'
			);
		expect(deleteSectionButtons.length).toBe(5);
		const section = findByText(wrapper, 'h2', 'B');
		await section.at(0)?.trigger('click');
		await flushPromises();
		await deleteSectionButtons.at(1)?.trigger('click');
		await flushPromises();
		const deleteConfirmationButton = wrapper
			.findAll('button')
			.filter((button) => button.text() == 'Yes')
			.at(0);
		deleteConfirmationButton?.trigger('click');
		await flushPromises();
		console.log(wrapper.text());
	});
});
