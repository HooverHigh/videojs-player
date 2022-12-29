const bundle = require('bundle-js-css');

//Bundle CSS:
bundle.css({
    entry : './bundle-config/css-prod.info',
    dest : './css/videojs-bundle.min.css',
    print : false,
    disablebeautify : false
});

//Bundle all viedo-js plugins:
bundle.js({
    entry : './bundle-config/js-prod.info',
    dest : './js/videojs-bundle.min.js',
    print : false,
    disablebeautify : true
});

//Bundle videojs and player-init into 1 script:
bundle.js({
    entry : './bundle-config/videojs-prod.info',
    dest : './hooverhigh-videojs-player.min.js',
    print : false,
    disablebeautify : true
});