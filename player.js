/**
 * This script is the main player script designed for hooverhigh
 * HooverHighVideoPlayer 2 <https://hooverhigh.ml/>
 * Copyright oxmc. <https://oxmc.xyz/>
 */

function gup(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.href);
	if (results == null)
		return "";
	else
		return results[1];
};

var pad = function(n, x, c) {
	return (new Array(n).join(c || '0') + x).slice(-n);
};

var padRight = function(n, x, c) {
	return (x + (new Array(n).join(c || '0'))).slice(0, n);
};

//This variable is never used, but is here if a user wants to include jquery automaticly if option is set:
var jquerycodelink = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";

if (window.jQuery) {
	//jQuery is loaded:
	var jquery_version = jQuery.fn.jquery || jQuery().jquery;
	console.log("Jquery loaded, version: ", jquery_version);
	if (jquery_version < "3.3.1") {
		throw new Error("This version of jquery is not supported for this script, use jquery 3.3.1");
	};
} else {
	throw new Error("jQuery not loaded, this script requires jquery 3.3.1");
};

const defvideourl = "https://cdn.hooverhigh.ml/videos/Welcome-to-Hoover-High-School_1668535472506.mp4";
const defvideoposter = "https://cdn.hooverhigh.ml/images/hooverhightornado.png?w=200&h=200";
const defvideowatermark = 'https://cdn.hooverhigh.ml/images/hooverhightornado.png?w=100&h=100';
const defvideowatermarkurl = "https://www.gusd.net/hooverhs";
const defvideotext = "";
const defvidtext = false;
const defvidup = "";
const defvideotype = "video/mp4";
const deftechorder = ["html5"];
const defshareurl = window.location.href || "https://hooverhigh.ml/player.html";
const rup = false;

const showads = false;

var videoplayers = document.querySelectorAll("video");

if (typeof videoplayers != "undefined" && typeof videoplayers != null && typeof videoplayers == "object") {

	for (let i = 0; i < videoplayers.length; i++) {
		let videourl, videotype, videoposter, videowatermark, videowatermarkurl, videotext, vidtext, vidup, shareurl, isdatasrc, techorder;

		isdatasrc = false;

		if ($(videoplayers[i]).data("vidsrc") != null && typeof $(videoplayers[i]).data("vidsrc") == "string" && $(videoplayers[i]).data("vidsrc") != "undefined") {
			isdatasrc = true;
			videourl = $(videoplayers[i]).data("vidsrc");
		} else {
			if (rup == true && gup("vid") != null && gup("vid").length != 0 && isdatasrc == false) {
				videourl = gup("vid");
				vidup = `?vid=${videourl}`;
			} else {
				videourl = defvideourl;
				vidup = defvidup;
			};
		};
		if ($(videoplayers[i]).data("srctype") != null && typeof $(videoplayers[i]).data("srctype") == "string" && $(videoplayers[i]).data("srctype") != "undefined") {
			videotype = $(videoplayers[i]).data("srctype");
		} else {
			if (rup == true && gup("vidsrctype") != null && gup("vidsrctype").length != 0) {
				videotype = gup("vidsrctype");
			} else {
				videotype = defvideotype;
			};
		};
		if ($(videoplayers[i]).data("poster") != null && typeof $(videoplayers[i]).data("poster") == "string" && $(videoplayers[i]).data("poster") != "undefined") {
			videoposter = $(videoplayers[i]).data("poster");
		} else {
			if (rup == true && gup("vidpost") != null && gup("vidpost").length != 0) {
				videoposter = gup("vidpost");
			} else {
				videoposter = defvideoposter;
			};
		};
		if ($(videoplayers[i]).data("watermark") != null && typeof $(videoplayers[i]).data("watermark") == "string" && $(videoplayers[i]).data("watermark") != "undefined") {
			videowatermark = $(videoplayers[i]).data("watermark");
		} else {
			if (rup == true && gup("vidwatermark") != null && gup("vidwatermark").length != 0) {
				videowatermark = gup("vidwatermark");
			} else {
				videowatermark = defvideowatermark;
			};
		};
		if ($(videoplayers[i]).data("watermarkurl") != null && typeof $(videoplayers[i]).data("watermarkurl") == "string" && $(videoplayers[i]).data("watermarkurl") != "undefined") {
			videowatermarkurl = $(videoplayers[i]).data("watermarkurl");
		} else {
			if (rup == true && gup("vidwatermarkurl") != null && gup("vidwatermarkurl").length != 0) {
				videowatermarkurl = gup("vidwatermarkurl");
			} else {
				videowatermarkurl = defvideowatermarkurl;
			};
		};
		if (rup == true && gup("vidtext") != null && gup("vidtext").length != 0) {
			videotext = gup("vidtext");
			vidtext = true;
		} else {
			videotext = defvideotext;
			vidtext = defvidtext;
		};

		shareurl = `${defshareurl}${vidup}`;

		if (videotype == "video/youtube") {
			techorder = ["youtube", "html5"];
			shareurl = videourl;
		} else {
			techorder = deftechorder;
		};

		//console.log(videourl);
		//console.log(videotype);
		//console.log(videoposter);
		//console.log(videowatermark);
		//console.log(videowatermarkurl);
		//console.log(vidtext);
		//console.log(techorder);

		var player = videojs(videoplayers[i], {
			plugins: {
				hotkeys: {
					volumeStep: 0.1,
					seekStep: 5,
					enableModifiersForNumbers: false
				},
			},
			textTrackSettings: vidtext,
			techOrder: techorder
		});

		if ($(videoplayers[i]).data("vr") != null && typeof $(videoplayers[i]).data("vr") == "boolean" && $(videoplayers[i]).data("vr") != "undefined" && $(videoplayers[i]).data("vr") == true) {
			console.log("VR Init");
			player.mediainfo = player.mediainfo || {};
			player.mediainfo.projection = '360';
			// AUTO is the default and looks at mediainfo:
			player.vr({projection: 'AUTO', debug: true, forceCardboard: false});
		};

		if (showads == true) {
			// initalize ad plugin for this player
			player.exampleAds({
				debug: true
			});

			var Html5 = videojs.getTech('Html5');

			var eventList = Html5.Events.concat(Html5.Events.map(function(evt) {
				return 'ad' + evt;
			})).concat(Html5.Events.map(function(evt) {
				return 'content' + evt;
			})).concat([
				// events emitted by ad plugin
				'adtimeout',
				'contentupdate',
				'contentplayback',
				'readyforpreroll',
				'readyforpostroll',
				// events emitted by third party ad implementors
				'adsready',
				'adscanceled',
				'adplaying',
				'adstart', // startLinearAdMode()
				'adend', // endLinearAdMode()
				'nopreroll',
				'nopostroll'

			]).filter(function(evt) {
				var events = {
					progress: 1,
					timeupdate: 1,
					suspend: 1,
					emptied: 1,
					durationchange: 1,
					contentprogress: 1,
					contenttimeupdate: 1,
					contentsuspend: 1,
					contentemptied: 1,
					adprogress: 1,
					adtimeupdate: 1,
					adsuspend: 1,
					ademptied: 1,
					adabort: 1
				}

				return !(evt in events);
			});

			player.on(eventList, function(event) {
				var d, str, evt;

				evt = event.type;

				d = new Date();
				d = '' +
					pad(2, d.getHours()) + ':' +
					pad(2, d.getMinutes()) + ':' +
					pad(2, d.getSeconds()) + '.' +
					pad(3, d.getMilliseconds());
			});
		};

		var shareOptions = {
			socials: ['fb', 'tw', 'reddit', 'telegram', 'whatsapp'],
			url: shareurl,
			title: 'HooverHigh Video',
			description: 'video.js share plugin',
			image: 'https://hooverhigh.ml/assets/img/HooverHS.png',
			// required for Facebook and Messenger
			fbAppId: '436772158593997',
			redirectUri: `${shareurl}#close`,
			embedCode: `<iframe src='${shareurl}' width='560' height='315' frameborder='0' allowfullscreen></iframe>`
		}

		//Init plugins:
		player.errors();
		player.errors.extend({
			"web-vr-hls-cors-not-supported": {
				headline: 'HLS 360 Error',
				message: 'Your browser/device does not support HLS 360 video. See http://webvr.info for assistance.'
			}
		});
		//player.replayButton();
		player.share(shareOptions);

		//Set player src and poster:
		player.poster(videoposter);
		player.src({
			src: videourl,
			type: videotype,
		});

		//Set player watermark:
		player.watermark({
			fadeTime: null,
			position: 'top-right',
			image: videowatermark,
			url: videowatermarkurl
		});

		//Captions:
		if (vidtext != null && vidtext == true) {
			const trackEl = player.addRemoteTextTrack({
				src: videotext
			}, false);
			// Get all text tracks for the current player.
			/*var tracks = player.textTracks();
			for (var i = 0; i < tracks.length; i++) {
			  var track = tracks[i];*/
			// Find the English captions track and mark it as "showing".
			/*if (track.kind === 'captions' && track.language === 'en') {
                  track.mode = 'showing';
                }
            }*/
		};
	};
};