import { defineStore } from 'pinia';
import { Subsection } from '../models/Subsection';
import { SubsectionElement } from '../models/SubsectionElement';

type SubsectionStoreState = {
    subsection: Subsection;
    editing: boolean;
    elementsCount: number;
    selected: number;
};
export const useSubsectionStore = defineStore('subsection', {
    state: (): SubsectionStoreState => ({
        subsection: new Subsection(),
        editing: false,
        elementsCount: 0,
        selected: -1,
    }),
    actions: {
        addElement(elementName: string) {
            this.subsection.elements.push(
                new SubsectionElement(this.elementsCount++, elementName)
            );
        },
        setSubsection(subsection: Subsection) {
            this.subsection.title = subsection.title;
            this.subsection.text = subsection.text;
            this.subsection.last = subsection.last;
            this.subsection.editing = subsection.editing;
            this.subsection.count = subsection.count;
            this.subsection.subsectionTimeInterval =
                subsection.subsectionTimeInterval?.copy();
            this.subsection.elements = subsection.elements.map((element) =>
                element.copy()
            );
        },
    },
});
