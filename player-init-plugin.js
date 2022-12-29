/**
 * This script is an init script designed for hooverhigh
 * HooverHighVideoPlayer 1 <https://hooverhigh.ml/>
 * Copyright oxmc. <https://oxmc.xyz/>
 */

window.addEventListener('DOMContentLoaded', async (event) => {
	console.log('DOM fully loaded and parsed, Adding player script');
	console.log("Player-init.js, dynamicly including js");

	function loadScript(scriptUrl) {
		const script = document.createElement('script');
		script.src = scriptUrl;
		document.body.appendChild(script);

		return new Promise((res, rej) => {
			script.onload = function() {
				res();
			}
			script.onerror = function() {
				rej();
			}
		});
	}

	//Run player.js:
	await loadScript('https://hooverhigh.ml/videojs-plugins/player.js').then(() => {
		console.log('Script loaded!');
	}).catch(() => {
		console.error('Player-init-plugin Script loading failed!');
	});

	console.log("End Player-init-plugin.js");
});