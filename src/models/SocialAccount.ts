export class SocialAccount {
    public id: number;
    public link: string;
    constructor(id: number, name?: string) {
        this.id = id;
        this.link = name ?? '';
    }
    copy() {
        return new SocialAccount(this.id, this.link);
    }
}
