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
    },
    actions: {
        addSocialAccount(link: string) {
            this.introduction.socialAccounts.push(
                new SocialAccount(++this.socialAccountsCount, link)
            );
        },
        selectASocialAccount(Id: number) {
            if (this.selected == -1 || Id == -1) {
                this.selected = Id;
            }
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
    },
});
