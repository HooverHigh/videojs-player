/**
 * This script is an init script designed for hooverhigh
 * HooverHighVideoPlayer 2 <https://hooverhigh.ml/>
 * Copyright oxmc. <https://oxmc.xyz/>
 */

window.addEventListener('HVJS-Load', async (event) => {
	console.log('DOM fully loaded and parsed, Adding player scripts and styles');
	console.log("Player-init.js, dynamicly including css and js");

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

	function removefile(filename, filetype) {
		var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none";
		var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none";
		var allsuspects = document.getElementsByTagName(targetelement);
		for (var i = allsuspects.length; i >= 0; i--) {
			if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
				allsuspects[i].parentNode.removeChild(allsuspects[i]);
			console.log(`Removed: ${filename}`);
		}
	}

	function removeElementsByClass(className) {
		const elements = document.getElementsByClassName(className);
		while (elements.length > 0) {
			elements[0].parentNode.removeChild(elements[0]);
		}
	}

	//List of scripts and css to load for video.js
	const include_List = {
		"css": [
			"https://vjs.zencdn.net/7.20.3/video-js.css",
			"https://hooverhigh.ml/videojs-plugins/css/videojs-bundle.min.css"
		],
		"js": [
			"https://hooverhigh.ml/videojs-plugins/ad.js",
			"https://hooverhigh.ml/videojs-plugins/hooverhigh-videojs-player.min.js"
		]
	};

	//Add CSS:
	console.log("Adding CSS");
	include_List.css.forEach(async function(url) {
		//console.log(url);
		$("<link>", {
			rel: "stylesheet",
			type: "text/css",
			href: url
		}).appendTo("head");
	});

	//Add JS:
	console.log("Adding JS");
	include_List.js.forEach(async function(url) {
		//console.log(url);
		//$.getScript(url);
		$("<script>", {
			type: "application/javascript",
			src: url
		}).appendTo("body")
	});

	//Run player.js:
	await loadScript('https://hooverhigh.ml/videojs-plugins/player.js').then(() => {
		console.log('Script loaded!');
	}).catch(() => {
		console.error('Script loading failed! Handle this error');
	});

	console.log("End Player-init.js");
});