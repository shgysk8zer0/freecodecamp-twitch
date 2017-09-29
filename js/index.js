import {$} from './std-js/functions.js';
import Twitch from './Twitch.js';
import {userList, twitchUrl} from './consts.js';

$(self).ready(async () => {
	document.body.classList.replace('no-js', 'js');
	const $form = $('form');

	$form.submit(submit => submit.preventDefault());

	$form.reset(() => $('[data-twitch-user]').unhide());

	$('input[type="search"]').input(input => {
		if (! input.target.validity.badInput) {
			$('[data-twitch-user]').each(user => {
				user.hidden = ! user.dataset.twitchUser.toLowerCase().includes(input.target.value.toLowerCase());
			});
		}
	});

	$('[data-show]').click(click => $('[data-visible]').each(el => {
		el.dataset.visible = click.target.dataset.show;
	}));

	const list = document.querySelector('.twitch-list');
	const users = await Twitch.getUsers(...userList);
	const template = document.getElementById('user-template').content;
	const datalist = document.getElementById('twitch-list');

	const promises = users.map(async user => {
		const entry = template.cloneNode(true);
		const opt = document.createElement('option');
		opt.value = user.display_name;
		datalist.append(opt);

		entry.firstElementChild.dataset.twitchUser = user.display_name;
		entry.firstElementChild.dataset.twitchId = user._id;
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

		const data = await Twitch.getStream(user.name);
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

	await Promise.all(promises);
	if (Element.prototype.hasOwnProperty('animate')) {
		$('.twitch-profile').each((profile, index) => {
			profile.animate([
				{
					transform: 'scale(0) translateX(-50vw) translateY(50vh)',
					opacity: 0,
				},{
					transform: 'none',
					opacity: 1,
				},
			], {
				duration: 800,
				delay: index * 100,
				fill: 'backwards',
			});
			profile.hidden = false;
		});
	} else {
		$('.twitch-profile').unhide();
	}
}, {once: true});
