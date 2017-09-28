import {$} from './std-js/functions.js';
import Twitch from './Twitch.js';
import {userList, defaultAvatar, twitchUrl} from './consts.js';

$(self).ready(async () => {
	document.body.classList.replace('no-js', 'js');
	$('form').submit(async (submit) => {
		submit.preventDefault();
		const form = new FormData(submit.target);
		[...form.keys()].forEach(key => console.log(`${key} = ${form.get(key)}`));
	});
	const users = await Twitch.getUsers(...userList);
	console.info(users);
	const template = document.getElementById('user-template').content;
	const list = document.querySelector('.twitch-list');
	users.forEach(user => {
		const entry = template.cloneNode(true);
		$('[data-prop="display_name"]', entry).each(node => node.textContent = user.display_name);
		$('[data-prop="link"]', entry).each(node => node.href = new URL(user.display_name, twitchUrl));
		$('[data-prop="logo"]', entry).each(node => node.src = user.logo || defaultAvatar);
		$('[data-twitch-id]', entry).each(node => node.dataset.twitchId = user._id);

		list.append(entry);
	});
}, {once: true});
