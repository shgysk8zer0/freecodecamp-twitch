import {$} from './std-js/functions.js';

$(self).ready(() => {
	document.body.classList.replace('no-js', 'js');
	$('form').submit(async (submit) => {
		submit.preventDefault();
		const form = new FormData(submit.target);
		[...form.keys()].forEach(key => console.log(`${key} = ${form.get(key)}`));
	});
}, {once: true});
