export const getInfoFromUrl = (url: string) => {
	const urlWithoutHttps = url.replace('https://', '');
	const urlWithoutHttp = urlWithoutHttps.replace('http://', '');
	const urlWithoutWWW = urlWithoutHttp.replace('www.', '');
	const urlWithoutMailto = urlWithoutWWW.replace('mailto:', '');
	return urlWithoutMailto;
};

export const getIconByUrl = (url: string) => {
	const socialMediaDict = new Map<string, string>();
	socialMediaDict.set('github.com/', 'mdi:github');
	socialMediaDict.set('twitter.com/', 'mdi:twitter');
	socialMediaDict.set('linkedin.com/in/', 'mdi:linkedin');
	socialMediaDict.set('reddit.com', 'ic:baseline-reddit');
	socialMediaDict.set('t.me', 'ic:baseline-telegram');
	socialMediaDict.set('instagram.com', 'mdi:instagram');
	socialMediaDict.set('facebook.com', 'ic:baseline-facebook');
	socialMediaDict.set('tiktok.com', 'ic:baseline-tiktok');
	socialMediaDict.set('youtube.com', 'mdi:youtube');
	socialMediaDict.set('twitch.tv', 'mdi:twitch');

	const keys = [...socialMediaDict.keys()];
	for (let index = 0; index < keys.length; index++) {
		const key = keys[index];
		if (url.includes(key)) {
			return socialMediaDict.get(key) ?? '';
		}
	}
	return 'el:website';
};
