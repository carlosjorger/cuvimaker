import { Section } from './Section';

export class Resume {
    name: string;
    profetion: string;
    email: string | undefined;
    phone: string | undefined;
    location: string | undefined;
    linkedin: string | undefined;
    github: string | undefined;
    twitter: string | undefined;
    website: string | undefined;
    sections: Section[];
    constructor() {
        this.sections = [];
    }
}
