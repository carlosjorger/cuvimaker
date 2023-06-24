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
    ifEmpty(): boolean {
        return (
            this.name == '' &&
            this.profetion == '' &&
            this.email == undefined &&
            this.phone == undefined &&
            this.location == undefined &&
            this.linkedin == undefined &&
            this.github == undefined &&
            this.twitter == undefined &&
            this.website == undefined
        );
    }
    setIntroduction(introduction: Introduction) {
        this.name = introduction.name;
        this.profetion = introduction.profetion;
        this.email = introduction.email;
        this.phone = introduction.phone;
        this.location = introduction.location;
        this.linkedin = introduction.linkedin;
        this.github = introduction.github;
        this.twitter = introduction.twitter;
        this.website = introduction.website;
    }
    addSocialAccount(link: string) {
        this.socialAccounts.push(
            new SocialAccount(this.socialAccountsCount++, link)
        );
    }
    removeSocialAccount(index: number) {
        this.socialAccounts.splice(index, 1);
    }
    saveSocialAccount(index: number, link: string) {
        this.socialAccounts[index].link = link;
    }
    copy(): Introduction {
        return new Introduction(
            this.name,
            this.profetion,
            this.email,
            this.phone,
            this.location,
            this.linkedin,
            this.github,
            this.twitter,
            this.website
        );
    }
}
