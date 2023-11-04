import { defineStore } from 'pinia';
import { Introduction } from '../models/Introduction';
import { SocialAccount } from '../models/SocialAccount';
type IntroductionStoreState = {
	introduction: Introduction;
	editing: boolean;
	socialAccountsCount: number;
	selected: number;
};
export const useIntroductionStore = defineStore('introduction', {
	state: (): IntroductionStoreState => ({
		introduction: new Introduction(),
		editing: false,
		socialAccountsCount: 0,
		selected: -1,
	}),
	getters: {
		isSelected({ selected }): (SocialAccountId: number) => boolean {
			return (SocialAccountId: number): boolean =>
				selected == SocialAccountId;
		},
		copy: (state) =>
			new Introduction(
				state.introduction.name,
				state.introduction.profetion,
				state.introduction.email,
				state.introduction.phone,
				state.introduction.location,
				state.introduction.website,
				state.introduction.socialAccounts
			),
	},
	actions: {
		addSocialAccount(link: string) {
			this.socialAccountsCount = this.introduction.socialAccounts.length;
			this.introduction.socialAccounts.push(
				new SocialAccount(this.socialAccountsCount, link)
			);
		},
		selectASocialAccount(Id: number) {
			this.selected = Id;
		},
		unSelectASocialAccount(Id: number) {
			if (this.selected == Id) {
				this.selected = -1;
			}
		},
		removeSocialAccount(index: number) {
			this.introduction.socialAccounts.splice(index, 1);
		},
		saveSocialAccount(index: number, link: string) {
			this.introduction.socialAccounts[index].link = link;
		},
		setIntroduction(introduction: Introduction) {
			this.introduction = new Introduction(
				introduction.name,
				introduction.profetion,
				introduction.email,
				introduction.phone,
				introduction.location,
				introduction.website,
				introduction.socialAccounts
			);
		},
	},
});
