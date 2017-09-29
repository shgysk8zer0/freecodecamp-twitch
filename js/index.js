import {$} from './std-js/functions.js';
import Twitch from './Twitch.js';
import {userList, defaultAvatar, twitchUrl} from './consts.js';

$(self).ready(async () => {
	document.body.classList.replace('no-js', 'js');

	$('[data-show]').click(click => $('[data-visible]').each(el => {
		el.dataset.visible = click.target.dataset.show;
	}));

	const list = document.querySelector('.twitch-list');
	const users = await Twitch.getUsers(...userList);
	const template = document.getElementById('user-template').content;

	if (! list.matches(':empty')) {
		return;
	}

	users.forEach(user => {
		const entry = template.cloneNode(true);
		$('[data-prop="display_name"]', entry).each(node => {
			node.textContent = user.display_name;
		});

		$('[data-prop="link"]', entry).each(node => {
			node.href = new URL(user.display_name, twitchUrl);
		});

		$('[data-prop="logo"]', entry).each(node => {
			if (user.logo instanceof String) {
				node.src = user.logo;
			} else {
				const svg = document.createElement('svg');
				const use = document.createElement('use');
				svg.appendChild(use);
				use.setAttribute('xlink:href', defaultAvatar);
				node.replaceWith(svg);
			}
		});

		$('[data-twitch-id]', entry).each(node => {
			node.dataset.twitchId = user._id;
		});

		list.append(entry);
	});
}, {once: true});
