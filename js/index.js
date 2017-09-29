import {$} from './std-js/functions.js';
import Twitch from './Twitch.js';
import {userList, twitchUrl} from './consts.js';

$(self).ready(async () => {
	document.body.classList.replace('no-js', 'js');

	$('[data-show]').click(click => $('[data-visible]').each(el => {
		el.dataset.visible = click.target.dataset.show;
	}));

	const list = document.querySelector('.twitch-list');
	const users = await Twitch.getUsers(...userList);
	const template = document.getElementById('user-template').content;

	users.forEach(user => {
		const entry = template.cloneNode(true);

		$('[data-prop="display_name"]', entry).each(node => {
			node.textContent = user.display_name;
		});

		$('[data-prop="link"]', entry).each(node => {
			node.href = new URL(user.display_name, twitchUrl);
		});

		$('[data-prop="logo"]', entry).each(node => {
			if (typeof(user.logo) === 'string') {
				node.src = user.logo;
			} else {
				$('[data-prop="logo"] + .avatar-default', entry).unhide();
				node.remove();
			}
		});

		$('[data-twitch-id]', entry).each(node => {
			node.dataset.twitchId = user._id;
		});

		Twitch.getStream(user.name).then(async data => {
			if (data.stream instanceof Object) {
				$('.offline', entry).replaceClass('offline', 'online');
				$('[data-prop="status-msg"]', entry).each(node => {
					node.textContent = data.stream.channel.status;
				});
				list.append(entry);
			} else {
				list.append(entry);
			}
		});
	});
}, {once: true});
