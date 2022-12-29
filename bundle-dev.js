const bundle = require('bundle-js-css');

//Bundle CSS:
bundle.css({
    entry : './bundle-config/css-dev.info',
    dest : './css/videojs-bundle-dev.min.css',
    print : false,
    disablebeautify : false
});

//Bundle all viedo-js plugins:
bundle.js({
    entry : './bundle-config/js-dev.info',
    dest : './js/videojs-bundle-dev.min.js',
    print : false,
    disablebeautify : false
});

//Bundle videojs and player-init into 1 script:
bundle.js({
    entry : './bundle-config/videojs-dev.info',
    dest : './hooverhigh-videojs-player-dev.min.js',
    print : false,
    disablebeautify : false
});