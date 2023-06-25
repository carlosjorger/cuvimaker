import { SocialAccount } from './SocialAccount';

export class Introduction {
    name = '';
    profetion = '';
    email: string | undefined;
    phone: string | undefined;
    location: string | undefined;
    linkedin: string | undefined;
    github: string | undefined;
    twitter: string | undefined;
    website: string | undefined;
    socialAccounts: SocialAccount[];
    socialAccountsCount = 0;
    constructor(
        name?: string,
        profetion?: string,
        email?: string,
        phone?: string,
        location?: string,
        linkedin?: string,
        github?: string,
        twitter?: string,
        website?: string
    ) {
        this.name = name ?? '';
        this.profetion = profetion ?? '';
        this.email = email;
        this.phone = phone;
        this.location = location;
        this.linkedin = linkedin;
        this.github = github;
        this.twitter = twitter;
        this.website = website;
        this.socialAccounts = [];
    }
}
