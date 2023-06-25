import { defineStore } from 'pinia';
import { Introduction } from '../models/Introduction';
import { SocialAccount } from '../models/SocialAccount';

export const useIntroductionStore = defineStore('introduction', {
    state: () => ({
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
        totalDiscount(): number | undefined {
            return this.SocialAccountId;
        },
    },
    actions: {
        addSocialAccount(link: string) {
            this.introduction.socialAccounts.push(
                new SocialAccount(this.socialAccountsCount++, link)
            );
        },
        selectASocialAccount(Id: number) {
            this.selected = Id;
        },
    },
});
