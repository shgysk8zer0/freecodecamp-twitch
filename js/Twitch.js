const ENDPOINT = 'https://wind-bow.glitch.me/twitch-api/';

async function get(url) {
	const resp = await fetch(new URL(url, ENDPOINT));
	if (resp.ok) {
		return await resp.json();
	} else {
		throw new Error(`${resp.url} [${resp.status} ${resp.statusText}]`);
	}
}

export default class Twitch {
	static async getUsers(...users) {
		return Promise.all(users.map(Twitch.getUser));
	}

	static async getUser(user) {
		const url = new URL(`users/${user}`, ENDPOINT);
		return get(url);
	}

	static async getStream(channelId) {
		const url = new URL(`streams/${channelId}`, ENDPOINT);
		return get(url);
	}

	static async getStreams(...channelIds) {
		return Promise.all(channelIds.map(Twitch.getStream));
	}

	static async getChannel(channelId) {
		const url = new URL(`channels/${channelId}`, ENDPOINT);
		return get(url);
	}

	static async getChannels(...channelIds) {
		return Promise.all(channelIds.map(Twitch.getChannel));
	}
}
