const robotjs = require('node-gyp-build')(__dirname);

module.exports = robotjs;
module.exports.screen = {
    get xDisplayName() {
        return robotjs.getXDisplayName();
    },
    set xDisplayName(value) {
        robotjs.setXDisplayName(value);
    }
};
module.exports.screen.capture = function(x, y, width, height)
{
    // If coords have been passed, use them.
    if (typeof x !== "undefined" && typeof y !== "undefined" && typeof width !== "undefined" && typeof height !== "undefined") {
        b = robotjs.captureScreen(x, y, width, height);
    } else {
        b = robotjs.captureScreen();
    }

    const bitmap = {
        width: b.width,
        height: b.height,
        byteWidth: b.byteWidth,
        bitsPerPixel: b.bitsPerPixel,
        bytesPerPixel: b.bytesPerPixel,
        image: b.image,
    };

    bitmap.colorAt =(x, y) => {
        return robotjs.getColor(bitmap, x, y);
    };

    return bitmap;
};
module.exports.screen.updateMetrics = function() {
  robotjs.updateScreenMetrics();
};
