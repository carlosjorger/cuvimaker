import { SocialAccount } from './SocialAccount';

export class Introduction {
	name = '';
	profetion = '';
	email: string | undefined;
	phone: string | undefined;
	location: string | undefined;
	website: string | undefined;
	socialAccounts: SocialAccount[];
	socialAccountsCount = 0;
	constructor(
		name?: string,
		profetion?: string,
		email?: string,
		phone?: string,
		location?: string,

		website?: string,
		socialAccounts?: SocialAccount[]
	) {
		this.name = name ?? '';
		this.profetion = profetion ?? '';
		this.email = email;
		this.phone = phone;
		this.location = location;
		this.website = website;
		this.socialAccounts = socialAccounts ?? [];
	}
}
