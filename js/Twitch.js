const ENDPOINT = 'https://wind-bow.glitch.me/twitch-api/';
export default class Twitch {
	static async getUsers(...users) {
		let urls = users.map(user => new URL(`users/${user}`, ENDPOINT));
		let promises = urls.map(url => fetch(url));
		let resps = await Promise.all(promises);
		let json = await Promise.all(resps.filter(resp => resp.ok).map(resp => resp.json()));
		return json;
	}
}
