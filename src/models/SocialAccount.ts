import { getIconByUrl } from '../utils/urlService';

export class SocialAccount {
	public id: number;
	public link: string;
	get iconName(): string {
		return getIconByUrl(this.link);
	}
	constructor(id: number, name?: string) {
		this.id = id;
		this.link = name ?? '';
	}
	copy() {
		return new SocialAccount(this.id, this.link);
	}
}
